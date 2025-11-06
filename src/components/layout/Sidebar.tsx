"use client";

import Link from "next/link";
import {
  Home,
  Settings,
  PanelLeft,
  User,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "../icons/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Sidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "#", icon: Settings, label: "Configuración", disabled: true },
    { href: "/login", icon: LogOut, label: "Cerrar Sesión", action: logout },
  ];

  const navContent = (
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <Link
        href="#"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <ShieldAlert className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">SJL Alerta</span>
      </Link>
      {navItems.map((item) => (
        <TooltipProvider key={item.label}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                onClick={item.action}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  item.disabled
                    ? "text-muted-foreground cursor-not-allowed"
                    : "text-muted-foreground transition-colors hover:text-foreground"
                } md:h-8 md:w-8`}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </nav>
  );
  
  const mobileNavContent = (
    <nav className="grid gap-6 text-lg font-medium">
      <Link
        href="#"
        className="group flex items-center gap-2 text-lg font-semibold"
      >
        <Logo />
      </Link>
      {navItems.map((item) => (
         <Link
          key={item.label}
          href={item.href}
          onClick={item.action}
          className={`flex items-center gap-4 px-2.5 ${item.disabled ? 'text-muted-foreground hover:text-muted-foreground cursor-not-allowed' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );


  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex bg-[#303941] text-white">
        {navContent}
      </aside>
      
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:hidden sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
           {mobileNavContent}
          </SheetContent>
        </Sheet>
        <div className="ml-auto">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                  <User className="size-5"/>
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
    </>
  );
}
