import Image from "next/image";
import homebanner from "../public/img/banner.png";
import homedefult from "../public/img/homedefult.png";
import Game from "../public/img/Game.png";
import bakrey from "../public/img/Bakery.png";
import carparts from "../public/img/carparts.png";
import imitation from "../public/img/imitation.png";
import girlscloth from "../public/img/girlsclothe.png";
import medical from "../public/img/medical.png";
import electric from "../public/img/electric.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
// import { items } from "@/fetures/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addTocart } from "@/fetures/reducer";
export default function Homepage() {
    const router = useRouter();
    const [allitem, setallitem] = useState([]);
  
    const dispatch=useDispatch()
    const selectData = useSelector((state) => state.counter.items);
   

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then((res) => {
                console.log(res.data.products);
                // dispatch(addTocart(res.data.products))
                setallitem(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    },[]);

    const showItemdetail = (id) => {
        router.push("/user/" + id);
        console.log(router);
    };
    const addCartItem = (ele) => {
        console.log(ele.id);
        const requestData = {
            userId: 1,
            products: [
              {
                id: ele.id,
                quantity: 1,
              }
            ],
          };
        axios.post("https://dummyjson.com/carts/add",requestData)
          .then(response => {
            console.log(response.data);
            dispatch(addTocart(response.data));
          })
          .catch(error => {
            console.error(error);
          });
        // if (typeof window !== 'undefined') {
            // dispatch(addTocart(ele));
        //   }
    }
    return (
        <>
            <div className="lg:h-screen  ">
                <div className="lg:fixed   inset-0">
                    <Image
                        src={homebanner}
                        className="lg:object-cover h-full w-full  "
                    />
                    <div className="hidden lg:block bg-[rgba(0,0,0,0.5)]  top-0  absolute h-full w-full  z-20"></div>
                </div>
                <div className="lg:relative lg:text-white lg:mt-52 py-5 lg:py-0 container mx-auto">
                    <div className="lg:max-w-lg max-w-md mx-auto lg:mr-auto lg:ml-10 text-center lg:text-left ">
                        <h1 className="lg:text-white text-black lg:text-4xl md:text-3xl text-xl leading-tight font-semibold">
                            Ready to go Demos to run your own eCommerce website
                            today
                        </h1>
                        <a
                            href="#"
                            className="py-2 px-4 bg-teal-500 mt-10 inline-block"
                        >
                            OPEN STORE FREE
                        </a>
                    </div>
                </div>
            </div>

            <div className=" lg:relative  bg-slate-50 lg:py-28 py-10">
                <div className=" text-center  space-y-6 ">
                    <div className="relative  z-30  space-y-6 container mx-auto">
                        <span className=""></span>
                        <div
                            className="relative space-y-6 hidden lg:block after:top-[-100px] after:-z-10  after:content-['35+'] after:text-[200px] after:font-bold
                 after:absolute  after:left-[38%] after:text-slate-200"
                        >
                            <h1 className="md:text-4xl text-2xl text-black">
                                High-Quality Demos
                            </h1>
                            <p className="max-w-lg text-xs mx-auto text-black">
                                Using Shopify 2.0 with Section ready, a lot of
                                theme settings and options you are able to
                                create heavy store that looks perfect on any
                                screen resolution.
                            </p>
                        </div>

                        <div className="max-w-7xl px-6 mx-auto pt-28">
                            <div className="grid lg:grid-cols-3   sm:grid-cols-2 gap-12  text-black relative">
                                {allitem.map((ele, id) => {
                                    return (
                                        <div
                                            className=" text-left "
                                           
                                        >
                                            <div className=" duration-[1000ms] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                                                <div className="w-full h-72">
                                                    <Image
                                                        src={`${ele.thumbnail}`}
                                                        className="w-full h-full object-cover"
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>
                                            </div>
                                            <div className=" mt-3 h-[21rem]">
                                                <p className="">
                                                    {ele.description}
                                                </p>
                                                <h2 className="text-2xl font-bold mt-3">
                                                    {ele.title}
                                                </h2>

                                                <div className="flex gap-3 items-baseline mt-3">
                                                    <h2 className="text-4xl">
                                                        ₹ {ele.price}
                                                    </h2>
                                                    <p>
                                                        (
                                                        {ele.discountPercentage}
                                                        %Off)
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 mt-3">
                                                    <p>rating </p>
                                                    <div>
                                                        {ele.rating}
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className="text-amber-500"
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className="text-amber-500"
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className="text-amber-500"
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className="text-amber-500"
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faStarHalfStroke
                                                            }
                                                            className="text-amber-500"
                                                        />
                                                    </div>
                                                </div>
                                                <p>left in{ele.stock}</p>
                                                <h3 className="text-3xl">
                                                    {ele.category}
                                                </h3>
                                            </div>
                                            <div className=" lg:flex lg:gap-4 mt-10 space-y-3 lg:space-y-0 ">
                                                <button className=" w-full px-4 py-2 bg-sky-500 rounded-md" onClick={()=>addCartItem(ele)}>
                                                    ADD TO CART
                                                </button>
                                                <button className="w-full px-4 py-2 bg-sky-500 rounded-md"  onClick={() =>
                                                showItemdetail(`${ele.id}`)
                                            }>
                                                    
                                                    BUY NOW
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
