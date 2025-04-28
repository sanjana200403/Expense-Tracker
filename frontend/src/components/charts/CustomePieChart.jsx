import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomeToolTip from './CustomeToolTip';
import CustomeLegend from './CustomeLegend';

const CustomePieChart = ({
  data,
  totalAmount,
  colors,
  showTextAnchor
}) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={70}
            labelLine={false}
            paddingAngle={3} // <-- Add small padding for visible separation
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>

          <Tooltip content={<CustomeToolTip />} />
          <Legend content={<CustomeLegend />} />

          {showTextAnchor && (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#333"
              fontSize="20px"
              fontWeight="bold"
            >
              {totalAmount}
            </text>
          )}
          
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomePieChart;
