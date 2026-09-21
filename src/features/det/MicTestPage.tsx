import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Mic, Square, Volume2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * One-off diagnostic for the school tablet. School-managed devices can block
 * the microphone for browsers; if so, speaking practice cannot work there and
 * the build plan changes. Nothing here is saved or uploaded.
 */

const CANDIDATE_TYPES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/aac", "audio/ogg;codecs=opus"];
const TEST_SECONDS = 8;

type Check = { label: string; ok: boolean | null; detail: string };

export function MicTestPage() {
  const [checks, setChecks] = useState<Check[]>([]);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(TEST_SECONDS);
  const [clip, setClip] = useState<{ url: string; mime: string; kb: number; seconds: number } | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [spoke, setSpoke] = useState<boolean | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const supported =
      typeof MediaRecorder !== "undefined"
        ? CANDIDATE_TYPES.filter((t) => MediaRecorder.isTypeSupported?.(t))
        : [];
    // The DOM typings say mediaDevices always exists; on insecure pages and
    // some locked-down browsers it is undefined — the case this page detects.
    const md = (navigator as Navigator & { mediaDevices?: MediaDevices }).mediaDevices;
    const canGetMic = !!md && typeof md.getUserMedia === "function";
    setChecks([
      { label: "Secure connection (HTTPS)", ok: window.isSecureContext, detail: window.isSecureContext ? "Yes" : "Microphone requires HTTPS" },
      { label: "Microphone access available", ok: canGetMic, detail: canGetMic ? "Supported" : "Not available in this browser" },
      { label: "Audio recording", ok: typeof MediaRecorder !== "undefined", detail: typeof MediaRecorder !== "undefined" ? `Formats: ${supported.join(", ") || "browser default"}` : "MediaRecorder missing" },
      { label: "Spoken questions (for Interactive Speaking)", ok: "speechSynthesis" in window, detail: "speechSynthesis" in window ? "Supported" : "Not available" },
    ]);
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  useEffect(() => {
    if (!recording) return;
    if (countdown <= 0) {
      recorderRef.current?.stop();
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [recording, countdown]);

  const record = async () => {
    setMicError(null);
    setClip(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = CANDIDATE_TYPES.find((t) => MediaRecorder.isTypeSupported?.(t));
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks: BlobPart[] = [];
      const started = Date.now();
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: rec.mimeType || mime || "audio/webm" });
        setClip({
          url: URL.createObjectURL(blob),
          mime: blob.type || "unknown",
          kb: Math.round(blob.size / 1024),
          seconds: Math.round((Date.now() - started) / 1000),
        });
        stream.getTracks().forEach((t) => t.stop());
        setRecording(false);
      };
      recorderRef.current = rec;
      rec.start();
      setCountdown(TEST_SECONDS);
      setRecording(true);
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      setMicError(
        name === "NotAllowedError"
          ? "Microphone permission was refused. If you never saw a question, the school may have blocked the microphone for this browser."
          : name === "NotFoundError"
            ? "No microphone was found on this device."
            : `The microphone could not start (${name || "unknown error"}).`,
      );
    }
  };

  const speak = () => {
    const u = new SpeechSynthesisUtterance("Do you prefer studying alone or with other people?");
    u.lang = "en-US";
    u.rate = 0.95;
    u.onend = () => setSpoke(true);
    u.onerror = () => setSpoke(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const recordingWorks = clip !== null && clip.kb > 1;
  const verdict = micError ? "fail" : recordingWorks ? "pass" : null;

  return (
    <div className="space-y-6">
      <Link to="/det" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden />
        Duolingo
      </Link>

      <header>
        <h2 className="text-2xl font-semibold tracking-tight">Microphone test</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Run this on the school tablet. It takes a minute, and nothing is saved or uploaded.
        </p>
      </header>

      <section className="rounded-xl border border-border bg-surface">
        <ul className="divide-y divide-border">
          {checks.map((c) => (
            <li key={c.label} className="flex items-start gap-3 p-3.5">
              {c.ok ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-label="OK" />
              ) : (
                <XCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-label="Problem" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 rounded-xl border border-border bg-surface p-4">
        <p className="text-sm font-semibold">1. Record yourself for {TEST_SECONDS} seconds</p>
        <p className="text-xs text-muted-foreground">
          Say anything — for example, describe the room you are in. When the browser asks, allow the
          microphone.
        </p>
        <Button className="h-11 w-full" onClick={() => void record()} disabled={recording}>
          {recording ? (
            <>
              <Square className="mr-2 size-4 fill-current" aria-hidden />
              Recording… {countdown}
            </>
          ) : (
            <>
              <Mic className="mr-2 size-4" aria-hidden />
              {clip ? "Record again" : "Start recording"}
            </>
          )}
        </Button>

        {micError && <p className="rounded-lg bg-danger-soft p-3 text-sm text-danger">{micError}</p>}

        {clip && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">2. Play it back — can you hear yourself clearly?</p>
            <audio controls src={clip.url} className="w-full" />
            <p className="text-xs text-muted-foreground tnum">
              {clip.seconds} s · {clip.kb} KB · {clip.mime}
            </p>
          </div>
        )}
      </section>

      <section className="space-y-3 rounded-xl border border-border bg-surface p-4">
        <p className="text-sm font-semibold">3. Can the tablet speak a question?</p>
        <p className="text-xs text-muted-foreground">Needed for Interactive Speaking, where a question is read aloud once.</p>
        <Button variant="outline" className="h-11 w-full" onClick={speak} disabled={!("speechSynthesis" in window)}>
          <Volume2 className="mr-2 size-4" aria-hidden />
          Play a sample question
        </Button>
        {spoke !== null && (
          <p className="text-xs text-muted-foreground">{spoke ? "The question played." : "The question could not play."}</p>
        )}
      </section>

      <section
        className={cn(
          "rounded-xl border p-4",
          verdict === "pass" ? "border-success/40 bg-success-soft" : verdict === "fail" ? "border-danger/40 bg-danger-soft" : "border-border bg-surface",
        )}
      >
        <p className="flex items-center gap-2 text-sm font-semibold">
          {verdict === "pass" ? (
            <CheckCircle2 className="size-4 text-success" aria-hidden />
          ) : verdict === "fail" ? (
            <XCircle className="size-4 text-danger" aria-hidden />
          ) : (
            <Circle className="size-4 text-muted-foreground" aria-hidden />
          )}
          {verdict === "pass"
            ? "Recording works on this device."
            : verdict === "fail"
              ? "Recording does not work on this device."
              : "Result appears after the recording test."}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Take a screenshot of this whole page and send it — it has everything needed to build
          speaking practice for this tablet.
        </p>
        <p className="mt-2 break-all text-[11px] text-muted-foreground">{navigator.userAgent}</p>
      </section>
    </div>
  );
}
