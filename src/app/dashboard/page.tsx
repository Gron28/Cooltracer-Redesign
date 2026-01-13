"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { colors } from "@/lib/colors"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  Legend
} from "recharts"
import { Truck, Package, CheckCircle2 } from "lucide-react"

// --- Mock Data ---

const effectivenessData = [
  { name: "Activos", value: 16, color: "#10b981" },
  { name: "Sistema", value: 2, color: "#3b82f6" },
  { name: "Resto", value: 82, color: "#1f2937" },
]

const deliveryEffectivenessData = [
  75, 82, 85, 75, 68, 80, 0, 0, 80, 75, 75, 82, 85, 0, 82, 68, 70, 75, 80, 78, 85, 0, 75, 75, 62, 0, 80, 85, 0, 70
].map((v, i) => ({ day: i + 1, value: v }))

const geocodedData = [
  { month: "1", value: 80 }, { month: "2", value: 82 }, { month: "3", value: 100 },
  { month: "4", value: 100 }, { month: "5", value: 100 }, { month: "6", value: 82 },
  { month: "7", value: 95 }, { month: "8", value: 82 }, { month: "9", value: 80 },
  { month: "10", value: 80 }, { month: "11", value: 80 }, { month: "12", value: 58 }
]

const totalClientsData = Array.from({ length: 30 }, (_, i) => {
  const t = Math.floor(800 + 400 * Math.sin(i / 2.5) + 200 * Math.cos(i / 5) + 100);
  const u = Math.floor(400 + 200 * Math.sin(i / 2.5) + 50 * Math.cos(i / 5) + 50);
  return { period: i + 1, total: t, unique: u };
})


