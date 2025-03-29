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
  className?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void; // 親コンポーネントに変更を通知する
};

const CalendarPicker = ({
  title,
  className,
  value = null,
  onChange,
}: Props) => {
  // 初期値を value（null も許容）に設定
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);

  // 日付変更時に状態を更新し、親にも通知
  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div>
      {title && <label className="block w-[100px] min-h-[20px]">{title}</label>}
      <FormControl className="w-full">
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="yyyy/MM/dd"
          locale="ja"
          className={`react-datepicker__input text-gray-800 p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${className}`}
        />
      </FormControl>
    </div>
  );
};

export default CalendarPicker;
