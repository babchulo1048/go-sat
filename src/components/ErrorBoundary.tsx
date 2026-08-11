import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * A crash must never cost her an in-progress test. Local state lives in
 * IndexedDB and is written after every interaction, so reloading resumes at
 * the same question with the correct time remaining.
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  override render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Your work is saved on this device. Reloading will pick up where you left off.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.location.reload()}>Reload</Button>
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Go home
          </Button>
        </div>
        {import.meta.env.DEV && (
          <pre className="max-w-full overflow-auto rounded-lg bg-surface-2 p-3 text-left text-xs text-muted-foreground">
            {error.stack ?? error.message}
          </pre>
        )}
      </div>
    );
  }
}
