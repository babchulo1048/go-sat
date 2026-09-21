import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BarChart3, BookOpen, Home, Languages, Settings, Target } from "lucide-react";
import { SyncIndicator } from "@/components/SyncIndicator";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/practice", label: "Practice", icon: Target, end: false },
  { to: "/review", label: "Review", icon: BookOpen, end: false },
  { to: "/progress", label: "Progress", icon: BarChart3, end: false },
  { to: "/det", label: "English", icon: Languages, end: false },
] as const;

const TITLES: Record<string, string> = {
  "/practice": "Practice",
  "/review": "Review",
  "/progress": "Progress",
  "/notes": "Notes",
  "/settings": "Settings",
  "/det": "Duolingo English Test",
  "/det/vocab": "Vocabulary",
  "/det/drills": "Sentence variety",
  "/det/mic": "Microphone test",
};

export function AppShell() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? "";

  return (
    <div className="min-h-dvh bg-background">
      <header className="pt-safe sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-3 px-4">
          <h1 className="truncate text-[17px] font-semibold tracking-tight">
            {title || "SAT Practice"}
          </h1>
          <div className="flex items-center gap-3">
            <SyncIndicator />
            <NavLink
              to="/settings"
              aria-label="Settings"
              className={({ isActive }) =>
                cn(
                  "grid size-11 place-items-center rounded-lg transition-colors",
                  isActive ? "text-brand" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              <Settings className="size-5" aria-hidden />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Bottom padding clears the fixed tab bar. */}
      <main className="mx-auto w-full max-w-3xl px-4 pt-5 pb-28">
        <Outlet />
      </main>

      <nav
        aria-label="Main"
        className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex w-full max-w-3xl items-stretch justify-around">
          {TABS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                  isActive ? "text-brand" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className="size-5"
                    strokeWidth={isActive ? 2.4 : 1.9}
                    aria-hidden
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
