import React from 'react';

function CategoryCard(props) {
    return (
        <div className="col-12 col-xl-4 col-lg-4 col-md-4" style={{marginTop: "20px"}}>
            <div className="box">
              <div className="icons"><img alt={props.data.name} src={props.data.icon} className="img-fluid" /></div>
              <p className="text">{props.data.name}</p>
              <div className="sub-title">{props.data.description}</div>
            </div>          
        </div>
    )
}

export default CategoryCard;