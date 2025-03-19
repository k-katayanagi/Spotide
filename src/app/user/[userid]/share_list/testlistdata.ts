export const testList = [
    {
      id: 1,
      list_name: "リスト1",
      vote_start_date: new Date(2025, 1, 6, 14, 30), // 2025/02/06 14:30
      status: 0,
      lastUpdatedBy: "kanon",
      outing_date: new Date(2025, 2, 1),
      create_date: new Date(2025, 1, 4),
      update_date: new Date(2025, 1, 5),
    },
    {
      id: 2,
      list_name: "テスト",
      vote_start_date: new Date(2025, 1, 10, 9, 15), // 2025/02/10 09:15
      status: 1,
      lastUpdatedBy: "kanon",
      outing_date: new Date(2025, 2, 10),
      create_date: new Date(2025, 1, 5),
      update_date: new Date(2025, 1, 6),
    },
    {
      id: 3,
      list_name: "リスト2",
      vote_start_date: new Date(2025, 2, 21, 16, 0), // 2025/03/21 16:00
      status: 1,
      lastUpdatedBy: "kanon",
      outing_date: new Date(2025, 2, 25),
      create_date: new Date(2025, 1, 20),
      update_date: new Date(2025, 1, 28),
    },
    {
      id: 4,
      list_name: "フィルター",
      vote_start_date: new Date(2025, 3, 12, 20, 45), // 2025/04/12 20:45
      status: 2,
      lastUpdatedBy: "kanon",
      outing_date: new Date(2025, 3, 15),
      create_date: new Date(2025, 1, 15),
      update_date: new Date(2025, 2, 2),
    },
    {
      id: 5,
      list_name: "フィルターテスト",
      vote_start_date: new Date(2025, 2, 2, 5, 10), // 2025/03/02 05:10
      status: 2,
      lastUpdatedBy: "kanon",
      outing_date: new Date(2025, 2, 24),
      create_date: new Date(2025, 1, 7),
      update_date: new Date(2025, 2, 2),
    },
  ];
  
  // あと20件追加
  for (let i = 6; i <= 30; i++) {
    testList.push({
      id: i,
      list_name: `リスト${i}`,
      vote_start_date: new Date(2025, i % 12, i % 28, 10, 30), // 適当にバラけるように設定
      status: i % 3, // 0, 1, 2 の繰り返し
      lastUpdatedBy: "kanon",
      outing_date: new Date(2025, (i + 1) % 12, (i + 5) % 28),
      create_date: new Date(2025, (i - 2) % 12, (i - 4) % 28),
      update_date: new Date(2025, (i - 1) % 12, (i - 3) % 28),
    });
  }
  
  
  
  export const testListItem = [
    {
      item_id: 1,
      list_id: 1,
      store_name: "レストランA",
      station: "新宿",
      google_rating: 4.5,
      custom_rating: 4.0,
      memo: "人気のイタリアン",
      address: "東京都新宿区1-1-1",
      prefecture: "東京都",
      city: "新宿区",
      time_to_station: 5,
      business_hours: "11:00 - 22:00",
      regular_holiday: "水曜日",
      time_from_nearest_station: 3,
      category: "レストラン",
      sub_category: "イタリアン",
      photo_id: 101,
      add_by_id: 1,
      created_at: new Date(2025, 0, 10),
      updated_at: new Date(2025, 0, 15)
    },
    {
      item_id: 2,
      list_id: 1,
      store_name: "カフェB",
      station: "渋谷",
      google_rating: 4.2,
      custom_rating: 3.8,
      memo: "落ち着いた雰囲気",
      address: "東京都渋谷区2-2-2",
      prefecture: "東京都",
      city: "渋谷区",
      time_to_station: 8,
      business_hours: "08:00 - 20:00",
      regular_holiday: "なし",
      time_from_nearest_station: 5,
      category: "カフェ",
      sub_category: "コーヒー専門店",
      photo_id: 102,
      add_by_id: 2,
      created_at: new Date(2025, 0, 12),
      updated_at: new Date(2025, 0, 18)
    }
  ];
  
  for (let i = 3; i <= 30; i++) {
    testListItem.push({
      item_id: i,
      list_id: (i % 5) + 1,
      store_name: `店舗${i}`,
      station: `駅${i}`,
      google_rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      custom_rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      memo: `テストデータ${i}`,
      address: `東京都テスト区${i}-${i}-${i}`,
      prefecture: "東京都",
      city: "テスト区",
      time_to_station: Math.floor(Math.random() * 15) + 1,
      business_hours: `${8 + (i % 5)}:00 - ${18 + (i % 6)}:00`,
      regular_holiday: ["なし", "日曜日", "月曜日", "火曜日", "水曜日"][i % 5],
      time_from_nearest_station: Math.floor(Math.random() * 10) + 1,
      category: ["レストラン", "カフェ", "バー"][i % 3],
      sub_category: ["和食", "洋食", "中華"][i % 3],
      photo_id: 100 + i,
      add_by_id: i % 5,
      created_at: new Date(2025, (i - 2) % 12, (i - 4) % 28),
      updated_at: new Date(2025, (i - 1) % 12, (i - 3) % 28)
    });
  }
  
  
  
  export const testParticipants = [
    // --- リスト101 ---
    { participant_id: 1, list_id: 101, user_id: 1001, participant_name: "田中 太郎", password: "hashed_password_1", is_guest: false, created_at: new Date(2024, 2, 7, 12, 0), updated_at: new Date(2024, 2, 7, 12, 0) },
    { participant_id: 2, list_id: 101, user_id: 2001, participant_name: "ゲストA", password: "guest_password_1", is_guest: true, created_at: new Date(2024, 2, 7, 12, 5), updated_at: new Date(2024, 2, 7, 12, 5) },
    { participant_id: 3, list_id: 101, user_id: 1002, participant_name: "佐藤 花子", password: "hashed_password_2", is_guest: false, created_at: new Date(2024, 2, 7, 12, 10), updated_at: new Date(2024, 2, 7, 12, 10) },
  
    // --- リスト102 ---
    { participant_id: 4, list_id: 102, user_id: 2002, participant_name: "ゲストB", password: "guest_password_2", is_guest: true, created_at: new Date(2024, 2, 7, 12, 15), updated_at: new Date(2024, 2, 7, 12, 15) },
    { participant_id: 5, list_id: 102, user_id: 1003, participant_name: "山田 一郎", password: "hashed_password_3", is_guest: false, created_at: new Date(2024, 2, 7, 12, 20), updated_at: new Date(2024, 2, 7, 12, 20) },
    { participant_id: 6, list_id: 102, user_id: 1004, participant_name: "鈴木 次郎", password: "hashed_password_4", is_guest: false, created_at: new Date(2024, 2, 7, 12, 25), updated_at: new Date(2024, 2, 7, 12, 25) },
  
    // --- リスト103 ---
    { participant_id: 7, list_id: 103, user_id: 1005, participant_name: "高橋 美咲", password: "hashed_password_5", is_guest: false, created_at: new Date(2024, 2, 7, 12, 30), updated_at: new Date(2024, 2, 7, 12, 30) },
    { participant_id: 8, list_id: 103, user_id: 2003, participant_name: "ゲストC", password: "guest_password_3", is_guest: true, created_at: new Date(2024, 2, 7, 12, 35), updated_at: new Date(2024, 2, 7, 12, 35) },
    { participant_id: 9, list_id: 103, user_id: 1006, participant_name: "松本 健", password: "hashed_password_6", is_guest: false, created_at: new Date(2024, 2, 7, 12, 40), updated_at: new Date(2024, 2, 7, 12, 40) },
  
    // --- リスト104 ---
    { participant_id: 10, list_id: 104, user_id: 2004, participant_name: "ゲストD", password: "guest_password_4", is_guest: true, created_at: new Date(2024, 2, 7, 12, 45), updated_at: new Date(2024, 2, 7, 12, 45) },
    { participant_id: 11, list_id: 104, user_id: 1007, participant_name: "中村 亮", password: "hashed_password_7", is_guest: false, created_at: new Date(2024, 2, 7, 12, 50), updated_at: new Date(2024, 2, 7, 12, 50) },
    { participant_id: 12, list_id: 104, user_id: 1008, participant_name: "小林 優", password: "hashed_password_8", is_guest: false, created_at: new Date(2024, 2, 7, 12, 55), updated_at: new Date(2024, 2, 7, 12, 55) },
  
    // --- リスト105 ---
    { participant_id: 13, list_id: 105, user_id: 1009, participant_name: "村上 真由", password: "hashed_password_9", is_guest: false, created_at: new Date(2024, 2, 7, 13, 0), updated_at: new Date(2024, 2, 7, 13, 0) },
    { participant_id: 14, list_id: 105, user_id: 2005, participant_name: "ゲストE", password: "guest_password_5", is_guest: true, created_at: new Date(2024, 2, 7, 13, 5), updated_at: new Date(2024, 2, 7, 13, 5) },
    { participant_id: 15, list_id: 105, user_id: 1010, participant_name: "岡本 健太", password: "hashed_password_10", is_guest: false, created_at: new Date(2024, 2, 7, 13, 10), updated_at: new Date(2024, 2, 7, 13, 10) },
  
    // --- リスト106～110 も追加 ---
    { participant_id: 16, list_id: 106, user_id: 1011, participant_name: "藤田 直樹", password: "hashed_password_11", is_guest: false, created_at: new Date(2024, 2, 7, 13, 15), updated_at: new Date(2024, 2, 7, 13, 15) },
    { participant_id: 17, list_id: 107, user_id: 1012, participant_name: "石井 美穂", password: "hashed_password_12", is_guest: false, created_at: new Date(2024, 2, 7, 13, 20), updated_at: new Date(2024, 2, 7, 13, 20) },
    { participant_id: 18, list_id: 108, user_id: 1013, participant_name: "渡辺 翔太", password: "hashed_password_13", is_guest: false, created_at: new Date(2024, 2, 7, 13, 25), updated_at: new Date(2024, 2, 7, 13, 25) },
    { participant_id: 19, list_id: 109, user_id: 2006, participant_name: "ゲストF", password: "guest_password_6", is_guest: true, created_at: new Date(2024, 2, 7, 13, 30), updated_at: new Date(2024, 2, 7, 13, 30) },
    { participant_id: 20, list_id: 110, user_id: 1014, participant_name: "三浦 結衣", password: "hashed_password_14", is_guest: false, created_at: new Date(2024, 2, 7, 13, 35), updated_at: new Date(2024, 2, 7, 13, 35) },
  ];