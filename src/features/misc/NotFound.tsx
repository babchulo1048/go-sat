import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
        <p className="text-sm text-muted-foreground">
          That screen doesn't exist.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}
