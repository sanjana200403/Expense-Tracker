import React from 'react'

const CustomeToolTip = ({active, payload}) => {
    if(active && payload && payload.length){
        return (
            <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
              <p className="text-xs font-semibold text-purple-800">{payload[0].name}</p>
              <div className="text-sm text-gray-600">Amount 
                <span className=''>${payload[0].value}</span>
              </div>
            </div>
          )
    }
return null
}

export default CustomeToolTip
