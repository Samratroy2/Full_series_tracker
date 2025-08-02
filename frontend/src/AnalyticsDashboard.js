// frontend\src\AnalyticsDashboard.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const AnalyticsDashboard = ({ stats }) => {
  const { watchedByStatus, timeSpent } = stats;

  const pieData = Object.keys(watchedByStatus).map(key => ({
    name: key,
    value: watchedByStatus[key]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#999999', '#a855f7'];

  return (
    <div>
      <h2>Watch Status Overview</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h2>Time Spent Watching (in Hours)</h2>
      <BarChart width={500} height={300} data={timeSpent}>
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="hours" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default AnalyticsDashboard;
