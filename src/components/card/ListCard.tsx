type List = {
  id: number;
  list_name: string;
  vote_start_date: number;
  status: string;
  lastUpdatedBy: string;
  create_date: number;
  update_date: number;
};

const ListCard = ({ list }: { list: List }) => {
  return (
    <div className="bg-white border border-gray-300 shadow-md rounded-lg p-4 w-[48%] md:w-[30%] lg:w-[22%] h-[300px] flex flex-col justify-between">
      <img src="/images/image.gif" alt="画像" className="w-full h-[160px] object-cover rounded-lg mb-4"/>
      <h2 className="text-lg font-bold">{list.list_name}</h2>
      <p className="text-gray-600 mt-2">投票開始日時: {list.vote_start_date}</p>
      <p className="text-gray-600 mt-2">ステータス: {list.status}</p>
      <p className="text-gray-600 mt-2">最終更新者: {list.lastUpdatedBy}</p>
      <p className="text-gray-600 mt-2">作成日時: {list.create_date}</p>
      <p className="text-gray-600 mt-2">更新日時: {list.update_date}</p>
    </div>
  );
};
export default ListCard;



