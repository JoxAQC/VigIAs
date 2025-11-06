
import type { Alert } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function PriorityBadge({ priority }: { priority: Alert["prioridad"] }) {
  switch (priority) {
    case "ALTA":
      return <Badge variant="destructive">ALTA</Badge>;
    case "MEDIA":
      return <Badge className="bg-[hsl(var(--chart-4))] text-primary-foreground hover:bg-[hsl(var(--chart-4))]">MEDIA</Badge>;
    case "BAJA":
      return <Badge className="bg-[hsl(var(--chart-1))] text-primary-foreground hover:bg-[hsl(var(--chart-1))]">BAJA</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}
