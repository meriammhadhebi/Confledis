import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { TextField} from "@material-ui/core";

export default function DetailsProduct(props){
    const idProduct = props.match.params.id;
    const [Data, setData] = useState([{
        nom: "",
        description: "",
        image: "",
        quantite: 0,
        prix: 0,
      }]);
    useEffect(async () => {
        const products = await axios
          .get(`/http://localhost:4000/product/${idProduct}`)
          .then(function (response) {
            setData(response.data);
          });
        console.log(products);
      }, []);
    return(
        <div  className="container">
      <Header />
      <div className="add_form">
        <div style={{display:'flex',flexDirection:'row'}}>
        <div >
        {Data.image && Data.image !== "" && (
          <div className="relative">
            <img src={Data.image} style={{width:'30%'}} alt="image" />
          </div>
        )}
        </div>
        </div>
        <div className="fields" style={{display:'flex',flexDirection:'column'}}>
            <div className="card">
            <input>{Data.nom}</input>
            </div>
            <div className="card">
            <TextField
                multiline
                fullWidth
                rows="6"
                margin="none"
                disableUnderline
                value={Data.description}
            />
            </div>
            <div className="card">
            <TextField
                multiline
                fullWidth
                rows="2"
                margin="none"
                disableUnderline
                value={Data.quantite}
            />
            </div>
            <div className="card">
            <TextField
                placeholder="Price"
                multiline
                fullWidth
                rows="2"
                margin="none"
                disableUnderline
                value={Data.prix}
            />
            </div>
        </div>
        </div>
      <Footer />
    </div>
    )
}