import React from 'react';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { DateRange } from "react-day-picker"

interface DateRangePickerButtonProps {
  date: DateRange | undefined;
}

export const DateRangePickerButton = React.forwardRef<HTMLButtonElement, DateRangePickerButtonProps>(
  ({ date }, ref) => {
    return (
      <Button
        ref={ref}
        id="date"
        variant={"outline"}
        className={cn(
          "w-[300px] justify-between text-left font-normal border border-gray-300 rounded-lg  bg-transparent",
          !date && "text-muted-foreground"
        )}
      >
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">CHECK-IN</span>
          {date?.from ? (
            <span>{format(date.from, "MM/dd/yyyy")}</span>
          ) : (
            <span>Pick a date</span>
          )}
        </div>
        <div className="line w-[2px] bg-gray-300 h-[100%]"></div>
        <div className="flex flex-col items-start ">
          <span className="text-xs text-gray-500">CHECKOUT</span>
          {date?.to ? (
            <span>{format(date.to, "MM/dd/yyyy")}</span>
          ) : (
            <span>Pick a date</span>
          )}
        </div>
      </Button>
    );
  }
);

DateRangePickerButton.displayName = 'DateRangePickerButton';