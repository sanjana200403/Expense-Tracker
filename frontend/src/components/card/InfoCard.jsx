import React from 'react'

const InfoCard = ({icon,label,color , value}) => {
  return (
    <div className='flex gap-6 bg-white p-6 rounded-2xl shadow-md text-[26px]'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full`}>
        {icon}
      </div>
      <div>
        <h6 className=''>{label}</h6>
        <span className=''>${value}</span>
      </div>
    </div>
  )
}

export default InfoCard
