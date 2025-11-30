import Header from "./Header";
import MiniSummary from "./dashboard-components/MiniSummary";
import TopSellingProducts from "./dashboard-components/TopSellingProducts";
import Stats from "./dashboard-components/Stats";
import MonthlySalesChart from "./dashboard-components/MonthlySalesChart";
import OrdersChart from "./dashboard-components/OrdersChart";
import TopProductsChart from "./dashboard-components/TopProductsChart";


export default function Dashboard() {
  return (
    <div className="w-full max-h-screen bg-purple-50 px-12 py-3 flex flex-col">
      <Header />


      <div className="mt-6 bg-white p-4 rounded-2xl shadow">
        <Stats />
      </div>

      <div className="flex-1 my-4 overflow-auto">
        <div className="grid gap-6 mt-4 md:grid-cols-4">
          <div className="md:col-span-4">
            <MiniSummary />
          </div>
        </div>

        <div className="grid gap-6 mt-4 md:grid-cols-3">

          <div className="bg-white p-4 rounded-2xl shadow">
            <OrdersChart />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <MonthlySalesChart />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <TopProductsChart />
          </div>
        </div>


        <div className="grid gap-6 mt-4 md:grid-cols-3">

          <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow">
            <TopSellingProducts />
          </div>
        </div>

      </div>
    </div>

  );
}
