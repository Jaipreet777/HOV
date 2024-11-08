import React from 'react'
import Hero from '../components/Hero'
import NewArrivals from '../components/NewArrivals'
import OurCollection from '../components/OurCollection'
import BestSellers from '../components/BestSellers'
import ContactUs from '../components/ContactUs'


const Home = () => {
    return (
        <div>
            <Hero/>
            <NewArrivals/>
            <OurCollection/>
            <BestSellers/>
            <ContactUs/>
        </div>
    )
}

export default Home