import { Truck, Shield, Headphones, CreditCard } from "lucide-react";

const FeatureSection = () => {
  const features = [
    { icon: Truck, title: "Fast Delivery", description: "Get your orders delivered quickly and on time anywhere." },
    { icon: Shield, title: "Trusted Security", description: "Your payments and data are protected with top-tier encryption." },
    { icon: Headphones, title: "Customer Care", description: "Our friendly support team is here to help you 24/7." },
    { icon: CreditCard, title: "Hassle-Free Returns", description: "Enjoy easy 30-day returns with no extra charges." },
  ];

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 text-center border rounded shadow hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center"><feature.icon className="w-8 h-8 text-white" /></div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
