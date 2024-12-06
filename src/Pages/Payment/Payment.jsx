import React, {useContext, useState} from 'react'
import classes from './payment.module.css'
import Layout from '../../components/Layout/Layout';
import { DataConnect } from 'firebase/data-connect';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard'
import {
  useStripe,
  useElements,
  CardElement //insert CardElement here and then into form under payment
} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';


function Payment() {
  const [{user, basket }] = useContext(DataContext);//useContext hook to grab basket data from DataContext
  console.log(user) //see on console at this line
  // to get the total item added in the basket 
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0); // reduce helps to accumulate the items.

   const total = basket.reduce((amount, item) => {
     return item.price * item.amount + amount;
   }, 0); // calculates the total amount 

  // Two hooks copied from useElements hook snipet of stripe docmentation; hooks should be within a component/function 
const stripe = useStripe();
const elements = useElements();
 const [cardError, setCardError] = useState(null);

//  e refers to an event 
 const handleChange = (e) => {
   // console.log(e);// log the event
   e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
 };


  return (
    <Layout>
      {/* header title  */}
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items{" "}
      </div>
      {/* payment method section  */}
      <section className={classes.payment}>
        {/*address div: h3-title & 3divs-address dtl; flex: title & dtl*/}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 vite react drive </div>
            <div>Nashville, TN</div>
          </div>
        </div>
        <hr />
        {/* product mapping div: h3 & divs side by side*/}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
              basket?.map((item) => (
                <ProductCard product={item} flex={true} />
              )) //ProductCard brings dirti-p: desc,image, rate, title, id, price info of each product ; it helps to add to/remove from cart. ; flex props to make product title and product details side by side
            }
          </div>
        </div>
        <hr />
        {/* card form div: h3 & div side by side */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form action="">
                {/* error handling */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment