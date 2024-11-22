import React, { useState } from "react";
import emailjs from "emailjs-com";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const templateParams = {
      email: email, // Replace {{email}} in the EmailJS template
    };

    console.log("Template Params:", templateParams); // Debugging

    emailjs
      .send(
        "service_ugah9zq",
        "template_syzhhs3",
        templateParams,
        "1uee6R4PmOytWeyYL"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setMessage(
            `Hello ${email}, thank you for subscribing! Check your inbox for updates.`
          );
          setEmail(""); // Reset email input
        },
        (error) => {
          console.error("FAILED...", error);
          setMessage("Failed to subscribe. Please try again.");
        }
      );
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Stay updated with the latest trends and exclusive offers from House of
        Virasat. Be the first to explore our new collections and enjoy special
        discounts delivered straight to your inbox. Don't miss out on
        celebrating tradition with a touch of modern elegance!
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex flex-col gap-3 mx-auto my-6"
      >
        <input
          className="w-full px-4 py-2 border rounded-lg"
          type="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="bg-black text-white text-xs px-10 py-4 rounded-lg hover:bg-gray-800"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${
            message.startsWith("Hello") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsletterBox;
