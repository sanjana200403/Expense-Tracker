import React from 'react';

const CustomeLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {
        payload?.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: entry.color
              }}
            ></div>
            <span className="text-sm text-gray-700 font-medium">
              {entry.payload.name}
            </span>
          </div>
        ))
      }
    </div>
  );
};

export default CustomeLegend;
