import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface ITooltip {
  children: ReactNode;
  hoverText: string;
}

export function TooltipContainer({ children, hoverText }: ITooltip) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{hoverText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
