import React, { useState } from "react";
import emailjs from "emailjs-com";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
};

return (
  <div className="text-center">
    <p className="text-2xl font-medium text-gray-800">
      Subscribe now & get 20% off
    </p>
    <p className="text-gray-400 mt-3">
      Stay updated with the latest trends and exclusive offers from House of
      Virasat. Be the first to explore our new collections and enjoy special
      discounts delivered straight to your inbox. Don't miss out on celebrating
      tradition with a touch of modern elegance!
    </p>
  </div>
);

export default NewsletterBox;
