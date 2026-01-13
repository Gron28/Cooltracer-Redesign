"use client"

import * as React from "react"
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
  Area
} from "recharts"
import { Truck, Package, CheckCircle2 } from "lucide-react"

import { KPICard } from "@/components/dashboard/kpi-card"
import { ChartCard } from "@/components/dashboard/chart-card"
import { TimeRangeSelector } from "@/components/dashboard/time-range-selector"

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

      <div className="flex justify-center w-full shrink-0 mb-[10px]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["Todos", "Droguería Ramos", "Droguería Barracas", "Droguería Piedra Buena", "Mar del Plata", "Junín", "San Luis"].map((label, i) => (
            <Button
              key={label}
              className={cn(
                "whitespace-nowrap rounded-[5px] h-[32px] text-[11px] font-medium transition-all px-4",
                i === 1
                  ? `bg-[#1F77B4] text-white shadow-md hover:bg-[#1F77B4]`
                  : `text-gray-400 hover:text-white hover:bg-[${colors.interactive.hover}]`
              )}
              style={i !== 1 ? { backgroundColor: colors.background.primary } : undefined}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px]">

        <ChartCard
          title="Efectividad Repartos"
          className="col-span-1 lg:col-span-1"
          contentClassName="flex flex-col items-center justify-center pt-4 pb-4"
          headerAction={
            <div className="bg-[#05040D] rounded-[8px] px-3 py-1 border border-[#29292D]">
              <span className="text-[12px] text-[#EAEAEA]">11/01/2026</span>
            </div>
          }
        >
          <div className="relative w-full h-[200px] max-w-[250px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={effectivenessData}
                  cx="50%"
                  cy="50%"
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
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[30px] font-bold text-white">11%</span>
              <span className="text-[12px] text-[#9ca3af]">Total</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 px-2 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: colors.chart.blue }} />
              <span className="text-[10px] text-gray-400">Sistema: 2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: colors.chart.green }} />
              <span className="text-[10px] text-gray-400">Activos: 16</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: colors.chart.grey }} />
              <span className="text-[10px] text-gray-400">Manual: 0</span>
            </div>
          </div>
        </ChartCard>

        <div className="col-span-1 flex flex-col gap-[15px]">
          <KPICard
            title="Vehículos activos"
            value="206"
            icon={Truck}
            color={colors.brand.primary}
            progress={75}
          />
          <KPICard
            title="Repartos activos"
            value="130"
            icon={Package}
            color={colors.brand.secondary}
            progress={40}
          />
          <KPICard
            title="Repartos cerrados"
            value="14"
            icon={CheckCircle2}
            color={colors.brand.accent}
            progress={85}
          />
        </div>

        <ChartCard
          title="Efectividad Entregas"
          className="col-span-1 lg:col-span-2"
          headerAction={
            <TimeRangeSelector />
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deliveryEffectivenessData} margin={{ left: -20, right: 10, top: 10, bottom: -10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border.secondary} />
              <XAxis dataKey="day" stroke={colors.text.secondary} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke={colors.text.secondary} fontSize={10} tickLine={false} axisLine={false} max={100} tickCount={4} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: colors.background.primary, borderColor: colors.border.primary, color: '#fff' }}
              />
              <Bar
                dataKey="value"
                fill={colors.chart.blue}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Posiciones geocodificadas"
          className="col-span-1 lg:col-span-2"
          headerAction={
            <div className="bg-[#05040D] border border-[#29292D] rounded-[8px] px-3 py-1">
              <span className="text-[10px] font-semibold text-gray-400 uppercase">2026</span>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geocodedData} margin={{ left: -20, right: 10, top: 10, bottom: -10 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={colors.border.secondary} />
              <XAxis dataKey="month" stroke={colors.text.secondary} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke={colors.text.secondary} fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} tickCount={5} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: colors.background.primary, borderColor: colors.border.primary, color: '#fff' }}
              />
              <Bar
                dataKey="value"
                fill={colors.chart.green}
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Total Clientes"
          className="col-span-1 lg:col-span-2"
          headerAction={
            <>
              <span className="text-[9px] text-gray-500 italic hidden sm:inline-block leading-none mr-2">(Mes actual: 33256 | Únicos: 2480)</span>

              <div className="flex gap-2 text-[9px] mr-2">
                <div className="flex items-center gap-1 text-gray-400"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.chart.blue }}></span> Total</div>
                <div className="flex items-center gap-1 text-gray-400"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.chart.green }}></span> Únicos</div>
              </div>

              <TimeRangeSelector />
            </>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={totalClientsData} margin={{ left: -20, right: 10, top: 10, bottom: -10 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.chart.blue} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={colors.chart.blue} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.chart.green} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={colors.chart.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" vertical={true} horizontal={true} stroke={colors.border.secondary} />
              <XAxis dataKey="period" stroke={colors.text.secondary} fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke={colors.text.secondary} fontSize={9} tickLine={false} axisLine={false} min={0} max={1800} tickCount={4} />
              <Tooltip
                cursor={{ stroke: colors.border.secondary, strokeWidth: 1 }}
                contentStyle={{ backgroundColor: colors.background.primary, borderColor: colors.border.primary, color: '#fff' }}
              />
              <Area type="monotone" dataKey="total" stroke={colors.chart.blue} strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
              <Area type="monotone" dataKey="unique" stroke={colors.chart.green} strokeWidth={2} fillOpacity={1} fill="url(#colorUnique)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  )
}