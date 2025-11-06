
import type { Alert } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function PriorityBadge({ priority }: { priority: Alert["prioridad"] }) {
  switch (priority) {
    case "ALTA":
      return <Badge className="bg-[#c9096b] text-primary-foreground hover:bg-[#c9096b]/90">ALTA</Badge>;
    case "MEDIA":
      return <Badge className="bg-[#f1a12c] text-primary-foreground hover:bg-[#f1a12c]/90">MEDIA</Badge>;
    case "BAJA":
      return <Badge className="bg-[#92b922] text-primary-foreground hover:bg-[#92b922]/90">BAJA</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}
