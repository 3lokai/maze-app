"use client"

// shadcn@canary - Modified to support custom player colors
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  style,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  style?: React.CSSProperties & { '--progress-color'?: string }
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-3 w-full overflow-hidden rounded-full shadow-inner",
        className
      )}
      style={style}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all duration-300 ease-out shadow-sm"
        style={{ 
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: style?.['--progress-color'] || 'hsl(var(--primary))',
          backgroundImage: `linear-gradient(90deg, ${style?.['--progress-color'] || 'hsl(var(--primary))'} 0%, ${style?.['--progress-color'] || 'hsl(var(--primary))'}dd 100%)`
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
