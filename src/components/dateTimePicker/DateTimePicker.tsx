"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FormControl } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@/components/dateTimePicker/dateTimePicker.css';
import { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale";

type Props = {
  title: string; 
};

// ロケール設定
registerLocale('ja', ja);

const DateTimePicker = ({title}:Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<DatePicker | null>(null);
  const now = new Date();

  const adjustScroll = () => {
    const calendarElement = document.querySelector('.react-datepicker__calendar');
    const timeList = calendarElement?.querySelector(".react-datepicker__time-list");
    const activeTime = calendarElement?.querySelector(".react-datepicker__time-list-item--selected");

    if (timeList) {
      if (selectedDate && selectedDate.toDateString() === now.toDateString()) {
        // 今日の場合 → 現時刻以降にスクロール
        const nowTime = new Date();
        const selectedTime = selectedDate;
        if (selectedTime && selectedTime > nowTime) {
          activeTime?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } else {
        // 今日以外の場合 → スクロールを一番上に
        timeList.scrollTop = 0;
      }
    }
  };

  useEffect(() => {
    if (selectedDate) {
      // 日付が変更された後にスクロールを調整
      setTimeout(adjustScroll, 0);
    }
  }, [selectedDate]);

  return (
    <div>
      <label className="block">{title}</label>
        <FormControl>
          <DatePicker
            ref={datePickerRef}
            id="time"
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            showTimeSelect
            timeCaption="時間"  
            showPreviousMonths={false} 
            minDate={now}
            minTime={selectedDate && selectedDate.toDateString() === now.toDateString() ? now : new Date(0, 0, 0, 0, 0)} // 今日以外の場合は全時間帯から選べる
            maxTime={new Date(0, 0, 0, 23, 59)}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy/MM/dd HH:mm"
            locale="ja"
            className="react-datepicker__input text-gray-800 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onCalendarOpen={adjustScroll} // カレンダーが開いた時にスクロール調整
          />
        </FormControl>
    </div>
  );
};

export default DateTimePicker;
