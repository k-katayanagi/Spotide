import { useMemo } from 'react';

const useFormatDate = (
  date: string | Date | undefined,
  isVotingStartDate: boolean = false,
): string => {
  return useMemo(() => {
    if (!date) {
      console.log('Received date is undefined or null');
      return '不明'; // dateがundefinedまたはnullの場合は「不明」を返す
    }

    // もしdateがstringならDateに変換
    let dateObj: Date;
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else {
      dateObj = date; // すでにDate型の場合そのまま使用
    }

    // 日付が無効な場合は「不明」を返す
    if (isNaN(dateObj.getTime())) {
      console.log('Invalid date detected');
      return '不明';
    }

    // vote_start_date用の特別なフォーマット
    if (isVotingStartDate) {
      // UTCで日付を取得し、日本時間に変換
      const formattedDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000)
        .toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo', // タイムゾーンを指定
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

      const [datePart, timePart] = formattedDate.split(' ');

      return `${datePart} ${timePart}`;
    }

    // 他の日時（outing_date, create_date, update_date）は日付のみ
    const formattedDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000)
      .toLocaleDateString('ja-JP', {
        timeZone: 'Asia/Tokyo', // タイムゾーンを指定
      });

    return formattedDate;
  }, [date, isVotingStartDate]);
};

export default useFormatDate;
