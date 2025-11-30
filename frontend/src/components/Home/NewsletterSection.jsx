import { useState } from "react"; import { Mail, Send } from "lucide-react";

const NewsletterSection = () => { const [email, setEmail] = useState("");

return (
<section className="py-16">
  <div className="bg-white text-center shadow-lg rounded p-10 border border-gray-200">
    <div className="max-w-2xl mx-auto">
      <div className="w-16 h-16 mx-auto mb-6 bg-purple-600 rounded-full flex items-center justify-center"><Mail className="w-8 h-8 text-white" /></div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay in the Loop</h2>
      <p className="text-lg text-gray-600 mb-8">Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals, and special offers.</p>
      <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600" required />
        </div>
        <button type="submit" className="px-8 py-3 bg-purple-600 text-white rounded font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition"><Send className="w-5 h-5" /><span>Subscribe</span></button>
      </form>
      <p className="text-sm text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  </div>
</section>
); };

export default NewsletterSection;