export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full gap-[5px] font-sans text-[#EAEAEA]">
      
      {/* Client Buttons - Center and Styled */}
      <div className="flex justify-center w-full shrink-0 mb-[10px]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["Todos", "Droguería Ramos", "Droguería Barracas", "Droguería Piedra Buena", "Mar del Plata", "Junín", "San Luis"].map((label, i) => (
            <Button
              key={label}
              className={cn(
                "whitespace-nowrap rounded-[5px] h-[32px] text-[11px] font-medium border transition-all px-4",
                i === 1 // "Droguería Ramos" active
                  ? `bg-[#1F77B4] text-white border-[#1F77B4] shadow-md hover:bg-[#1F77B4]`
                  : `bg-[${colors.background.primary}] text-[${colors.text.primary}] border-[${colors.border.primary}] hover:bg-[${colors.interactive.hover}]`
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px]">
        
        {/* 1. Donut Chart (Efectividad Repartos) */}
        <Card className="col-span-1 lg:col-span-1 bg-[#11151C] rounded-[10px] flex flex-col min-h-[350px] border-none shadow-none">
          <CardHeader className="shrink-0 pb-2 flex flex-row items-center justify-between h-[45px] px-4 py-2">
             <CardTitle className="text-[13px] font-bold text-[#EAEAEA]">Efectividad Repartos</CardTitle>
             <div className="bg-[#05040D] rounded-[8px] px-3 py-1 border border-[#29292D]">
                <span className="text-[12px] text-[#EAEAEA]">11/01/2026</span>
             </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-start pt-0 pb-4">
             <div className="relative w-full h-[200px] max-w-[250px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={effectivenessData}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                    >
                      {effectivenessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-4">
                   <span className="text-[30px] font-bold text-white">11%</span>
                   <span className="text-[12px] text-[#9ca3af]">Total</span>
                </div>
             </div>

             {/* Legend */}
             <div className="flex flex-wrap justify-center gap-3 px-2 mt-2">
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-[2px] bg-[#3b82f6]" />
                 <span className="text-[10px] text-gray-400">Sistema: 2</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-[2px] bg-[#10b981]" />
                 <span className="text-[10px] text-gray-400">Activos: 16</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1f2937]" />
                 <span className="text-[10px] text-gray-400">Manual: 0</span>
               </div>
             </div>
          </CardContent>
        </Card>

        {/* 2. KPI Cards (Middle Column) */}
        <div className="col-span-1 flex flex-col gap-[15px]">
           
           {/* Stat 1: Vehículos activos */}
           <Card className="bg-[#11151C] rounded-[10px] p-5 flex flex-row items-center justify-between min-h-[110px] border-none shadow-none">
              <div className="flex flex-col flex-1">
                 <span className="text-[13px] font-semibold text-gray-300">Vehículos activos</span>
                 <div className="flex items-center gap-3 mt-1">
                    <span className="text-[32px] font-bold text-white leading-none">206</span>
                    {/* Progress Ring */}
                    <div className="block h-6 w-6 relative">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-[#414152]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-[#1F77B4]" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </div>
                 </div>
              </div>
              {/* Icon Container (Original Icons) */}
              <div className="h-[43px] w-[43px] flex items-center justify-center rounded-[10px] border border-[#1F77B4]/30 text-[#1F77B4]">
                 <Truck size={22} />
              </div>
           </Card>

           {/* Stat 2: Repartos activos */}
           <Card className="bg-[#11151C] rounded-[10px] p-5 flex flex-row items-center justify-between min-h-[110px] border-none shadow-none">
              <div className="flex flex-col flex-1">
                 <span className="text-[13px] font-semibold text-gray-300">Repartos activos</span>
                 <div className="flex items-center gap-3 mt-1">
                    <span className="text-[32px] font-bold text-white leading-none">130</span>
                    {/* Progress Ring */}
                    <div className="block h-6 w-6 relative">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-[#414152]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-[#5BB3FA]" strokeDasharray="40, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </div>
                 </div>
              </div>
              <div className="h-[43px] w-[43px] flex items-center justify-center rounded-[10px] border border-[#5BB3FA]/30 text-[#5BB3FA]">
                 <Package size={22} />
              </div>
           </Card>

           {/* Stat 3: Repartos cerrados */}
           <Card className="bg-[#11151C] rounded-[10px] p-5 flex flex-row items-center justify-between min-h-[110px] border-none shadow-none">
              <div className="flex flex-col flex-1">
                 <span className="text-[13px] font-semibold text-gray-300">Repartos cerrados</span>
                 <div className="flex items-center gap-3 mt-1">
                    <span className="text-[32px] font-bold text-white leading-none">14</span>
                    {/* Progress Ring */}
                    <div className="block h-6 w-6 relative">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-[#414152]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-[#27D699]" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </div>
                 </div>
              </div>
              <div className="h-[43px] w-[43px] flex items-center justify-center rounded-[10px] border border-[#27D699]/30 text-[#27D699]">
                 <CheckCircle2 size={22} />
              </div>
           </Card>
        </div>

        {/* 3. Top Right Bar Chart (Efectividad Entregas) */}
        <Card className="col-span-1 lg:col-span-2 bg-[#11151C] rounded-[10px] flex flex-col min-h-[350px] border-none shadow-none">
          <CardHeader className="shrink-0 pb-2 flex flex-row items-center justify-between h-[45px] px-4 py-2">
             <CardTitle className="text-[13px] font-bold text-[#EAEAEA]">Efectividad Entregas</CardTitle>
             <div className="flex gap-1 text-[10px] font-medium bg-[#05040D] px-3 py-1 rounded-[8px] border border-[#29292D]">
                {["1d", "1w", "1m", "6m", "1y"].map(f => (
                    <button key={f} className={cn("px-2 py-0.5 rounded transition-colors", f === "1m" ? "bg-blue-600/20 text-blue-400 border border-blue-500/50" : "text-gray-500 hover:text-gray-300")}>{f}</button>
                ))}
             </div>
          </CardHeader>
          <CardContent className="flex-1 p-2 pb-0 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={deliveryEffectivenessData} margin={{ left: -20, right: 10, top: 10, bottom: -10 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                 <XAxis dataKey="day" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                 <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} max={100} tickCount={4} />
                 <Tooltip contentStyle={{ backgroundColor: '#11151C', borderColor: '#29292D', color: '#fff' }} />
                 <Bar
                   dataKey="value"
                   fill="#0ea5e9"
                   radius={[2, 2, 0, 0]}
                 />
               </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 4. Bottom Left Bar Chart (Posiciones) */}
        <Card className="col-span-1 lg:col-span-2 bg-[#11151C] rounded-[10px] flex flex-col min-h-[350px] border-none shadow-none">
            <CardHeader className="shrink-0 pb-2 flex flex-row items-center justify-between h-[45px] px-4 py-2">
               <CardTitle className="text-[13px] font-bold text-[#EAEAEA]">Posiciones geocodificadas</CardTitle>
               <div className="bg-[#05040D] border border-[#29292D] rounded-[8px] px-3 py-1">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase">2026</span>
               </div>
            </CardHeader>
            <CardContent className="flex-1 p-2 pb-0 min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={geocodedData} margin={{ left: -20, right: 10, top: 10, bottom: -10 }}>
                   <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#1f2937" />
                   <XAxis dataKey="month" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                   <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} tickCount={5} />
                   <Tooltip contentStyle={{ backgroundColor: '#11151C', borderColor: '#29292D', color: '#fff' }} />
                   <Bar
                      dataKey="value"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                   >
                      {geocodedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 7 ? "#1d4ed8" : "#10b981"} />
                      ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>

         {/* 5. Bottom Right Area Chart (Total Clientes) */}
         <Card className="col-span-1 lg:col-span-2 bg-[#11151C] rounded-[10px] flex flex-col min-h-[350px] border-none shadow-none">
            <CardHeader className="shrink-0 pb-2 flex flex-row items-center justify-between h-[45px] px-4 py-2 gap-2">
               <div className="flex items-center gap-2">
                   <CardTitle className="text-[13px] font-bold text-[#EAEAEA]">Total Clientes</CardTitle>
                   <span className="text-[9px] text-gray-500 italic hidden sm:inline-block leading-none">(Mes actual: 33256 | Únicos: 2480)</span>
               </div>
               <div className="flex items-center gap-3">
                  {/* Custom Legend */}
                  <div className="flex gap-2 text-[9px]">
                      <div className="flex items-center gap-1 text-gray-400"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Total</div>
                      <div className="flex items-center gap-1 text-gray-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Únicos</div>
                  </div>
                  {/* Controls */}
                  <div className="flex gap-1 text-[9px] font-medium bg-[#05040D] px-3 py-1 rounded-[8px] border border-[#29292D]">
                    {["1d", "1w", "1m", "6m"].map(f => (
                        <button key={f} className={cn("px-1.5 py-0.5 rounded transition-colors", f === "1m" ? "bg-blue-600/20 text-blue-400 border border-blue-500/50" : "text-gray-500 hover:text-gray-300")}>{f}</button>
                    ))}
                  </div>
               </div>
            </CardHeader>
            <CardContent className="flex-1 p-2 pb-0 min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={totalClientsData} margin={{ left: -20, right: 10, top: 10, bottom: -10 }}>
                   <defs>
                     <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="0" vertical={true} horizontal={true} stroke="#1f2937" />
                   <XAxis dataKey="period" stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} />
                   <YAxis stroke="#9ca3af" fontSize={9} tickLine={false} axisLine={false} min={0} max={1800} tickCount={4} />
                   <Tooltip contentStyle={{ backgroundColor: '#11151C', borderColor: '#29292D', color: '#fff' }} />
                   <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                   <Area type="monotone" dataKey="unique" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorUnique)" />
                 </AreaChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>

      </div>
    </div>
  )
}