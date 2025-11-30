import { useSelector } from "react-redux";
import {
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getLastNMonths } from "../../lib/helper";

const MonthlySalesChart = () => {

  const { monthlySales } = useSelector((state) => state.admin);
  const months = getLastNMonths(4).map((item) => item.month);

  const filled = months.map((mahina) => {

    const found = monthlySales?.find((item) => item.month === mahina);

    return { month: mahina, totalSales: found?.totalsales || 0 };
  });

  return (
    <ResponsiveContainer width="90%" height={300}>
      <LineChart data={filled} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="month" stroke="purple" />
        <YAxis stroke="purple" />
        <Tooltip />
        <Line type="monotone" dataKey="totalSales" stroke="purple" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlySalesChart;