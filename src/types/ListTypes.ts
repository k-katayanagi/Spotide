export type List = {
  id: number;
  list_name: string;
  vote_start_date: Date;
  list_type:string;
  status: number;
  creator_id:number;
  lastUpdatedBy: string;
  editing_user_id:number;
  is_url_issued:boolean;
  url:string;
  is_voting_completed:boolean;
  is_aggregation_completed:boolean;
  outing_date: Date;
  create_date: Date;
  update_date: Date;
};

export type ListItem = {
  item_id: number;
  list_id: number;
  store_name: string;
  station: string;
  google_rating: number;
  custom_rating: number;
  memo: string;
  address: string;
  prefecture: string;
  city: string;
  time_to_station: number;
  business_hours: string; 
  regular_holiday: string;
  time_from_nearest_station: number;
  category: string;
  sub_category: string;
  photo_id: number;
  add_by_id: number;
  created_at: Date;
  updated_at: Date;
};

export type Spot = {
  item_id: number;
  list_id: number;
  store_name: string;
  station: string;
  google_rating: number;
  custom_rating: number;
  memo: string;
  address: string;
  prefecture: string;
  city: string;
  time_to_station: number;
  business_hours: string; 
  regular_holiday: string;
  time_from_nearest_station: number;
  category: string;
  sub_category: string;
  photo_id: number;
  add_by_id: number;
  created_at: Date;
  updated_at: Date;
};

