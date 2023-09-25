import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector from react-redux
import { useRouter } from "next/router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addTocart } from "@/fetures/reducer";

import {
    faAdd,
    faMinus,
    faPlus,
    faStar,
    faStarHalfStroke
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function Selectitem() {
    const router = useRouter();
    // console.log(router.query.id);
    const getitemId = router.query.id;

    const [Selectitem, setSeletitem] = useState({});
    const [selectImg, setselectImg] = useState("0");
    const [item, setitem] = useState(0);
    const dispatch=useDispatch()

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products/" + getitemId)
            .then((res) => {
                console.log(res.data);
                setSeletitem(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [getitemId]);
    const viewimg = (index) => {
        setselectImg(index);
    };

    const starse = Selectitem.rating;

    const ratingStars = Array.from({ length: 5 }, (_, index) => {
        const number = index + 0.5;
        return (
            <span key={index}>
                {starse >= index + 1 ? (
                    <FontAwesomeIcon icon={faStar} />
                ) : starse >= number ? (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                ) : (
                    <FontAwesomeIcon icon={faStar} style={{ opacity: 0.3 }} />
                )}
            </span>
        );
    });

    const decrementItem = () => {
        item > 0 ? setitem(item - 1) : setitem(0);
    };
    const stock = Selectitem.stock;
    console.log(stock);
    const incrementItem = () => {
        item < stock ? setitem(item + 1) : setitem(stock);
    };

    const addCartItem=(ele)=>{
        dispatch(addTocart(ele))
        // router.push('/user/addcart')
    }

return (
        <>
            <div className="pt-[200px]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2">
                        <div>
                            <div className=" w-full h-fit">
                                {Selectitem.images && (
                                    <Image
                                        src={Selectitem.images[selectImg]}
                                        className="w-full h-full "
                                        width={300}
                                        height={300}
                                        objectFit="cover"
                                    />
                                )}
                            </div>
                            <div className="flex mt-6 gap-2">
                                {Selectitem.images &&
                                    Selectitem.images.map((ele, index) => {
                                        return (
                                            <div>
                                                <Image
                                                    src={ele}
                                                    width={200}
                                                    height={200}
                                                    className="w-full h-full object-cover"
                                                    onClick={() =>
                                                        viewimg(index)
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="max-w-lg mx-auto">

                        
                        <div className="text-black space-y-2 ">
                            <h1 className="text-4xl">{Selectitem.title}</h1>
                            <p>{Selectitem.description}</p>
                            <h4>Brand: {Selectitem.brand}</h4>

                            <div className="flex align-baseline gap-2">
                                <h2 className="text-2xl font-semibold">
                                    ₹{Selectitem.price}
                                </h2>
                                <p>({Selectitem.discountPercentage}%)</p>
                            </div>
                            <div className="flex gap-2">
                                <p>{Selectitem.rating}</p>
                                <div> {ratingStars} </div>
                            </div>
                            <div>
                                <button className="px-2 py-1 rounded-md bg-slate-300 mr-3">
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        onClick={incrementItem}
                                    />
                                </button>
                                {item}
                                <button className="px-2 py-1 rounded-md bg-slate-300 ml-3">
                                    <FontAwesomeIcon
                                        icon={faMinus}
                                        onClick={decrementItem}
                                    />
                                </button>
                            </div>
                        </div>
                            <div className="flex gap-8 mt-10">
                                <button className="px-4 py-2 bg-sky-500 rounded-md" onClick={()=>addCartItem(Selectitem)}> ADD TO CART</button>
                                <button className="px-4 py-2 bg-sky-500 rounded-md" > BUY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Selectitem;
