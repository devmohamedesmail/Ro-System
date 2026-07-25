import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

import { cn } from "@/lib/utils"
import useImport from "@/hooks/use-import"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
 
 const{isRtl}=useImport()
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        `text-sm block mb-1 leading-none font-medium  group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${
          isRtl?"text-right":"text-left"
        }`,
        className
      )}
      {...props}
    />
  )
}

export { Label }
