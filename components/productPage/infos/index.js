import product from "../../../pages/product/[slug]";
import styles from "./styles.module.scss";
import { colors, Rating } from '@mui/material';
import { useRouter } from "next/router";
import {TbMinus,TbPlus} from "react-icons/tb";
import { useEffect, useState } from "react";
import next from "next";
import Link from "next/link";
import { color } from "@mui/system";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Share from "./share";
import Accordian from "./Accordian";
import SimillarSwiper from "./simillarSwiper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {addToCart, updateCart} from "../../../store/cartSlice";
import DialogModal from "@/components/dialogModal";
export default function Infos({product}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [size, setSize ] = useState(router.query.size);
    const [qty, setQty] = useState(1);
    const [error, setError] = useState("");
    const {cart} = useSelector((state) => ({ ...state}));
    const [activeImg, setActiveImg ] = useState("");
    useEffect(()=>{
        setSize("");
        setQty(1);
    },[router.query.style]);
    useEffect(() => {
        console.log('size', size)
    }, [size])
    useEffect(()=>{
        if(qty > product.quantity){
            setQty(product.quantity);
        }
    },[router.query.size]);
    const addToCartHandler = async () => {
        if (!router.query.size) {
          setError("Please Select a size");
          return;
        }
        const { data } = await axios.get(
          `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
        );
        if (qty > data.quantity) {
          setError(
            "The Quantity you have choosed is more than in stock. Try and lower the Qty"
          );
        } else if (data.quantity < 1) {
          setError("This Product is out of stock.");
          return;
        } else {
          let _uid = `${data._id}_${product.style}_${router.query.size}`;
          let exist = cart.cartItems?.find((p) => p._uid === _uid);
          if (exist) {
            let newCart = cart.cartItems.map((p) => {
              if (p._uid == exist._uid) {
                return { ...p, qty: qty };
              }
              return p;
            });
            dispatch(updateCart(newCart));
          } else {
            dispatch(
              addToCart({
                ...data,
                qty,
                size: data.size,
                _uid,
              })
            );
          }
        }
      };
  return (
    <div className={styles.infos}>
      {/* <DialogModal type="success"/> */}
        <div className={styles.infos_container}>
            <h1 className={styles.infos_name}>{product.name}</h1>
            <h2 className={styles.infos_sku}>{product.sku}</h2>
            <div className={styles.infos_rating}>
                <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly={{color: "#FACF19"}}
                />
                ({product.numReviews}
                {product.numReviews == 1 ? " review " : " reviews"})
            </div>
            <div className={styles.infos_price}>
                {!size ? <h2>{product.priceRange}</h2> : <h1>{product.price}</h1>}
                {
                    product.discount > 0 ? (
                    <h3>
                        {size && <span>{product.priceBefore}$</span>}
                        <span>(-{product.discount}%)</span>
                    </h3>
                    ) : (
                        ""
                )}
            </div>
            <span className={styles.infos_shipping}>
                {product.shipping  ? `+${product.shipping}$shipping fee`
                : "free shipping"}
            </span>
            <span>
                {!size ? product.quantity : product.sizes.reduce((start,next)=>start+next.qty,0)} {""}
                pieces available
            </span>
            <div className={styles.infos_sizes}>
                <h4>Select a size : </h4>
                <div className={styles.infos_sizes_wrap}>
                {product.sizes.map((size, i) => (
              <Link
                href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
              >
                <div
                  className={`${styles.infos_sizes_size} ${
                    i == router.query.size && styles.active_size
                  }`}
                  onClick={() => setSize(size.size)}
                >
                  {size.size}
                </div>
              </Link>
            ))}
                </div>
            </div>
            <div className={styles.infos_colors}>
                {product.colors &&
                    product.colors.map((color, i) => (
                    <span
                        className={i == router.query.style ? styles.active_color : ""}
                        onMouseOver={() => setActiveImg(product.subProducts[i].images[0].url)
                        }
                        onMouseLeave={() => setActiveImg("")}
                    >
                        <Link href={`/product/${product.slug}?style=${i}`}>
                            <img src={color.image} alt="" />
                        </Link>
                    </span>
                ))}
            </div>
            <div className={styles.infos_qty}>
                <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
                    <TbMinus />
                </button>
                <span>{qty}</span>
                <button
                    onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
                >
                    <TbPlus />
                </button>
            </div>
            <div className={styles.infos_actions}>
                <button 
                disabled={product.quantity < 1}
                style={{cursor:`${product.quantity < 1 ? "Not Allowed " : ""}`}}
                onClick={() => addToCartHandler()}
                >
                    <BsHandbagFill/>
                    <b>ADD TO CARD</b>
                </button>
                <button onClick={() =>handleWishlist()}>
                    <BsHeart/>
                    WISHLIST
                </button>
            </div>
            {error && <span className={styles.error}>{error}</span>}
            <Share />
            <Accordian details={[product.description,...product.details]}/>
            <SimillarSwiper />
        </div>
    </div>
  );
}
