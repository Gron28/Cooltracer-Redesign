"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
  toggleCollapse: () => void
  isMobile?: boolean
  closeMobile?: () => void
}

export function Sidebar({ className, isCollapsed, toggleCollapse, isMobile, closeMobile }: SidebarProps) {
  const pathname = usePathname()

  // Main navigation items
  const mainNavItems = [
    { title: "Dashboard", href: "/dashboard", icon: "/icons/nav-dashboard.svg" },
    { title: "Monitoreo", href: "/dashboard/monitoring", icon: "/icons/nav-monitoring.svg" },
    { title: "Recorridos", href: "/dashboard/routes", icon: "/icons/nav-routes.svg" },
    { title: "Repartos", href: "/dashboard/deliveries", icon: "/icons/nav-deliveries.svg" },
    { title: "Reportes", href: "/dashboard/reports", icon: "/icons/nav-reports.svg" },
    { title: "Parámetros", href: "/dashboard/parameters", icon: "/icons/nav-parameters.svg" },
    { title: "Seguridad", href: "/dashboard/security", icon: "/icons/nav-security.svg" },
    { title: "Cooltracer", href: "/dashboard/about", icon: "/icons/nav-cooltracer.svg" },
  ]

  // Bottom navigation items
  const bottomNavItems = [
    { title: "Usuario", href: "/dashboard/profile", icon: "/icons/nav-user.svg" },
    { title: "Configuración", href: "/dashboard/settings", icon: "/icons/nav-settings.svg" },
    { title: "Cerrar Sesión", href: "/", icon: "/icons/nav-logout.svg" },
  ]

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out flex flex-col font-sans",
        isCollapsed ? "w-[50px]" : "w-[245px]",
        "bg-[#11151C] text-[#EAEAEA] p-[10px] gap-[10px]",
        className
      )}
    >
      {/* Header / Hamburger Toggle */}
      <div className={cn("flex items-center h-[30px] shrink-0", isCollapsed ? "w-[30px] justify-center" : "px-[10px] w-full")}>
         {!isMobile && (
           <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="h-6 w-6 text-[#EAEAEA] hover:bg-[#1A1A24] p-0 shrink-0"
           >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
           </Button>
         )}

         {(!isCollapsed || isMobile) && (
           <span className={cn("text-[20px] font-bold text-[#EAEAEA] leading-none whitespace-nowrap", !isMobile && "ml-[11px]")}>Cooltracer</span>
         )}
         
         {isMobile && (
             <Button
                variant="ghost"
                size="icon"
                onClick={closeMobile}
                className="ml-auto h-6 w-6 text-[#EAEAEA] hover:bg-[#1A1A24] p-0 shrink-0"
             >
                <ChevronLeft size={20} />
             </Button>
         )}
      </div>
      
      {/* Main Navigation */}
      <nav className="flex flex-col gap-[10px]">
        {mainNavItems.map((item) => {
          const isActive = item.title === "Dashboard" && pathname === "/dashboard";
          
          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => isMobile && closeMobile?.()}
              className={cn(
                "flex items-center gap-[10px] h-[30px] rounded-[10px] transition-colors",
                isCollapsed ? "w-[30px] justify-center" : "px-[10px] w-full",
                isActive
                  ? "bg-[#266599] text-white"
                  : "text-[#EAEAEA] hover:bg-[#1A1A24]"
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <img 
                src={item.icon} 
                alt={item.title} 
                className={cn("h-4 w-4 shrink-0 filter brightness-0 invert", !isActive && "opacity-60")} 
              />
              {!isCollapsed && (
                <span className="text-[12px] font-normal leading-none truncate">{item.title}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Navigation */}
      <nav className="flex flex-col gap-[10px]">
           {bottomNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => isMobile && closeMobile?.()}
                className={cn(
                  "flex items-center gap-[10px] h-[30px] rounded-[10px] transition-colors",
                  isCollapsed ? "w-[30px] justify-center" : "px-[10px] w-full",
                  "text-[#EAEAEA] hover:bg-[#1A1A24]"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <img src={item.icon} alt={item.title} className="h-4 w-4 shrink-0 filter brightness-0 invert opacity-60" />
                {!isCollapsed && (
                  <span className="text-[12px] font-normal leading-none truncate">{item.title}</span>
                )}
              </Link>
           ))}
      </nav>
    </aside>
  )
}