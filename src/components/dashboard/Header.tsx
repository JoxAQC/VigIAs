"use client";

import { LogOut, User, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "../layout/Sidebar";

export function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-[#303941] px-4 text-white sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
       <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5 text-black" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <h1 className="text-xl font-semibold hidden sm:block text-zinc-600">Dashboard</h1>
    </header>
  );
}
