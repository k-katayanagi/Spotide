'use client'
import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '../buttons/EditButton ';
import ViewingButton from '../buttons/ViewingButton';

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
   <div className="flex justify-center items-center mb-4">
        <EditButton className='mx-2' />
        <ViewingButton className='mx-2'/>
        <DeleteButton className='mx-2'/>
      </div>
      <div className="flex-1">
        <img src="/images/image.gif" alt="画像" className="w-full h-[160px] object-cover rounded-lg mb-4"/>
        <h2 className="text-lg font-bold">{list.list_name}</h2>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 min-w-0">
          <div className="flex sm:inline-flex flex-col sm:flex-row">
            <p className="text-gray-600 whitespace-nowrap">投票開始日時:</p>
            <p className="text-gray-600 ml-1">{list.vote_start_date}</p>
          </div>
          <div className="flex sm:inline-flex flex-col sm:flex-row">
            <p className="text-gray-600 whitespace-nowrap">ステータス:</p>
            <p className="text-gray-600 ml-1">{list.status}</p>
          </div>
          <div className="flex sm:inline-flex flex-col sm:flex-row">
            <p className="text-gray-600 whitespace-nowrap">最終更新者:</p>
            <p className="text-gray-600 ml-1">{list.lastUpdatedBy}</p>
          </div>
          <div className="flex sm:inline-flex flex-col sm:flex-row">
            <p className="text-gray-600 whitespace-nowrap">作成日時:</p>
            <p className="text-gray-600 ml-1">{list.create_date}</p>
          </div>
          <div className="flex sm:inline-flex flex-col sm:flex-row">
            <p className="text-gray-600 whitespace-nowrap">更新日時:</p>
            <p className="text-gray-600 ml-1">{list.update_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;


