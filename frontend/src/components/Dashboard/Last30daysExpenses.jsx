import React, { useEffect, useState } from 'react'
import { prepareExpenseBarCharData } from '../../utils/helper';
import CustomBarChart from '../charts/CustomeBarChar';

const Last30daysExpenses = ({data}) => {
const [charData , setChartData] = useState([]);
useEffect(()=>{
const result = prepareExpenseBarCharData(data);
setChartData(result)
return ()=>{}
},[])
  return (
    <div className='card col-span-1'>
      <div className="flex items-center justify-between">
         <h5 className='text-lg'> Last 30 days expense </h5>
      </div>
      <CustomBarChart data={charData}/>
    </div>
  )
}

export default Last30daysExpenses
