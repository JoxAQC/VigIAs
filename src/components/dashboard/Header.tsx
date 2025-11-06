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
      <div className="ml-auto flex items-center gap-4">
        <span className="hidden sm:inline text-zinc-600">{user?.name}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <User className="h-5 w-5 text-zinc-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
