import Image from "next/image";
import logo from "../public/img/logo.png";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setItems } from "@/fetures/reducer";
import Link from "next/link";
export default function Hedear() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [text, settext] = useState("");
    const [errors, setErrors] = useState("");
    const SerchAction = (value) => {
        console.log(value);
        // if (value.length < 5) {
        //     setErrors("Please enter valid data");

        //     console.log("Please enter valid data");
        // }
        settext(value);

        axios
            .get("https://dummyjson.com/products/search?q=" + value)
            .then((res) => {
                console.log(res.data.products);
                dispatch(setItems(res.data.products));
              
            });
            
    };

    return (
        <div className="">
            <div
                className="fixed  z-50 py-4 px-2  top-0 w-full"
                style={{ backgroundColor: "black" }}
            >
                <section className="   ">
                    <div className="flex items-center justify-between">
                        {/* navbar */}
                        <Link href="/">
                            <Image src={logo} />
                        </Link>
                        <div
                            className="flex justify-between ms-auto  items-center "
                            style={{ width: "70rem" }}
                        >
                            <div className="flex gap-4">
                                <Link href="/">Home</Link>
                                <Link href="/user/categery">Category</Link>
                                <Link href="/user/addcart">Cart</Link>
                            </div>
                            <div>
                                <input
                                    className="py-1 px-3 bg-white border text-black"
                                    value={text}
                                    placeholder="Serch item"
                                    onChange={(e) =>
                                        SerchAction(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
