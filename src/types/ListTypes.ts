export type List = {
  list_id: number;
  list_name: string;
  voting_start_at: Date; // ここをstringからDateに変更
  list_type?: string;
  status: number;
  creator_id?: number;
  lastUpdatedBy: string;
  editing_user_id?: number;
  is_url_issued?: boolean;
  url?: string;
  is_voting_completed?: boolean;
  is_aggregation_completed?: boolean;
  outing_at: Date;
  created_at: Date;
  updated_at: Date;
  is_admin?: boolean;
};

export type Photo = {
  photo_url: string;
};

export type ListItem = {
  item_id: number;
  list_id: number;
  store_name: string;
  station: string;
  google_rating: number;
  custom_rating?: number;
  memo?: string;
  address: string;
  prefecture: string;
  city: string;
  business_hours: string;
  regular_holiday: string;
  time_from_nearest_station: number;
  category: string;
  sub_category: string;
  photo_id: string;
  list_participants?: {
    participant_name: string;
  };
  photos?: Photo[];
  created_at: Date;
  updated_at: Date;
  vote_cnt?:number;
};

export type Spot = {
  id: number;
  store_name: string;
  station: string;
  google_rating: number;
  address: string;
  prefecture: string;
  city: string;
  time_to_station: number;
  business_hours: string;
  regular_holiday: string;
  time_from_nearest_station: number;
  category: string;
  sub_category: string;
  photo_ids: string[];
};
