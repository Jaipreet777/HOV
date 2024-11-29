import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-32" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            House of Virasat is a traditional clothing brand based in Amritsar,
            Punjab. It is located in the heart of Indian state of Punjab sharing
            border and tradition with Pakistan's and India's undivided varse
            culture. Here at House of Virasat we offer our clients with the best
            variety and customs for the Traditional North Indian attire.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1 825-777-0001</li>
            <li>contact@houseofvirasat.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
      </div>
    </div>
  );
};

export default Footer;
