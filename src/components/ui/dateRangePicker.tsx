"use client";

import * as React from "react";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  className?: string;
  onChange: (range: DateRange | undefined) => void;
  initialDateRange?: DateRange;
  customButton?: boolean;
  buttonBuilder?: (date: DateRange | undefined) => any;
  numberdOfMonths?: number;
}

export function DateRangePicker({
  className,
  onChange,
  initialDateRange = {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
  customButton = false,
  buttonBuilder,
  numberdOfMonths
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(initialDateRange);

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
          {buttonBuilder ? buttonBuilder(date) : (
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={numberdOfMonths}
            disabled={(day) => isBefore(day, fromDate)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
