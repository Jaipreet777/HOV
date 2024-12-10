import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsLetterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;

//ChatGPT - I am building a React application using Vite. I need a Home component that acts as the main landing page of the website. The Home component should import and render some child components in a sequence there are 4 of those.
//ChatGPT - Can you explain how to create a Home component in React that imports child components from a components directory and renders them sequentially?
//https:www.youtube.com/watch?v=Dorf8i6lCuk
//https:github.com/react-boilerplate/react-boilerplate/blob/master/app/containers/HomePage/index.js
