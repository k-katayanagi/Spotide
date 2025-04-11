'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { FormControl } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/components/dateTimePicker/dateTimePicker.css';
import { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale';

type Props = {
  title: string;
  value: Date | null;
  onDateChange: (date: Date | null) => void;
};

// ロケール設定
registerLocale('ja', ja);

const DateTimePicker = ({ title, value, onDateChange }: Props) => {
  const datePickerRef = useRef<DatePicker | null>(null);
  const now = new Date();

  // adjustScroll を useCallback でメモ化
  const adjustScroll = useCallback(() => {
    const calendarElement = document.querySelector(
      '.react-datepicker__calendar',
    );
    const timeList = calendarElement?.querySelector(
      '.react-datepicker__time-list',
    );
    const activeTime = calendarElement?.querySelector(
      '.react-datepicker__time-list-item--selected',
    );

    if (timeList) {
      if (value && value.toDateString() === now.toDateString()) {
        const nowTime = new Date();
        if (value > nowTime) {
          activeTime?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        timeList.scrollTop = 0;
      }
    }
  }, [value, now]);

  useEffect(() => {
    if (value) {
      setTimeout(adjustScroll, 0);
    }
  }, [value, adjustScroll]);

  return (
    <div>
      <label className="block">{title}</label>
      <FormControl>
        <DatePicker
          ref={datePickerRef}
          id="time"
          selected={value}
          onChange={onDateChange}
          showTimeSelect
          timeCaption="時間"
          minDate={now}
          minTime={
            value && value.toDateString() === now.toDateString()
              ? now
              : new Date(0, 0, 0, 0, 0)
          }
          maxTime={new Date(0, 0, 0, 23, 59)}
          timeFormat="HH:mm"
          timeIntervals={1}
          dateFormat="yyyy/MM/dd HH:mm"
          locale="ja"
          className="react-datepicker__input text-gray-800 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onCalendarOpen={adjustScroll}
        />
      </FormControl>
    </div>
  );
};

export default DateTimePicker;
