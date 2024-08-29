import React, {useEffect, useState} from 'react'
import { apiGetProducts } from '../apis/product'
import { Product } from './'
import Slider from "react-slick"

const tabs = [
    {id: 1, name:'best sellers'},
    {id: 2, name:'new arrivals'},
]

var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null)
    const [newProducts, setNewProducts] = useState(null)
    const [activedTab, setActivedTab] = useState(1)
    const [products, setProducts] = useState(null)

  
    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({sort:'-sold'}),apiGetProducts({sort: '-createdAt'})])
        if (response[0]?.success){
            setBestSellers(response[0].products)
            setProducts(response[0].products)
        } 
        if (response[1]?.success) setNewProducts(response[1].products)
        setProducts(response[0].products)
    }
    useEffect(() => {
      fetchProducts()
    },[])

    useEffect(() => {
        if(activedTab === 1) setProducts(bestSellers)
        if(activedTab === 2) setProducts(newProducts)    
    },[activedTab])

    return (
        <div>
            <div className='flex text-[20px] gap-8 pb-4 border-b-2 border-main'>
                { tabs.map(el => (
                    <span 
                        key={el.id} 
                        className={`font-semibold capitalize border-r cursor-pointer text-gray-400 ${activedTab === el.id ? 'text-gray-900' : ''}`}
                        onClick={() => setActivedTab(el.id)}
                    >
                    {el.name}
                    </span>
                ))} 
            </div>
            <div className='mt-4 mx-[-10px]'>
            <Slider {...settings}>
                {products?.map(el => (
                    <Product
                        key={el.id}
                        productData={el}
                        isNew={activedTab === 1 ? false : true}
                    />
                ))}
            </Slider>
            </div>
        </div>
    )
}

export default BestSeller
