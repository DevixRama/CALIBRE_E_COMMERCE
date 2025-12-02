
// import { useSelector } from "react-redux";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// const TopProductsChart = () => {
//   const { topSellingProducts } = useSelector((state) => state.admin);
//   console.log(topSellingProducts);
  

//   const colors = ["#6b21a8", "#9333ea", "#a855f7", "#c084fc", "#ddd6fe"];

//   return (
//     <div className="bg-white p-4 rounded-2xl shadow-md">
//       aa
//       <h3 className="font-semibold mb-2 text-purple-700">Top Selling Products</h3>
//       <ResponsiveContainer width="100%" height={250}>
//         <BarChart data={topSellingProducts} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//           <XAxis dataKey="name" stroke="purple" />
//           <YAxis stroke="purple" />
//           <Tooltip />
//           <Bar dataKey="sales">
//             {topSellingProducts.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TopProductsChart;






import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border flex flex-col items-center">
        {item.image && ( <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded mb-2"/> )}
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-600">Sales: {item.total_sold}</p>
      </div>
    );
  }
  return null;
};

const TopProductsChart = () => {
  const { topSellingProducts } = useSelector((state) => state.admin);

  const colors = ["#6b21a8", "#9333ea", "#a855f7", "#c084fc", "#ddd6fe"];

  // Map data to correct format for recharts
  const chartData = topSellingProducts.map((item) => ({
    name: item.name,
    total_sold: Number(item.total_sold),
    image: item.image,
  }));

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h3 className="font-semibold mb-2 text-purple-700">Top Selling Products</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" stroke="purple" />
          <YAxis stroke="purple" />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="total_sold">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProductsChart;
