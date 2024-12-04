
import React, {useContext} from "react"; // Importing React to use JSX syntax
import Rating from "@mui/material/Rating"; // Importing the Rating component from Material UI for displaying product ratings
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat"; // Importing CurrencyFormat component for formatting the product price
import classes from "./product.module.css"; // Importing CSS module for styling
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation
import Loader from "../Loader/Loader";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";



function ProductCard({ product, flex, renderDesc,renderAdd }) {
  // Destructuring props to get the product object

  // Checking if product is undefined
  if (!product) {
    return null; // Return null if product is undefined to prevent rendering
  }

  const { image, title, id, rating, price, description } = product; // Destructuring product properties for easier access
  const [state, dispatch] = useContext(DataContext);

  // console.log(state)

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    // please note there shouldn't be whitespace b/n $ and {} in template literal ( I didn't get the flexing initially due to this)
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      {/* Using CSS module class for the card container  ; if flex is true then product_flexed classes w/c puts the product detail next to image  */}
      <Link to={`/products/${id}`}>
        {/* Link to navigate to the product detail page */}
        <img src={image} alt={title} />
        {/* Displaying product image with alt text */}
      </Link>
      <div>
        <h3>{title}</h3>
        {/* Displaying product title */}
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description} </div>}
        <div className={classes.rating}>
          {/* Container for rating */}
          <Rating value={rating?.rate ?? 0} precision={0.1} readOnly />
          {/* Displaying product rating, default to 0 if rating is undefined */}
          <small>{rating?.count ?? 0}</small>
          {/* Displaying count of ratings, default to 0 if undefined */}
        </div>
        <div>
          <CurrencyFormat amount={price} />
          {/* Displaying formatted product price */}
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
        {/* Add to Cart button with CSS module class */}
      </div>
    </div>
  );
}

export default ProductCard; 
// Exporting ProductCard component as default export

/*Default Values:

For the Rating component, set a default value using the nullish coalescing operator (??). This ensures that rating.rate defaults to 0 if it’s undefined.

Similarly, set a default value for the count in the <small> tag.

By ensuring that default values are provided, you can prevent the component from switching between controlled and uncontrolled states, which resolves the warning I was encountering. */