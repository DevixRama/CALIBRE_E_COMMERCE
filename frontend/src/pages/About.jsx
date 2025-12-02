import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize our customers in every decision we make.'
    },
    {
      icon: Award,
      title: 'Top Quality',
      description: 'Every product meets our strict quality standards.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We foster strong connections with our users and partners.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Continuously evolving our platform for a better experience.'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center mb-20">
          <h1 className="text-5xl font-bold text-purple-600 mb-4">About Calibre</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calibre is your go-to online marketplace for premium products, innovative features, and a seamless shopping experience.
          </p>
        </header>

        {/* Values Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-purple-100">
                <value.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </section>

        {/* Story Section */}
        <section className="bg-purple-50 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">Our Journey</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Founded with a mission to make shopping effortless and enjoyable, Calibre has grown into a trusted platform serving thousands of happy customers worldwide. Our commitment to quality, innovation, and community drives everything we do. Join us as we continue to redefine the online shopping experience.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
