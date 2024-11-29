import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import { collection, addDoc } from "firebase/firestore"; // For Firestore
import { db } from "../../firebase"; // Firestore config
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  // State for managing the selected date and user profile
  const [date, setDate] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch authenticated user info
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Anonymous User",
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to be logged in to book an appointment!");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        name: user.name,
        email: user.email,
        date: date.toISOString(),
        status: "Pending",
        createdAt: new Date(),
      });
      alert("Appointment booked successfully!");
      setDate(null); // Reset date picker
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book the appointment.");
    }
  };

  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            D Block Ranjit Avenue <br /> Amritsar, Punjab, India
          </p>
          <p className="text-gray-500">
            Tel: +1 825-777-0001 <br /> Email: contact@houseofvirasat.com
          </p>
          <p className="font-semibold text-xl text-gray-600">Careers at HOV</p>
          <p className="text-gray-500">
            Learn more about our team and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Appointment Booking Section */}
      <div className="my-10">
        <h2 className="text-center text-xl font-semibold">Book an Appointment</h2>
        {user ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Choose a Date:</label>
              <Flatpickr
                options={{
                  enableTime: true,
                  dateFormat: "Y-m-d H:i",
                  minDate: "today",
                }}
                value={date}
                onChange={(selectedDates) => {
                  setDate(selectedDates[0]);
                }}
                className="border border-gray-300 p-2 rounded w-64"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-all duration-300"
            >
              Book Appointment
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-500">Please log in to book an appointment.</p>
        )}
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;