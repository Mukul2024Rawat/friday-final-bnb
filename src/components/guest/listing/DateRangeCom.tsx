// components/guest/listing/DateRangeCom.tsx
import { CalenderDateRange } from "@/components/ui/CalenderDateRange";
import { DateRange } from "react-day-picker";

interface DateRangeComProps {
  dateRange: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
}

function DateRangeCom({ dateRange, onDateChange }: DateRangeComProps) {
  return (
    <CalenderDateRange onChange={onDateChange} initialDateRange={dateRange} />
  );
}

export default DateRangeCom;
