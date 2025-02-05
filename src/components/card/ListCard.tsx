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
<div className="bg-white border border-gray-300 shadow-md rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between">
  <div className="flex-1">
    <img src="/images/image.gif" alt="画像" className="w-full h-[160px] object-cover rounded-lg mb-4"/>
    <h2 className="text-lg font-bold">{list.list_name}</h2>
    <p className="text-gray-600 mt-2 break-words">投票開始日時: {list.vote_start_date}</p>
    <p className="text-gray-600 mt-2 break-words">ステータス: {list.status}</p>
    <p className="text-gray-600 mt-2 break-words">最終更新者: {list.lastUpdatedBy}</p>
    <p className="text-gray-600 mt-2 break-words">作成日時: {list.create_date}</p>
    <p className="text-gray-600 mt-2 break-words">更新日時: {list.update_date}</p>
  </div>
</div>
  );
};
export default ListCard;



