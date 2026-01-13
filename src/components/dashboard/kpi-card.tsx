"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
    title: string
    value: string | number
    icon: LucideIcon
    color: string
    progress?: number
    secondaryRingColor?: string
}

export function KPICard({
    title,
    value,
    icon: Icon,
    color,
    progress = 100,
    secondaryRingColor = "#414152"
}: KPICardProps) {
    const dashArray = `${progress}, 100`

    return (
        <Card className="bg-[#11151C] rounded-[10px] p-5 flex flex-row items-center justify-between min-h-[110px] border-none shadow-none">
            <div className="flex flex-col flex-1">
                <span className="text-[13px] font-semibold text-gray-300">{title}</span>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-[32px] font-bold text-white leading-none">{value}</span>

                    <div className="block h-6 w-6 relative">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="transition-colors duration-300"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={secondaryRingColor}
                                strokeWidth="4"
                            />
                            <path
                                style={{ stroke: color }}
                                strokeDasharray={dashArray}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeWidth="4"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    "h-[43px] w-[43px] flex items-center justify-center rounded-[10px] border-2 bg-transparent transition-colors duration-300"
                )}
                style={{
                    borderColor: color,
                    color: color
                }}
            >
                <Icon size={22} />
            </div>
        </Card>
    )
}
