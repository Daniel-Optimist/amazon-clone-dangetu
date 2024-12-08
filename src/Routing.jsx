import React from "react";
import { BrowserRouter as BrRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51QSZ8JGKaKfQJsahRjKU3lDozsRnBOfo6pFLIPoGobxoz2B7ZJadmAdq55895t352Jz17NtBf2277uCKf94rubtH00TlZPVIEU"
); // dkg: the PK Key I got loggin in is the same as that given in the documentation; is this expected (probably since it is public)

function Routing() {
  return (
    <BrRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            // for non-authorized user
            <ProtectedRoute
              msg={"You must be logged in to pay"}
              // redirect to payment page
              redirect={"/payments"}
            >
              {/* for authorized user */}
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            // for non-authorized user
            <ProtectedRoute
              msg={"You must be logged in to access your orders"}
              // redirect to orders page
              redirect={"/orders"}
            >
              {/* for authorized user */}
              <Orders />
            </ProtectedRoute>
          }
        />
        {/* dynamic routing for results  */}
        <Route path="/category/:categoryName" element={<Results />} />

        {/* dynamic routing when our dynamic id is called  */}
        <Route path="/products/:productId" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrRouter>
  );
}

export default Routing;
