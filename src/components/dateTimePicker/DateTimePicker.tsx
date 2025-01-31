"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FormControl } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@/components/dateTimePicker/dateTimePicker.css';
import { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale";

registerLocale('ja', ja);

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<any>(null);
  const now = new Date();

  useEffect(() => {
    const adjustScroll = () => {
      // DatePicker内部のポータルのDOMにアクセスする
      const portal = datePickerRef.current?.portal;

      if (portal) {
        const timeList = portal.querySelector(".react-datepicker__time-list");
        const activeTime = portal.querySelector(".react-datepicker__time-list-item--selected");

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
      }
    };

    // レンダリング後にスクロール調整を実行
    setTimeout(adjustScroll, 0);
  }, [selectedDate]);

  return (
    <FormControl>
      <DatePicker
        ref={datePickerRef}
        id="time"
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        showTimeSelect
        minDate={now}
        minTime={selectedDate && selectedDate.toDateString() === now.toDateString() ? now : new Date(0, 0, 0, 0, 0)} // 今日以外の場合は全時間帯から選べる
        maxTime={new Date(0, 0, 0, 23, 59)}
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy/MM/dd HH:mm"
        locale="ja"
        className="react-datepicker__input text-gray-800 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FormControl>
  );
};

export default DateTimePicker;
