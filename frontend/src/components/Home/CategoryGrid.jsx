import { Link } from "react-router-dom";
import { categories } from "../../data/products";

const CategoryGrid = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12"><h2 className="text-4xl font-bold mb-4">Shop by Category</h2><p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our wide range of products across different categories</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} to={`/products?category=${category.name}`} onClick={()=> scrollTo(0,0)} className="group p-6 text-center hover:shadow-md transition">
            <div className="relative overflow-hidden rounded-lg mb-4"><img src={category.image} alt={category.name} className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300" /><div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /></div>
            <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
