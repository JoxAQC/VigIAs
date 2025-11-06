import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { KpiPanel } from "@/components/dashboard/KpiPanel";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { ChartsPanel } from "@/components/dashboard/ChartsPanel";
import { AlertsTable } from "@/components/dashboard/AlertsTable";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <KpiPanel />
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                <InteractiveMap />
                <ChartsPanel />
              </div>
              <AlertsTable />
            </div>
        </main>
      </div>
    </div>
  );
}
