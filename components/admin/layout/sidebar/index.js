import { toggleSidebar } from "@/store/ExpandSlice";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillMessage } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { IoListCircleSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { MdArrowForwardIos, MdOutlineCategory, MdSpaceDashboard } from "react-icons/md";
import {IoNotificationsSharp} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { FaThList } from "react-icons/fa";
import { BsPatchPlus } from "react-icons/bs";
import { RiCoupon3Fill, RiLogoutCircleFill, RiLogoutCircleLine, RiSettingsLine } from "react-icons/ri";

export default function Sidebar() {
    const router = useRouter();
    const route = router.pathname.split("/admin/dashboard/")[1];
    console.log(route);
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const { expandSidebar } = useSelector((state) => ({ ...state }));
    const expand = expandSidebar.expandSidebar;
    const handleExpand = () =>{
        dispatch(toggleSidebar());
    };
  return (
    <div className={`${styles.sidebar} ${expand ? styles.opened : "" }`}>
        <div className={styles.sidebar_toggle} onClick={() => handleExpand()}>
            <div
            style={{
                transform: `${expand ? "rotate(180deg)" : ""}`,
                transition: "all .2s",
            }}
            >
                <MdArrowForwardIos />
            </div>
      </div>
        <div className={styles.sidebar_container}>
            <div className={styles.sidebar_header}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={styles.sidebar_user}>
                <img src={session?.user?.image} alt="" />
                <div className={styles.show}>
                    <span>Welcome back 👋</span>
                    <span>{session?.user?.name}</span>
                </div>
        </div>
            <ul className={styles.sidebar_list}>
                <li className={ route == undefined ? styles.active: ""}>
                    <Link legacyBehavior href="/admin/dashboard">
                        <a>
                            <MdSpaceDashboard/>
                            <span className={styles.show}>DashBoard</span>
                        </a>
                    </Link>
                </li>
                <li className={ route == "sales" ? styles.active: ""}>
                    <Link legacyBehavior href="/admin/dashboard/sales">
                        <a>
                            <FcSalesPerformance/>
                            <span className={styles.show}>Sales</span>
                        </a>
                    </Link>
                </li>
                <li className={ route == "orders" ? styles.active: ""}>
                    <Link legacyBehavior href="/admin/dashboard/orders">
                        <a>
                            <IoListCircleSharp/>
                            <span className={styles.show}>Orders</span>
                        </a>
                    </Link>
                </li>
                <li className={ route == "users" ? styles.active: ""}>
                    <Link legacyBehavior href="/admin/dashboard/users">
                        <a>
                            <ImUsers/>
                            <span className={styles.show}>Users</span>
                        </a>
                    </Link>
                </li>
                <li className={ route == "messages" ? styles.active: ""}>
                    <Link legacyBehavior href="/admin/dashboard/messages">
                        <a>
                            <AiFillMessage/>
                            <span className={styles.show}>Messages</span>
                        </a>
                    </Link>
                </li>
            </ul>
            <div className={styles.sidebar_dropdown}>
                <div className={styles.sidebar_dropdown_heading}>
                    <div className={styles.show}>Product</div>
                </div>
                <ul className={styles.sidebar_list}>
                    <li className={route == "product/all" ? styles.active : ""}>
                    <Link href="/admin/dashboard/product/all">
                        <a>
                        <FaThList />
                        <span className={styles.show}>All Products</span>
                        </a>
                    </Link>
                    </li>
                    <li className={route == "product/create" ? styles.active : ""}>
                    <Link href="/admin/dashboard/product/create">
                        <a>
                        <BsPatchPlus />
                        <span className={styles.show}>Create Product</span>
                        </a>
                    </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.sidebar_dropdown}>
                <div className={styles.sidebar_dropdown_heading}>
                    <div className={styles.show}>Categories / Subs</div>
                </div>
                <ul className={styles.sidebar_list}>
                    <li className={ route == "categories" ? styles.active: ""}>
                        <Link legacyBehavior href="/admin/dashboard/categories">
                            <a>
                                <MdOutlineCategory/>
                                <span className={styles.show}>Categories</span>
                            </a>
                        </Link>
                    </li>
                    <li className={ route == "subCategories" ? styles.active: ""}>
                        <Link legacyBehavior href="/admin/dashboard/subCategories">
                            <a>
                                <div style={{ transform: "rotate(180deg)"}}>
                                    <MdOutlineCategory/>
                                </div>
                                <span className={styles.show}>SubCategories</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.sidebar_dropdown}>
                <div className={styles.sidebar_dropdown_heading}>
                    <div className={styles.show}>Categories / Subs</div>
                </div>
                <ul className={styles.sidebar_list}>
                    <li className={ route == "coupons" ? styles.active: ""}>
                        <Link legacyBehavior href="/admin/dashboard/coupons">
                            <a>
                                <RiCoupon3Fill/>
                                <span className={styles.show}>Coupons</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <nav>
                <ul className={`${styles.sidebar__list} ${
              expand ? styles.nav_flex : ""
            }`}>
                    <li>
                        <Link legacyBehavior href="">
                            <a>
                                <RiSettingsLine/>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="">
                            <a>
                                <IoNotificationsSharp/>
                            </a>                       
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="">
                            <a>
                                <AiFillMessage/>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="">
                            <a>
                                <RiLogoutCircleLine/>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}
