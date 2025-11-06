import { ShieldAlert } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-semibold text-primary">
      <ShieldAlert className="h-8 w-8" />
      <span className="text-xl font-bold text-foreground">SJL Alerta</span>
    </div>
  );
}
