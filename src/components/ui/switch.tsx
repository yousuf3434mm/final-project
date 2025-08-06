import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Switch on করলে bar ও thumb দুটোই purple-800 হবে
        "peer bg-white data-[state=checked]:bg-purple-800 data-[state=unchecked]:bg-white border border-purple-200 data-[state=checked]:border-purple-800 focus-visible:border-purple-800 focus-visible:ring-purple-800/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Switch on করলে thumb ও purple-800 হবে, off এ purple-200
          "bg-white data-[state=checked]:bg-purple-800 data-[state=unchecked]:bg-purple-200 pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, SwitchPrimitive }