import React, { useContext, useEffect, useState } from "react"; // useContext hook to grab context data from DataContext; useEffect to do stuff that are external to this components (to handle side effects like querying db; to interact endpoints outside orders); useState for order's state
import classes from "./orders.module.css";
import Layout from "../../components/Layout/Layout";

import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider"; // to check if there is a user coz we query the db only if there is a user
import ProductCard from "../../components/Product/ProductCard";

function Orders() {
  // let us pick a user from our context ; hooks always inside function; const items prior to useEffect
  const [{ user }, dispatch] = useContext(DataContext);
  //useEffect prior to return; callback function and with dependency array empty

  const [orders, setOrders] = useState([]); //empty array initially

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot); //log snapshot
          // modify(set) the order's state with array of objects obtained from snapshot
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              // method called data from the array's prototype seen in the console
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]); // if no user make order empty array
    }
  }, [user]);
  return (
    <Layout>
      {/* note classNames within curly braces and w/o quotes */}
      <section className={classes.container}>
        <div className={classes.orders_container}>
          {/* title  */}
          <h2>Your Orders</h2>
          {
            // orders is an array; if its length==0
            orders?.length == 0 && (
              // inline styling: padding in double curly braces
              <div style={{padding : "20px"}}>"You don't have orders yet" </div>
            )
          }
          {/* ordered items from db */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {
                    // nb: eachOrder.d.b.m (callback function)
                    eachOrder?.data?.basket?.map((order) => (
                      // Insert ProductCard w/ its props

                      <ProductCard
                        flex={true} //img & desc sideways
                        product={order}
                        key={order.id}
                      />
                    ))
                  }
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
