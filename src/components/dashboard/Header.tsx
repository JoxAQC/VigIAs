"use client";

import { LogOut, User, Menu, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from 'next/link';

export function Header() {
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "#", label: "Configuración", disabled: true },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-end">
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs bg-[#303941] text-white border-r-0">
             <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <ShieldAlert className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">SJL Alerta</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 px-2.5 ${item.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-200 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
             <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-500/50">
                <div className="flex items-center gap-2">
                  <User className="h-8 w-8 rounded-full bg-gray-600 p-1" />
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-start gap-2 mt-4 hover:bg-white/10" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </Button>
             </div>
          </SheetContent>
        </Sheet>
      </div>
       <div className="hidden sm:block">
        <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground"
          >
            <ShieldAlert className="h-6 w-6 text-primary" />
            <span className="text-xl">SJL Alerta</span>
          </Link>
      </div>
      <div className="sm:hidden">
         <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground"
          >
            <ShieldAlert className="h-6 w-6 text-primary" />
            <span>SJL Alerta</span>
          </Link>
      </div>
    </header>
  );
}
