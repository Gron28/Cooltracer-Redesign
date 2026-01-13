"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  // Initialize state based on device
  React.useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false) // Sidebar inside drawer is full width
      setIsMobileOpen(false) // Closed by default on mobile
    } else {
      setIsCollapsed(false) // Open by default on desktop
    }
  }, [isMobile])

  return (
    <div className="flex h-screen bg-[#05040D] overflow-hidden">
      {/* Mobile Backdrop */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <Sidebar 
        isCollapsed={isMobile ? false : isCollapsed} 
        toggleCollapse={() => {
          if (isMobile) setIsMobileOpen(!isMobileOpen)
          else setIsCollapsed(!isCollapsed)
        }}
        className={cn(
          isMobile 
            ? `fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`
            : ""
        )}
        isMobile={isMobile}
        closeMobile={() => setIsMobileOpen(false)}
      />
      
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
        isMobile ? "ml-0" : (isCollapsed ? "ml-[50px]" : "ml-[245px]")
      )}>
        {/* Main Content Header */}
        <header className="h-[50px] shrink-0 bg-[#11151C] flex items-center px-4 justify-between">
           <div className="flex items-center gap-3">
             {isMobile && (
               <button onClick={() => setIsMobileOpen(true)} className="text-[#EAEAEA]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
               </button>
             )}
             <h1 className="text-[18px] font-bold text-[#EAEAEA]">Dashboard</h1>
           </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-[15px]">
            {children}
        </main>
      </div>
    </div>
  )
}
