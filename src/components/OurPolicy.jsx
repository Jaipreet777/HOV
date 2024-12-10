import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img className="w-12 m-auto mb-5" src={assets.exchange_icon} alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div>
        <img className="w-12 m-auto mb-5" src={assets.quality_icon} alt="" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy </p>
      </div>
      <div>
        <img className="w-12 m-auto mb-5" src={assets.support_img} alt="" />
        <p className="font-semibold">Best customer support</p>
        <p className="text-gray-400">we provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;

//ChatGPT - I need a React functional component named OurPolicy that displays three key policies: "Easy Exchange Policy," "7 Days Return Policy," and "Best Customer Support." Each policy should include an icon, a bold heading, and a description, all styled using Tailwind CSS. The layout should be responsive, displaying the policies in a row on larger screens and stacking them vertically on smaller screens. Icons should be sourced from an assets object. Could you provide the complete React JSX code for this component?
//ChatGPT - Can you create a responsive React component called OurPolicy? It should display three policies side by side on larger screens and stack them vertically on smaller screens.
//https:tailwindcss.com/docs/responsive-design
