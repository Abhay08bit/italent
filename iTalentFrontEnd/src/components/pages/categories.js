import React from 'react';
import CategoryCard from '../atoms/categoryCard/categoryCard';
import DeveloperImg from '../../assets/images/developers.png';
import DesignerImg from '../../assets/images/designers.png';
import FinanceImg from '../../assets/images/finance.png';
import ProductManagerImg from '../../assets/images/product-manager.png';
import ProjectManagerImg from '../../assets/images/project-manager.png';
import iTalentProjectImg from '../../assets/images/italent-project.png';

const catArray = [
    {
        icon: DeveloperImg,
        name: "Developers",
        description: "Seasoned software engineers, coders, and architects with expertise across hundreds of technologies."
    },
    {
        icon: DesignerImg,
        name: "Designers",
        description: "Seasoned software engineers, coders, and architects with expertise across hundreds of technologies."
    },
    {
        icon: FinanceImg,
        name: "Finance Experts",
        description: "Seasoned software engineers, coders, and architects with expertise across hundreds of technologies."
    },
    {
        icon: ProductManagerImg,
        name: "Project Managers",
        description: "Seasoned software engineers, coders, and architects with expertise across hundreds of technologies."
    },
    {
        icon: ProjectManagerImg,
        name: "Product Managers",
        description: "Seasoned software engineers, coders, and architects with expertise across hundreds of technologies."
    },
    {
        icon: iTalentProjectImg,
        name: "iTalent Projects",
        description: "Seasoned software engineers, coders, and architects with expertise across hundreds of technologies."
    },
]

function Categories() {
    return (
        <React.Fragment>
        {/* <div className="shape2"></div> */}
        <h1 className="explore_heading">Explore by categories</h1>
        <h4 className="explore_subtitle">We are the largest, globally-distributed network of top business, design, and technology talent, ready to tackle your most important initiatives.</h4>
        <div className="row categories">
             {
                catArray.map((el, key) => {
                    return <CategoryCard data={el} key={key} />
                })
                }   
        </div>
        </React.Fragment>
    )
}

export default Categories;