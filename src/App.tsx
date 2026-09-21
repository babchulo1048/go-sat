import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/components/AppShell";
import { ContentGate } from "@/components/ContentGate";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { InstallPrompt } from "@/components/InstallPrompt";

import { HomePage } from "@/features/home/HomePage";
import { PracticePage } from "@/features/practice/PracticePage";
import { PreTestBrief } from "@/features/practice/PreTestBrief";
import { TestRunner } from "@/features/runner/TestRunner";
import { ResultsPage } from "@/features/results/ResultsPage";
import { QuestionReview } from "@/features/review/QuestionReview";
import { MistakeLog } from "@/features/review/MistakeLog";
import { NotesPage } from "@/features/notes/NotesPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { NotFound } from "@/features/misc/NotFound";

/*
 * The Duolingo section is split out too: its content (80 prompts, 197 words,
 * guides) shouldn't slow the first load of the SAT screens. It is still
 * precached by the service worker, so it works offline all the same.
 */
const det = <K extends string>(name: K) =>
  lazy(() => import("@/features/det/pages").then((m) => ({ default: m[name as keyof typeof m] })));
const DetHome = det("DetHome");
const DetTaskPage = det("DetTaskPage");
const DetWritingRunner = det("DetWritingRunner");
const VocabPage = det("VocabPage");
const DrillsPage = det("DrillsPage");
const MicTestPage = det("MicTestPage");

const lazyFallback = <Skeleton className="h-96 w-full rounded-xl" />;

/*
 * Progress is the only screen that needs a charting library. Splitting it out
 * keeps ~400 kB of Recharts off the critical path for the screens she actually
 * opens every day — which matters on a phone and on a slow connection.
 */
const ProgressPage = lazy(() =>
  import("@/features/progress/ProgressPage").then((m) => ({ default: m.ProgressPage })),
);

export default function App() {
  return (
    <ErrorBoundary>
      <ContentGate>
        <Routes>
          {/*
            The runner sits OUTSIDE the shell on purpose: no tab bar, no header,
            nothing to tap away to mid-question.
          */}
          <Route path="/run/:attemptId" element={<TestRunner />} />
          <Route path="/det/run/:promptId" element={<Suspense fallback={lazyFallback}><DetWritingRunner /></Suspense>} />

          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/:testId" element={<PreTestBrief />} />
            <Route path="/results/:attemptId" element={<ResultsPage />} />
            <Route path="/review" element={<MistakeLog />} />
            <Route path="/review/:attemptId" element={<QuestionReview />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route
              path="/progress"
              element={
                <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
                  <ProgressPage />
                </Suspense>
              }
            />
            <Route path="/det" element={<Suspense fallback={lazyFallback}><DetHome /></Suspense>} />
            <Route path="/det/task/:taskId" element={<Suspense fallback={lazyFallback}><DetTaskPage /></Suspense>} />
            <Route path="/det/vocab" element={<Suspense fallback={lazyFallback}><VocabPage /></Suspense>} />
            <Route path="/det/drills" element={<Suspense fallback={lazyFallback}><DrillsPage /></Suspense>} />
            <Route path="/det/mic" element={<Suspense fallback={lazyFallback}><MicTestPage /></Suspense>} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ContentGate>
      <InstallPrompt />
      <Toaster position="top-center" />
    </ErrorBoundary>
  );
}
