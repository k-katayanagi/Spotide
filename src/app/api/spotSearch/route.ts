import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { typeToJapanese } from '@/types/SpotTypes';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_PLACES_API_URL =
  'https://places.googleapis.com/v1/places:searchText';

// 営業時間の重複を排除し、少数派だけ曜日を表示する関数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getIrregularBusinessHours = (periods: any[]) => {
  if (!periods || periods.length === 0) return '営業時間不明';

  // 営業時間を `{ 開店時間: [曜日のリスト] }` という形でまとめる
  const hoursMap = new Map<string, string[]>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  periods.forEach(({ open, close }: any) => {
    const openTime = `${open.hour}:${open.minute.toString().padStart(2, '0')}`;
    const closeTime = `${close.hour}:${close.minute
      .toString()
      .padStart(2, '0')}`;
    const timeRange = `${openTime}～${closeTime}`;
    const day = ['日', '月', '火', '水', '木', '金', '土'][open.day];

    if (!hoursMap.has(timeRange)) {
      hoursMap.set(timeRange, []);
    }
    hoursMap.get(timeRange)?.push(day);
  });

  // 異なる時間帯があれば曜日を個別に表示
  const timeRanges = Array.from(hoursMap.entries());

  const result = timeRanges.map(([time, days]) => {
    if (days.length === 7) {
      return time; // 全曜日に同じ時間帯なら曜日を省略
    } else {
      const uniqueDays = [...new Set(days)]; // 重複を排除
      return `${uniqueDays.join('・')}: ${time}`; // 曜日と時間帯を表示
    }
  });

  return result.join(', ');
};

// Google Places API のレスポンスを Spot 型に変換する関数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformToSpot = (place: any, index: number) => {
  // 定休日の曜日を取得（"定休日" を含む曜日を抽出）
  const closedDays =
    place.regularOpeningHours?.weekdayDescriptions
      ?.filter((day: string) => day.includes('定休日'))
      ?.map((day: string) => day.split(':')[0])
      .join(', ') || '不明';

  const photoUrls =
    place.photos?.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (photo: any) =>
        `https://places.googleapis.com/v1/${photo.name}/media?key=${GOOGLE_MAPS_API_KEY}&maxWidthPx=300&maxHeightPx=200`,
    ) || [];

  return {
    id: index, // 配列のインデックスを item_id に設定
    store_name: place.displayName?.text || '名称不明',
    station: '不明',
    google_rating: place.rating || 0,
    address: place.formattedAddress || '住所不明',
    prefecture: place.addressComponents?.[6]?.longText || '不明',
    city: place.addressComponents?.[5]?.longText || '不明',
    time_to_station: 0,
    business_hours: getIrregularBusinessHours(
      place.regularOpeningHours?.periods,
    ),
    regular_holiday: closedDays,
    time_from_nearest_station: 0,
    category: typeToJapanese(place.types?.[0] || ''),
    sub_category: typeToJapanese(place.types?.[1] || ''),
    photo_ids: photoUrls,
  };
};

export async function GET(req: NextRequest) {
  if (!GOOGLE_MAPS_API_KEY) {
    return NextResponse.json({ error: 'API Key is missing' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 },
      );
    }

    // Google Places API (POSTメソッド) へのリクエスト
    const placesResponse = await axios.post(
      GOOGLE_PLACES_API_URL,
      {
        textQuery: query, // 検索クエリ
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY, // APIキー
          'X-Goog-FieldMask':
            'places.displayName,places.formattedAddress,places.rating,places.addressComponents,places.types,places.regularOpeningHours,places.photos,places.id', // 必要なフィールドを指定
        },
        params: {
          regionCode: 'JP', // 日本国内に限定
          languageCode: 'ja', // 日本語で結果を返す
          pageSize: 13,
        },
      },
    );

    const placesData = placesResponse.data.places || [];

    // 取得した photos の中身をログに出力
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    placesData.forEach((place: any, index: number) => {
      console.log(`Place ${index + 1}:`);
      if (place.photos) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        place.photos.forEach((photo: any, photoIndex: number) => {
          console.log(`  Photo ${photoIndex + 1}:`, photo);
        });
      }
    });

    if (placesData.length === 0) {
      return NextResponse.json({ error: 'No results found' }, { status: 404 });
    }

    // 変換してからクライアントに返す]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedData = placesData.map((place: any, index: number) =>
      transformToSpot(place, index),
    );
    console.log(transformedData);
    return NextResponse.json({ results: transformedData });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    return NextResponse.json(
      { error: error.response?.data?.error || 'Internal Server Error' },
      { status: error.response?.status || 500 },
    );
  }
}
