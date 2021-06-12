import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { Link } from 'react-router-dom';
import {
	Paper,
	Icon,
	Input
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function MainContent() {
  const [Data, setData] = useState([{
    nom: "",
    description: "",
    image: "",
    quantite: "",
    prix: "",
  }]);
  //*******affichage + search *******
	const [search, setsearch] = useState({
		title: ''
	});
  useEffect(async () => {
    if (search.title !== '') {
			const products = await axios
      .get(`http://localhost:4000/product/search/${search.title}`)
      .then(function (response) {
        setData(response.data);
      });
		} else {
			const products = await axios
      .get("http://localhost:4000/product")
      .then(function (response) {
        setData(response.data);
      });
		}
  }, [search]);

  return (
    <div className="container">
      <Header />
      
      <Paper  style={{display:'flex',flexDirection:'column'}}>
        <SearchIcon color="action">search</SearchIcon>
        <Input
          placeholder="Search"
          value={search.title}
          onChange={(e) => setsearch({ ...search, title: e.target.value })}
          className="px-16"
        />
      </Paper>
      
      {Data.nom!="" ?(
      <div className="main_content">
        <h3>Confledis</h3>
        {Data.map((item) => (
         <div className="card" key={item._id}>
            <div className="card_img">
              <img src={item.image} />
            </div>
            <div className="card_header">
              <h2>{item.nom}</h2>
              <p className="price">
                {item.prix}
                <span>euro</span>
              </p>
              <Link style={{ color: 'white', cursor: 'pointer', outline: 'none', textDecoration: 'none' }} to={`/details/${item._id}`}>
              <div className="btn">Product Details</div>
              </Link>
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
      ):(
        <p>There iS No Products</p>
      )}
      <Footer />
    </div>
  );
}
