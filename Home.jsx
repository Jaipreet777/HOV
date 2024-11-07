import React from 'react'
import Hero from '../components/Hero'
import NewArrivals from '../components/NewArrivals'
import OurCollection from '../components/OurCollection'
import BestSellers from '../components/BestSellers'


const Home = () => {
    return (
        <div>
            <Hero/>
            <NewArrivals/>
            <OurCollection/>
            <BestSellers/>
        </div>
    )
}

export default Home