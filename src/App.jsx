
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Routing from './Routing'
import react, { useContext, useEffect } from "react";
import { Type } from './Utility/action.type'
import { auth } from './Utility/firebase'
import { DataContext } from './components/DataProvider/DataProvider'


function App() {
  const [{ user }, dispatch] = useContext (DataContext);  
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser)
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);



  return (
    <>
      {/* <h1>amazone clone</h1>
      <Testz1/>

      <Testz2/> */}
      <Routing/>
      
    </>
  )
}


export default App
