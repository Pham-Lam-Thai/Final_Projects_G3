import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import {GiShoppingCart} from "react-icons/gi";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

export default function Main() {
    const {cart} = useSelector((state) => ({ ...state}));
  return (
    <div className={styles.main}>
        <div className={styles.main_container}>
            <Link legacyBehavior href="/">
                <a className={styles.logo}>
                    <img src="../../../logo.png" alt=""/>
                </a> 
            </Link>               
            <div className={styles.search}>
                <input type="text" placeholder="Search...."/>
                <div className={styles.search_icon}>
                    <RiSearch2Line/>
                </div>
            </div>  
            <Link legacyBehavior href="/cart">
                <a className={styles.cart}>
                    <GiShoppingCart/>
                    <span>0</span>
                </a>
            </Link>
        </div>
    </div>
  );
}
