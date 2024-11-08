import men1 from './men1.jpg'
import men2 from './men2.jpg'
import men3 from './men3.jpg'
import men4 from './men4.jpg'
import men5 from './men5.jpg'
import menu from './menu.png'
import photo from './photo.jpg'
import photo2 from './photo2.jpg'
import photo3 from './photo3.jpg'
import photo4 from './photo4.jpg'
import photo5 from './photo5.jpg'
import picture from './picture.jpg'
import picture2 from './picture2.jpg'
import picture3 from './picture3.jpg'
import picture3 from './picture3.jpg'
import picture4 from './picture4.jpg'
import picturea from './picturea.jpg'
import pictureb from './pictureb.jpg'
import picturec from './picturec.jpg'
import pictured from './pictured.jpg'
import video1 from './video1.mp4'

import cart from './cart.png'
import logo from './logo.png'

export const assets={
    logo,
    cart,
    search_icon,
    star_icon,
    star_dull_icon,
}
export const products =[
    {
        _id: 'A',
        name: "Red simple Suit",
        description: "A lightweight allover suit with simple dupatta and kadai on it",
        price: 100,
        image: {photo},
        category: "Women",
        subcategory: "Designer Suit",
        sizes: ["S", "M", "L"],
        date: 1234456789900,
        bestselller: true

    },
    {
        _id:'B',
        name: "Green kurta Set",
        description: "A lightweight allover suit with simple dupatta and kadai on it",
        price:200,
        image:{men1},
        category: "Men",
        subcategory:"Kurtas",
        sizes: ["S", "M", "L"],
        date:13435467690098765,
        bestselller: true

    }
]

