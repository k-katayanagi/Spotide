

type List = {
    id: number;
    list_name: string;
    vote_start_date: number;
  };
  
  const ListCard = ({ list }: { list: List }) => {
    return (
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 w-[300px] h-[150px] flex flex-col justify-between">
        <h2 className="text-lg font-bold">{list.list_name}</h2>
        <p className="text-gray-600 mt-2">投票開始日: {list.vote_start_date}</p>
      </div>
    );
  };
  
  export default ListCard;
  