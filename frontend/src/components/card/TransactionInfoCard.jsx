import React from 'react';
import { LuAArrowDown, LuTrendingDown, LuTrendingUp, LuUtensils, LuTrash2 } from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete
}) => {
    const getAmountStyles = ()=>{
         type == "Income" ? "bg-green-50 text-green-500" :"bg-red-50 text-red-500"
    }
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg shadow-md">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
        //   <img src={icon} alt={title} className="w-6 h-6 object-cover" />
        <LuUtensils />
        ) : (
          <LuUtensils />
        )}
      </div>
      <div className='flex-1 flex items-center justify-between'>
        <div>
          <p className="text-md text-bold font-bold">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          {/* Check for hideDeleteBtn */}
          {!hideDeleteBtn && (
            <button className="text-red-400 hover:text-red-500" onClick={onDelete}>
              <LuTrash2 size={18} />
            </button>
          )}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${type === 'Income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
            <h6 className={type === 'Income' ? 'text-green-600' : 'text-red-600'}>
              {type === 'Income' ? '+' : '-'} ${amount}
            </h6>
            {type === 'Income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
