"use client";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils"; // Ensure you have a utility function for class merging

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Provider>{children}</TooltipPrimitive.Provider>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Root delayDuration={200}>
      {children}
    </TooltipPrimitive.Root>
  );
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>;
}

export function TooltipContent({
  children,
  side = "top",
  sideOffset = 6, 
  className,
}: {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left"; 
  sideOffset?: number; 
  className?: string;
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={cn(
          "bg-[#e5e7eb] text-black font-poppins text-sm px-4 py-2 rounded-md shadow-md",
          className
        )}
        side={side} // Dynamically set the tooltip side
        sideOffset={sideOffset} // Adding margin of 2 by default
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-[#e5e7eb]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

  