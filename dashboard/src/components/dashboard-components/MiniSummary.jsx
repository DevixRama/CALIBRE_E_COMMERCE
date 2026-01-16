import React from "react";
import {
  Wallet,
  PackageCheck,
  TrendingUp,
  AlertTriangle,
  BarChart4,
  UserPlus,
} from "lucide-react";
import { useSelector } from "react-redux";

const MiniSummary = () => {
  const {
    topSellingProducts,
    lowStockProducts,
    revenueGrowth,
    newUsersThisMonth,
    currentMonthSales,
    orderStatusCounts,
  } = useSelector((state) => state.admin);

  let totalOrders = 0;
  totalOrders = Object.values(orderStatusCounts || {}).reduce((acc, count) => acc + count, 0);

  const summary = [
    {
      text: "Total Sales This Month",
      subText: `This month sales: ${currentMonthSales * 1} RS`,
      icon: <Wallet className="text-green-600" />,
    },
    {
      text: "Total Orders",
      subText: `Total orders placed: ${totalOrders}`,
      icon: <PackageCheck className="text-blue-600" />,
    },
    {
      text: "Top Selling Product",
      subText: `Best Seller: ${topSellingProducts[0]?.name} (${topSellingProducts[0]?.total_sold}) sold `,
      icon: <TrendingUp className="text-sky-600" />,
    },
    {
      text: "Low Stock Alerts",
      subText: `${lowStockProducts} products running low on stock`,
      icon: <AlertTriangle className="text-red-600" />,
    },
    {
      text: "Revenue Growth Rate",
      subText: `Revenue ${revenueGrowth?.includes("+") ? "up" : "down"} by ${revenueGrowth} compare to last month`,
      icon: <BarChart4 className="text-yellow-600" />,
    },
    {
      text: "New Customers This Month",
      subText: `New Customers joined: ${newUsersThisMonth}`,
      icon: <UserPlus className="text-gray-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {summary.map((item, index) => (
        <div key={index} className="flex items-center p-4 bg-white rounded-2xl shadow">
          <div className="p-3 bg-purple-100 rounded-full mr-3">
            {item.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{item.text}</p>
            <p className="font-semibold text-purple-900 text-sm mt-1">{item.subText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniSummary;