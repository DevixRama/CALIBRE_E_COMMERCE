import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const faqs = [
    {
      question: 'How can I start shopping on Calibre?',
      answer: 'Create an account or log in, browse our collections, add items to your cart, and checkout securely with ease.'
    },
    {
      question: 'Which payment options are available?',
      answer: 'We support credit/debit cards, PayPal, and other trusted payment methods to ensure a smooth checkout experience.'
    },
    {
      question: 'When will my order arrive?',
      answer: 'Standard delivery usually takes 3-5 business days, while express shipping is available for faster delivery.'
    },
    {
      question: 'Can I return a product?',
      answer: 'Yes! You can return items within 30 days if they are in original condition with tags attached. Some exclusions may apply.'
    }
  ];

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-600 mb-3">Calibre Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answers to your most common questions to help you shop with confidence.
          </p>
        </header>

        {/* FAQ Section */}
        <section className="space-y-5">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white group rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between transition-colors"
              >
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                {openItems[index] ? (
                  <ChevronUp className="w-5 h-5 text-purple-600 group-hover:scale-125" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-600 group-hover:scale-125" />
                )}
              </button>
              {openItems[index] && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Extra Info Section */}
        <section className="mt-16 bg-purple-50 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">Need More Help?</h2>
          <p className="text-gray-700">
            If you can’t find the answer you’re looking for, reach out to our support team. We’re here to make your Calibre experience seamless and enjoyable.
          </p>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
