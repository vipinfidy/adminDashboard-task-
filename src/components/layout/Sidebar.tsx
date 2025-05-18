
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  LayoutDashboard, 
  List, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

interface SidebarProps {
  open: boolean;
}

const mainNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: List,
  },
];

const otherNavItems: NavItem[] = [
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const location = useLocation();

  const NavItem = ({ item, open }: { item: NavItem; open: boolean }) => {
    const isActive = location.pathname === item.href;
    const IconComponent = item.icon;

    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-2 py-3 px-3 rounded-md transition-colors",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
        )}
      >
        <IconComponent className="h-5 w-5 shrink-0" />
        {open && <span className="transition-opacity duration-200">{item.label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-full bg-sidebar transition-all duration-300 border-r border-border",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
            AD
          </div>
          {open && (
            <span className="font-semibold text-sidebar-foreground">
              Admin Dashboard
            </span>
          )}
        </Link>
      </div>

      <nav className="mt-6 px-3 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem key={item.href} item={item} open={open} />
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <p className={cn(
            "mb-2 text-xs uppercase text-sidebar-foreground/60",
            !open && "sr-only"
          )}>
            System
          </p>
          <div className="space-y-1">
            {otherNavItems.map((item) => (
              <NavItem key={item.href} item={item} open={open} />
            ))}
          </div>
        </div>
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-3">
        <Link
          to="/logout"
          className="flex items-center gap-2 py-2 px-3 w-full rounded-md text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {open && <span>Log out</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
