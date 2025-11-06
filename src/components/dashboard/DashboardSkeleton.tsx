import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20 dark:bg-muted/50">
      <Skeleton className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="ml-auto h-10 w-10 rounded-full" />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-6 w-6 rounded-sm" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-7 w-1/3" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                    <Card className="h-[450px] md:h-full">
                        <CardHeader><Skeleton className="h-5 w-1/2" /></CardHeader>
                        <CardContent><Skeleton className="h-full w-full" /></CardContent>
                    </Card>
                    <div className="flex flex-col gap-4">
                        <Card>
                            <CardHeader><Skeleton className="h-5 w-1/2" /></CardHeader>
                            <CardContent><Skeleton className="h-[200px] w-full" /></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><Skeleton className="h-5 w-1/2" /></CardHeader>
                            <CardContent><Skeleton className="h-[200px] w-full" /></CardContent>
                        </Card>
                    </div>
                </div>
                <Card>
                    <CardHeader><Skeleton className="h-5 w-1/4" /></CardHeader>
                    <CardContent>
                       <div className="space-y-2">
                         {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                         ))}
                       </div>
                    </CardContent>
                </Card>
            </div>
        </main>
      </div>
    </div>
  );
}
