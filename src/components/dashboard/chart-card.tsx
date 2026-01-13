"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ChartCardProps {
    title: string
    headerAction?: React.ReactNode
    children: React.ReactNode
    className?: string
    contentClassName?: string
}

export function ChartCard({
    title,
    headerAction,
    children,
    className,
    contentClassName
}: ChartCardProps) {
    return (
        <Card className={cn("bg-[#11151C] rounded-[10px] flex flex-col min-h-[350px] border-none shadow-none", className)}>
            <CardHeader className="shrink-0 flex flex-row items-center justify-between px-6 py-5 border-b border-[#29292D]">
                <CardTitle className="text-[13px] font-bold text-[#EAEAEA]">{title}</CardTitle>
                {headerAction && (
                    <div className="flex items-center gap-3">
                        {headerAction}
                    </div>
                )}
            </CardHeader>

            <CardContent className={cn("flex-1 p-4 pb-[5px] lg:pb-[10px] min-h-0", contentClassName)}>
                {children}
            </CardContent>
        </Card>
    )
}
