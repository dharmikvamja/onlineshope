import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import StripeCheckout from 'react-stripe-checkout';

function Addcart() {
    const cartData = useSelector((state) => state.counter.cart);

    const starse = cartData && cartData.rating;
    console.log(starse);
    const ratingStars = Array.from({ length: 5 }, (_, index) => {
        const number = index + 0.5;
        return (
            <span key={index}>
                {starse >= index + 1 ? (
                    <FontAwesomeIcon icon={faStar} />
                ) : starse >= number ? (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                ) : (
                    <FontAwesomeIcon icon={faStar} />
                )}
            </span>
        );
    });

    const [amount, setamount] = useState(1);

    const handleIncrement = () => {
        amount < 50 ? setamount(amount + 1) : setamount(50);
    };

    const handleDecrement = () => {
        amount > 1 ? setamount(amount - 1) : setamount(1);
    };
    const onToken=(token)=>{
        console.log(token);
    }
    return (
        <div className="pt-[200px]">
            <div className="container mx-auto">
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full text-left text-sm  text-black">
                                    <thead class="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" class="px-6 py-4">
                                                Item Name
                                            </th>
                                            <th scope="col" class="px-6 py-4">
                                                quantity
                                            </th>
                                            <th scope="col" class="px-6 py-4">
                                                Price
                                            </th>
                                            <th scope="col" class="px-6 py-4">
                                                Rating
                                            </th>
                                            <th scope="col" class="px-6 py-4">
                                                payment
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData &&
                                            cartData.map((cartItem, index) =>
                                                cartItem.products.map(
                                                    (product, subIndex) => (
                                                        <tr
                                                            key={`row-${index}-${subIndex}`}
                                                            className="dark:border-neutral-500"
                                                        >
                                                            <td className="whitespace-nowrap px-6 py-4">
                                                                {product.title}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4">
                                                                <button
                                                                    className=" mr-2 py-1 px-2 text-white bg-slate-700"
                                                                    onClick={() =>
                                                                        handleDecrement()
                                                                    }
                                                                >
                                                                    -
                                                                </button>
                                                                {amount}
                                                                <button
                                                                    className="ml-2 py-1 px-2 text-white bg-slate-700"
                                                                    onClick={() =>
                                                                        handleIncrement()
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4">
                                                                <b className="text-xl mr-3">
                                                                    {" "}
                                                                    ₹
                                                                    {
                                                                        product.discountedPrice
                                                                    }{" "}
                                                                </b>
                                                                {"   "}
                                                                <del>
                                                                    {
                                                                        product.price
                                                                    }
                                                                </del>{" "}
                                                                (
                                                                {
                                                                    product.discountPercentage
                                                                }
                                                                % off)
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4">
                                                                {product.rating}
                                                                <span className="text-yellow-500">
                                                                    {
                                                                        ratingStars
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <StripeCheckout
                                                                    token={
                                                                        onToken
                                                                    }
                                                                    stripeKey="pk_test_51NlSktSEM7zLWRUoEU6xd0FnuRFKxP2hljnVrlRt8hvO7tMxM6sPPiS7r4JMMz68tKsmfXho7mLKtjouqenjkfF800QpnKWr1S"
                                                                />
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addcart;
