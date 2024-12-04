import React from 'react'
import { CategoryInfos} from "./CategoryCpltInfo.js"
import CategoryCard from './CategoryCard'
import classes from './category.module.css'


function Category() {
  return (
    <div>
        <section className={classes.category_container}>
            {
                CategoryInfos.map((infos)=>{ 
                    return (
                      <CategoryCard
                        data={infos}
                        key={`${infos.name}-${infos.title}`}
                      />
                    ); //ensure unique key Prop
            })
            }

        </section>
    </div>
  )
}

export default Category