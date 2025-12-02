import React, { useEffect, useState } from "react";
import { formatNumber } from "../../lib/helper";
import { useSelector } from "react-redux";


const Stats = () => {
  const [revenueChange, setRevenueChange] = useState("");
  const { totalRevenueAllTime, yesterdayRevenue, todayRevenue, totalUsersCount } = useSelector((state) => state.admin);

  const stats = [
    { title: "Today's Revenue", value: formatNumber(todayRevenue), change: revenueChange },
    { title: "Total Users", value: totalUsersCount || 0, change: null },
    { title: "All Time Revenue", value: formatNumber(totalRevenueAllTime), change: null }
  ];

  useEffect(() => {
    if (yesterdayRevenue) {
      const change = yesterdayRevenue === 0 ? 100 : ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
      const revenueText = `${change > 0 ? "+" : "-"}${change.toFixed(2)}% from to yesterday`;
      setRevenueChange(revenueText);
    }
  }, [yesterdayRevenue]);



  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((item, index) => (
        <div key={index} className="bg-white p-2 rounded shadow border-l-4 border-purple-600">
          <div className="flex gap-4 items-center">
            <span className="text-base font-semibold text-purple-700">{item.title} :</span>
            <span className="text-2xl font-bold text-purple-900">{item.value}</span>
          </div>
          {item.change && <p className="text-sm font-semibold mt-1 text-lime-700">{item.change}</p>}
        </div>
      ))}
    </div>
  );
};

export default Stats;