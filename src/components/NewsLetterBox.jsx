import React, { useState } from "react";
import emailjs from "emailjs-com";

const NewsletterBox = () => {
  const [email, setEmail] = useState(""); // Store email input
  const [message, setMessage] = useState(""); // Feedback message
  const [loading, setLoading] = useState(false); // Initial loading state is false

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(""); // Clears previous messages
    setLoading(true); // Shows loading

    // Email Format validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Template parameters for EmailJS
    const templateParams = {
      email: email, // For {{email}} in the EmailJS template
    };

    emailjs
      .send(
        "service_ugah9zq", // EmailJS Service ID
        "template_syzhhs3", // EmailJS Template ID
        templateParams,
        "4GOIlBigVQ_CKI5JG" // EmailJS User ID
      )
      .then(() => {
        setMessage(
          `Hello ${email}, thank you for subscribing! Check your inbox for updates.`
        ); // Success message
        setEmail(""); // Clear email after submission
      })
      .catch(() => {
        setMessage("Failed to subscribe. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Set loading back to false
      });
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Stay updated with the latest trends and exclusive offers from House of
        Virasat.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex flex-col gap-3 mx-auto my-6"
      >
        <input
          className="w-full px-4 py-2 border rounded-lg"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="bg-black text-white text-xs px-10 py-4 rounded-lg hover:bg-gray-800"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Subscribe"}
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

//https://ca.video.search.yahoo.com/search/video?fr=mcafee&p=how+to+connect+email+js+to+react+project&type=E210CA105G0#id=1&vid=a05702419e1a3d636f855df2c4252b68&action=click
//https://chatgpt.com/c/67402466-cba4-8007-9b9e-2de2eda0aa1c - error
