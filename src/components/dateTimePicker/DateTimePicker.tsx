'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { FormControl } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/components/dateTimePicker/dateTimePicker.css';
import { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale';
import Image from 'next/image';

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
    ) as HTMLElement | null;
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
    if (calendarElement) {
      // ここではカレンダーのスクロールの高さを固定する
      calendarElement.style.overflowY = 'auto'; // スクロール有効
      calendarElement.style.maxHeight = '100px'; // 固定高さ（調整可能）
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
        <div style={{ position: 'relative', width: '100%' }}>
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
            className="react-datepicker__input w-full h-[40px] text-black p-4 border border-[#e68b6e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] placeholder:text-[#e68b6e]"
            placeholderText="日時を選択してください"
            onCalendarOpen={adjustScroll}
            dayClassName={(date) => {
              if (date.getTime() < new Date().setHours(0, 0, 0, 0)) {
                return 'past-day';
              }

              if (date.getDay() === 0) {
                return 'sunday-day';
              }

              if (date.getDay() === 6) {
                return 'saturday-day';
              }

              return '';
            }}
          />
          <Image
            src="/images/calendar.svg" // 画像のパスを指定
            alt="calendar icon"
            width={20} // アイコンのサイズ
            height={20} // アイコンのサイズ
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        </div>
      </FormControl>
    </div>
  );
};

export default DateTimePicker;
