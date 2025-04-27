'use client';

import React, { useEffect, useState } from 'react';
import { FormControl } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/components/dateTimePicker/dateTimePicker.css';
import { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale';
import Image from 'next/image';

// ロケール設定
registerLocale('ja', ja);

type Props = {
  title?: string;
  className?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const OutingCalendarPicker = ({ title, value, onChange }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const now = new Date();

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div>
      {title && <label className="block w-[100px] min-h-[20px]">{title}</label>}
      <FormControl className="w-full">
        <div style={{ position: 'relative', width: '100%' }}>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={handleChange}
            dateFormat="yyyy/MM/dd"
            locale="ja"
            className="react-datepicker__input w-full h-[40px] text-black p-4 border border-[#e68b6e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] placeholder:text-[#e68b6e]"
            minDate={now} // 今日以降の日付を選択できないようにする
            placeholderText="日付を選択してください"
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
            src="/images/calendar.svg"
            alt="calendar icon"
            width={20}
            height={20}
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

export default OutingCalendarPicker;
