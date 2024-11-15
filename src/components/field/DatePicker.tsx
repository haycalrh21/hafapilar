import { Input } from "@mui/material";
import { CalendarDaysIcon } from "lucide-react";
import { HTMLProps, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

interface IDatePickerProps extends HTMLProps<HTMLInputElement> {
  dateFormat: string;
  onDateChange: (date: Date, formattedDate: string) => void;
}

export default function DatePicker({ dateFormat, value, onDateChange }: IDatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="border border-black rounded-md relative p-0"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="text"
          placeholder={dateFormat}
          required
          className="m-0 p-[13px] w-full"
          readOnly
          value={value}
        />
        <CalendarDaysIcon className="absolute right-3 top-4" />
      </div>
      {isCalendarOpen && (
        <Calendar
          className="!w-full rounded-md z-10 absolute top-[65px]"
          value={value as string || ''}
          onChange={(val) => {
            if (val instanceof Date) {
              const date = val;
              const formattedDate = new Intl.DateTimeFormat('id-ID', {
                dateStyle: 'medium',
                timeZone: 'Asia/Jakarta',
              }).format(date)
              onDateChange && onDateChange(date, formattedDate);
              setIsCalendarOpen(false);
            }
          }}
        />
      )}
    </div>
  );
}
