'use client';

import React, { useEffect, useState } from 'react';
import { FormControl } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/components/dateTimePicker/dateTimePicker.css';
import { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale';

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
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="yyyy/MM/dd"
          locale="ja"
          className="react-datepicker__input text-gray-800 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          minDate={now} // 今日以降の日付を選択できないようにする
        />
      </FormControl>
    </div>
  );
};

export default OutingCalendarPicker;
