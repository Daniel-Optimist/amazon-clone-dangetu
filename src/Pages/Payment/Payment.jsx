import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import Layout from "../../components/Layout/Layout";
import { DataConnect } from "firebase/data-connect";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import {
  useStripe,
  useElements,
  CardElement, //insert CardElement here and then into form under payment
} from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";

import { db } from "../../Utility/firebase";//importing firestore db from firebase.js in Utility folder
import { useNavigate } from "react-router-dom";


function Payment() {
  const [{ user, basket }] = useContext(DataContext); //useContext hook to grab basket data from DataContext
  console.log(user); //see on console at this line
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
  //state for spinner when payment is being processed; initally set false
  const [processing, setProcessing] =useState(false)

  //  e refers to an event
  const handleChange = (e) => {
    // console.log(e);// log the event
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  //aync : coz sending request to backend or elsewhere is a promise based ("you have to make a promise while awaiting for the response"; note the response could be positive(resolved) or negative (rejected))
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true); //set true coz payment processing request has been initiated.
      //step 1. contact backend server or function to retrieve the client secret
      //  nb: axiosInstance represent the base URL
      const response = await axiosInstance({
        method: "POST",
        //  total *100 to change dollars to cents as the smallest unit set by currency formatter is cent.
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data)
      //retrieving clientSecret from the response
      const clientSecret = response.data?.clientSecret;
      //step 2. client side (react side confirmation); now that we have the client secret we can confirm PyamentIntent using Stipe.confirmCardPayment method
      // Instead of const confirmation desturcture and get only paymentIntent to store in firestore db
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          // cardElement is a component from stripe; we used below in the return part of this function
          card: elements.getElement(CardElement),
        },
      });
      // console.log(confirmation) //old const prior to the destructuring
      // console.log(paymentIntent)

      //step 3. after the confirmation ---> save the order  on firestore database and then clear the basket
      // collection, document (noSQL db)  equivalent to table, row respectively in SQL db; it connects to collection or will create a collection called users. create doc using user.uid; then create subcollection called "orders" on user; creat document using paymentIntent.id for "orders". Then using set method, set basket, amount, paymentIntent.created (refers to a number)
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empty the basket
      // dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false); //once promise is resolved
      //to take us back to orders route (page) once payment is complete (const navigate =useNavigate()-see above for this const)
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    }catch (error){
      console.log(error)
      setProcessing(false)
    }
      // if (error) {
      //   setCardError(error.message);
      //   setProcessing(false);
      //   return; // Exit early if there's an error
      }
      
      


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
              <form onSubmit={handlePayment}>
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
                  {/* type= "submit" indicates form will be submitted when this button is clicked -Onsubmit-handle Payment fn called */}
                  <button type="submit">
                    {
                    processing? (
                      <div className={classes.loading}>
                        <ClipLoader color='grey' size={12}/>
                        <p>Please wait...</p>
                      </div>
                    ) :"Pay Now"
                    }; 
                    
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
