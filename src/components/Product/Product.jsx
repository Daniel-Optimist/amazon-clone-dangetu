import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import axios from "axios"; // Importing axios for making HTTP requests
import ProductCard from "./ProductCard"; // Ensure ProductCard is imported
import classes from "./product.module.css"; // Importing CSS module for styling
import Loader from "../Loader/Loader"; // Importing Loader component for displaying a loading state

function Product() {
  const [products, setProducts] = useState([]); // Initial state set to an empty array for storing products
  const [isLoading, setIsLoading] = useState(false); // State to manage the loading state of the component

  useEffect(() => {
    setIsLoading(true); // Set loading state to true when the component is mounting

    axios
      .get("https://fakestoreapi.com/products") // Make a GET request to fetch products data from the API
      .then((res) => {
        setProducts(res.data); // Set the products state with the fetched data
        setIsLoading(false); // Set loading state to false once data is fetched
      })
      .catch((err) => {
        console.log(err); // Log any errors that occur during the request

        setIsLoading(false); // Set loading state to false if an error occurs
      });
  }, []); // Dependency array ensures the effect runs once on mount

  return (
    <>
      {/* Ternary operator: if isLoading is true, use Loader component other wise implement the data within the section */}
      {isLoading ? (
        <Loader />
      ) : (
        // Map through products array and render a ProductCard for each product and display products in a section element
        <section className={classes.products_container}>
          {products?.map((singleProduct) => (
            <ProductCard
              renderAdd={true}
              product={singleProduct}
              key={singleProduct.id}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
// Exporting Product component as default export

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductCard from "./ProductCard"; // Ensure ProductCard is imported
// import classes from "./product.module.css";
// import Loader from "../Loader/Loader";

// function Product() {
//   const [products, setProducts] = useState([]); // Initial state set to an empty array
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     axios
//       .get("https://fakestoreapi.com/products")
//       .then((res) => {
//         setProducts(res.data); // Set the products state with the fetched data
//         setIsLoading(false)
//       })
//       .catch((err) => {
//         console.log(err); // Log any errors
//         setIsLoading(false)
//       });
//   }, []); // Dependency array ensures the effect runs once on mount

//   return (
//     <>
//     {/* Ternary operator: if isLoading is true, use Loader component other wise implement the data within the section */}
// {isLoading ? (
//         <Loader />
//       ) : (<section className={classes.products_container}>
//         {products.map((singleProduct) => (
//           <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
//         ))}
//       </section>

//       )}

//     </>
//   );
// };

// export default Product;
