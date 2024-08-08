"use client"
import * as React from "react";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface DateRangePickerProps {
  className?: string;
  onChange: (range: DateRange | undefined) => void;
}
export function SecondDate({
  className,
  onChange
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const fromDate = startOfDay(new Date());
  React.useEffect(() => {
    if (onChange) {
      onChange(date);
    }
  }, [date, onChange]);
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
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
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(day) => isBefore(day, fromDate)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}