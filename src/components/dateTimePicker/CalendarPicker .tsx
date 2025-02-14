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
  title: string; 
};

const CalendarPicker = ({title}:Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="m-auto">
      <label className="block">{title}</label>
    <FormControl>
      <DatePicker
        id="date"
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
        locale="ja"
        className="react-datepicker__input text-gray-800 p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FormControl>
    </div>
  );
};

export default CalendarPicker;
