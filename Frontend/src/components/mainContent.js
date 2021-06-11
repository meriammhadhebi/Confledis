import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { Link } from 'react-router-dom';

export default function MainContent() {
  const [Data, setData] = useState([{
    nom: "",
    description: "",
    image: "",
    quantite: 0,
    prix: 0,
  }]);
  useEffect(async () => {
    const products = await axios
      .get("http://localhost:4000/product")
      .then(function (response) {
        setData(response.data);
      });
    console.log(products);
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="main_content">
        <h3>Headphones</h3>
        {Data.map((item) => (
          <div className="card" key={item.id}>
            <div className="card_img">
              <img src="/images/1.png" />
            </div>
            <div className="card_header">
              <h2>{item.nom}</h2>
              <p className="price">
                {item.prix}
                <span>euro</span>
              </p>
              <div className="btn">Add to cart</div>
            </div>
          </div>
        ))}
        <Link to='/new'>
          <div style={{width:'300px'}}  className="card" >
              <div className="card_img">
                <img src="/images/plus.png" />
              </div>
              <div className="card_header">
              <h2></h2>
              <p></p>
              <p className="price">
                <span></span>
              </p>
              <div className="btn">Add New Product</div>
            </div>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
