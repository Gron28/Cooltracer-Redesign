"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TimeRangeSelectorProps {
    ranges?: string[]
    activeRange?: string
    onRangeChange?: (range: string) => void
}

export function TimeRangeSelector({
    ranges = ["1d", "1w", "1m", "6m", "1y"],
    activeRange = "1m",
    onRangeChange
}: TimeRangeSelectorProps) {
    return (
        <div className="flex gap-1 text-[10px] font-medium bg-[#05040D] px-3 py-1 rounded-[8px] border border-[#29292D]">
            {ranges.map(range => (
                <button
                    key={range}
                    onClick={() => onRangeChange?.(range)}
                    className={cn(
                        "rounded transition-colors py-0.5 px-1 lg:px-2",
                        range === activeRange
                            ? "bg-blue-600/20 text-blue-400 border border-blue-500/50"
                            : "text-gray-500 hover:text-gray-300"
                    )}
                >
                    {range}
                </button>
            ))}
        </div>
    )
}
