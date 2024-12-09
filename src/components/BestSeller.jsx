import React, { useEffect, useState } from 'react'
import Title from './Title'
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const [bestSeller, setBestSeller] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const productSnapshot = await getDocs(productsCollection);
                const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const bestProduct = productList.filter(item => item.collection === "Best Sellers");
                setBestSeller(bestProduct.slice(0, 5));
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={"BEST"} text2={"SELLERS"} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item) => (
                        <ProductItem key={item.id} id={item.id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
