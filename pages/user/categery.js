import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "@/fetures/reducer";
function Categery() {
    const router = useRouter();
    const dispatch = useDispatch()
    const selectData = useSelector((state) => state.counter.items);
    const [category, setcategory] = useState();
    const [AllCategory, setAllCategory] = useState();
    const [values, setvalue] = useState();
    

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products/categories")

            .then((res) => {
                console.log(res.data);
                setcategory(res.data);
            })
            .catch((er) => {
                console.log(er);
            });
    }, []);

    // const getProducts = (values) => {
    //     if(values){
    //         axios
    //         .get("https://dummyjson.com/products/category/" + values)
    //         .then((res) => {
    //             // console.log(res.data.products);
    //             setAllCategory(res.data.products);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //     } else {
    //         axios
    //     .get("https://dummyjson.com/products")
    //     .then((res) => {
    //         // console.log(res.data.products);
    //         setAllCategory(res.data.products);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    //     }

    // }

    const getProducts = async (values) => {
        try {
            if (values) {
                const res = await axios.get(
                    "https://dummyjson.com/products/category/" + values
                );
                dispatch(setItems(res.data.products))
            } else {
                const res = await axios.get("https://dummyjson.com/products");
                dispatch(setItems(res.data.products))
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts(values);
    }, [values]);

    const Handelselected = (e) => {
        setvalue(e.target.value);
    };
    console.log(values);

    const SelectItemInCategory = (id) => {
        router.push("/user/" + id);
    };
    // console.log(AllCategory);
    return (
        <div className="py-[200px]">
            <div className="container mx-auto px-5">
                <select
                    label="What do we eat?"
                    className="text-black focus:ring-blue-500 overflow-y-auto"
                    value={values}
                    onChange={Handelselected}
                >
                    <option value="">All</option>
                    {category &&
                        category.map((ele) => {
                            return (
                                <option
                                    value={ele}
                                    className="text-black overflow-y-scroll"
                                >
                                    {ele}
                                </option>
                            );
                        })}
                </select>

                {/* selected category item */}
                <div className="grid  grid-cols-1 md:grid-cols-3 gap-10 mt-16">
                    {selectData &&
                        selectData.map((ele) => {
                            return (
                                <div
                                    className="text-black "
                                    onClick={() => SelectItemInCategory(ele.id)}
                                >
                                    <div className="h-80">
                                        <Image
                                            src={ele.thumbnail}
                                            className="w-full h-full object-cover"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                    <h1 className="text-3xl mt-5">
                                        {ele.title}
                                    </h1>
                                    <p className="font-semibold text-2xl mt-3">
                                        ₹ {ele.price}
                                    </p>
                                    <p className="mt-3">{ele.description}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Categery;
