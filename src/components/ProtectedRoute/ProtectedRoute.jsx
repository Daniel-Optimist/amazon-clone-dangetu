
import React, {useContext, useEffect} from 'react' // we need useContext to check the user coz we get the user from DataContext and useEffect to redirect the user
import { DataContext } from '../DataProvider/DataProvider'; // DataContext contains user information 
import { useNavigate } from 'react-router-dom' // this does the real navigation


//  input children, msg, and redirect as props; note these props are enclosed in a curly braces; we can't use other variable to represent children (basically referrs to childrens embraced/wrapped by the ProtectedRoute component)

function ProtectedRoute({children,msg,redirect}) {
    const navigate = useNavigate(); // store it in navigate variable; note a hook always w/in a function 
    const [{user, Dispatch}]=useContext(DataContext)
    useEffect (()=>{
      // a non-auth user attempting to pay -> use nvagagte to send him to auth with msg ="you must log in to pay", then once logged in we redirect user to intended page (payment page) by assigning the redirect state a value of "/payments"  ('unnecessary bureaucracy avoider: user friendly protection'); see assigned values in Routing component 
      if (!user) {
        navigate("/auth", { state: { msg, redirect } });
      }
    }, [user]); // do this for every user instead of only at initial mount 

  return (
    // <div>ProtectedRoute</div>
    // if (!user) is false, i.e, the user is authenticated, return children
    children
  )
}

export default ProtectedRoute

//  Import and incorporate this component into routing component ; notice we are intending to protect payment ; so payment will be wrapped by ProtectedRoute first and then by Elements component of stripe. We also want to protect order! see both protection at Routing.jsx

// Once you imported it to Routing, log out and then put items on the cart then click on the cart then click checkout. Instead of getting to payment page, you will now be redirected to auth page so that you can sign in. 