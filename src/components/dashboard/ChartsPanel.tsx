import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IncidentChart } from "./IncidentChart";
import { TrendChart } from "./TrendChart";

export function ChartsPanel() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
        <IncidentChart />
        <TrendChart />
    </div>
  );
}
