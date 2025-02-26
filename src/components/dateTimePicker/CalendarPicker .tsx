"use client";

import React, { useState } from "react";
import { FormControl } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/dateTimePicker/dateTimePicker.css";
import { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale";

// ロケール設定
registerLocale("ja", ja);

type Props = {
  title?: string; 
  className?:string
};

const CalendarPicker = ({title,className}:Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
   <div>
     {title && (
        <label className="block w-[100px] min-h-[20px]">{title}</label>
      )}
      <FormControl className="w-full">
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd"
          locale="ja"
          className={`react-datepicker__input text-gray-800 p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${className}`}
        />
      </FormControl>
    </div>
  );
};

export default CalendarPicker;
