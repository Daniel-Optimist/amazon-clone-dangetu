import React, { useState, useEffect } from "react";
import classes from "./results.module.css";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";
import { producturl } from "../../API/endpoints";
import Loader from "../../components/Loader/Loader";


function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  // console.log(categoryName)
  useEffect( 
    () => {
      setIsLoading(true);
axios
  .get(`${producturl}/products/category/${categoryName}`)
  .then((res) => {
    // console.log (res)
    setResults(res.data);
     setIsLoading(false);
  })
  .catch((err) => {
    console.log(err);
    setIsLoading(false);
  });
    },[]); //[categoryName] Dependency array with CategoryName

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />

          {isLoading ? (
          <Loader />
        ) : (

        <div className={classes.products_container}>
          {results?.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            );
          })}
        </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;

// import React, { useState, useEffect } from "react";
// import classes from "./results.module.css";
// import Layout from "../../components/Layout/Layout";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ProductCard from "../../components/Product/ProductCard";
// import { producturl } from "../../API/endpoints";

// function Results() {
//   const [results, setResults] = useState([]);
//   const { categoryName } = useParams();

//   useEffect(() => {
//     const source = axios.CancelToken.source();

//     axios
//       .get(`${producturl}/products/category/${categoryName}`, {
//         cancelToken: source.token,
//       })
//       .then((res) => {
//         setResults(res.data);
//       })
//       .catch((err) => {
//         if (axios.isCancel(err)) {
//           console.log("Request canceled", err.message);
//         } else {
//           console.log(err);
//         }
//       });

//     return () => {
//       // Cleanup function
//       source.cancel("Operation canceled by the user.");
//     };
//   }, []); // Dependency array is set to [] to run the effect only once

//   return (
//     <Layout>
//       <section>
//         <h1 style={{ padding: "30px" }}>Results</h1>
//         <p style={{ padding: "30px" }}>Category/{categoryName}</p>
//         <hr />
//         <div className={classes.products_container}>
//           {results?.map((product) => {
//             return <ProductCard key={product.id} product={product} />;
//           })}
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Results;

