"use client";

import * as React from "react";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface CalenderDateRangeProps {
  className?: string;
  initialDateRange: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

export function CalenderDateRange({
  className,
  initialDateRange,
  onChange,
}: CalenderDateRangeProps) {
  const endDate = useSelector((state: RootState) => state.search.endDate);
  const [date, setDate] = React.useState<DateRange | undefined>(initialDateRange);

  const fromDate = startOfDay(new Date());

  React.useEffect(() => {
    if (onChange) {
      onChange(date);
    }
  }, [date, onChange]);

  React.useEffect(() => {
    setDate(initialDateRange);
  }, [initialDateRange]);

  return (
    <div className={cn("", className)}>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        disabled={(day) => isBefore(day, fromDate)}
      />
    </div>
  );
}
