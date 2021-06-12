import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { useHistory } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DetailsProduct(props) {
  const idProduct = props.match.params.id;
  const [Data, setData] = useState([{}]);
  useEffect(async () => {
    const product = await axios
      .get(`http://localhost:4000/product/${idProduct}`)
      .then(function (response) {
        setData(response.data);
      });
    console.log(product);
  }, []);

  const history = useHistory();
  const handledelete = async (id) => {
    const uri = "http://localhost:4000/product";
    await axios.delete(`${uri}/${idProduct}`).then(function (response) {
    history.push("/");
    });
  };
  const handleedit = e => {
    history.push(`/edit/${idProduct}`);
  };
  return (
    <div className="container">
      <Header />
      <div className="add_form">
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleedit}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handledelete}
        >
          Delete
        </Button>
        <div className="fields">
          <div className="cardSingle">
            {Data.image && Data.image !== "" && (
              <div className="relative">
                <img src={Data.image} style={{ width: "30%" }} alt="image" />
                <p style={{ color: "white" }}>share this product</p>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <FacebookShareButton
                    url="https://www.linkedin.com/in/klassi-klassi-96b6b8210/?originalSubdomain=tn"
                    quote={Data.nom + "\n" + Data.description}
                    hashtag="#product #confledis"
                  >
                    <FacebookIcon
                      style={{ width: "30px" }}
                      logoFillColor="white"
                    />
                  </FacebookShareButton>
                  <LinkedinShareButton
                    url="https://www.linkedin.com/in/klassi-klassi-96b6b8210/?originalSubdomain=tn"
                    title={Data.nom}
                    summary={Data.description}
                  >
                    <LinkedinIcon
                      style={{ width: "30px" }}
                      logoFillColor="white"
                    />
                  </LinkedinShareButton>
                </div>
              </div>
            )}
            <div className="product_description">
              <h1>{Data.nom}</h1>
              <Divider />
              <p>Details : {Data.description}</p>
              <span>Quantity : {Data.quantite}</span>
              <span>Price : {Data.prix} euro</span>
            </div>
          </div>

          <Button
            style={{ position: "relative", top: "-200px", right: "300px" }}
            className="btn"
            aria-label="add"
            type="submit"
          >
            Add To Cart
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
