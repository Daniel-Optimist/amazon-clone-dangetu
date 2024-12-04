import React from 'react'
import {CategoryInfos} from './CategoryCpltInfo.js'
import classes from "./category.module.css";
import {Link} from "react-router-dom" // to change anchor tag to Link 

// destructur the incoming data 
function CategoryCard({ data }) {
    console.log (data) 
  return (
    <div className={classes.category}>
      {/* dynamic routing for results  */}
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard