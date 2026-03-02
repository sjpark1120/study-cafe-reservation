import * as React from "react"

import { cn } from "@/lib/utils"

export interface TagBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
}

export function TagBadge({ label, className, ...rest }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground",
        className
      )}
      {...rest}
    >
      {label}
    </span>
  )
}

