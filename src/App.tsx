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
