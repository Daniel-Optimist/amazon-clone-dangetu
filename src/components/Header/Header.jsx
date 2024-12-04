import React, { useContext } from "react";
import classes from "./header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";

import { Link } from "react-router-dom"; // to change all anchor tags <a href= ""  </a>  to <Link to="" </Link> The switch form anchor tags to the <Link> component is aimed at preventing full page reloads, w/c significantly improve user experience by avoiding delays and preserving crucial application state.
import { DataContext } from "../DataProvider/DataProvider";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // to get the total item added in the basket ; use totalItem in the span with in the Link for cart below
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* Logo section */}
          <div className={classes.logo_container}>
            {/* the forward slash gives us the landing page - we will return to a page with a click of the button associated with the page */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

            <div className={classes.delivery}>
              <span>{<SlLocationPin />}</span>

              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search section*/}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>
          {/* other selection */}

          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://pngimg.com/uploads/flags/flags_PNG14592.png"
                alt=""
              />
              <select name="" id="">
                <option value="">En</option>
              </select>
            </Link>
            {/* three components : signIn, Returns&Orders, and cart */}
            <Link to="/auth">
              <p>Sign In</p>
              <span>Accounts & Lists</span>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders </span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
