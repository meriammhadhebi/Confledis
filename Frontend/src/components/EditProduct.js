import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { TextField, Button, Icon, Fab, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";
import FormUploadImage from "./FormUploadImage";
import { store } from 'react-notifications-component';
import ReactNotification from 'react-notifications-component';

export default function AddProduct(props) {
    const idProduct = props.match.params.id;
  const [productData, setProduct] = useState({
    nom: "",
    description: "",
    image: "",
    quantite: "",
    prix: "",
  });
  useEffect(async () => {
    const product = await axios
      .get(`http://localhost:4000/product/${idProduct}`)
      .then(function (response) {
        setProduct(response.data);
      });
    console.log(product);
  }, []);
  const history = useHistory();
  //*************Success Notification*************
  function Success() {
      store.addNotification({
          title: 'Product Added!',
          message: "new product added successfully <3",
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
              duration: 5000,
              onScreen: true
          }
      });
  }
  //*************add Product*************
  const Submit = async (e) => {
    const uri = "http://localhost:4000/product";
    await axios.patch(`${uri}/${idProduct}`,productData).then(function (response) {
    history.push("/");
    });
    };
  //*************On change add image*************
  function handleUploadChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = () => {
      setProduct({
        ...productData,
        image: `data:${file.type};base64,${btoa(reader.result)}`,
      });
    };
    reader.onerror = () => {
      console.log("error on load image");
    };
  }
  ////*************Delete Image*************
  function handleRemoveImage() {
    setProduct({ ...productData, image: "" });
  }
  //*************Form validation*************
  const schema = yup.object().shape({
    description: yup
      .string()
      .required("Please provide a description for your Product")
      .min(15, "Too Short! description should contain at least 15 characters"),
    nom: yup
      .string()
      .required("Please provide a name for your Product")
      .min(5, "Too Short! name should contain at least 5 characters")
      .max(50, "name Too Long!"),
    quantite: yup
      .number()
      .required("Please provide a quantity for your Product")
      .typeError("Quantity must be a number!"),
    prix: yup
      .number()
      .required("Please provide a price for your Product")
      .typeError("Price must be a number!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  return (
    <div  className="container">
      <ReactNotification />
      <Header />
      <form
        onSubmit={handleSubmit(Submit)}
        noValidate
        autoComplete="off"
        className="add_form"
      >
        <div style={{display:'flex',flexDirection:'row'}}>
        <div >
        {productData.image == "" && (
        <IconButton aria-label="Add photo">
          <FormUploadImage  onChange={handleUploadChange} />
        </IconButton>
        )}
        {productData.image && productData.image !== "" && (
          <div className="relative">
            <img src={productData.image} style={{width:'30%'}} alt="image" />
            <Fab
              className="absolute right-0 bottom-0 m-8"
              variant="extended"
              size="small"
              color="secondary"
              aria-label="Delete Image"
              onClick={handleRemoveImage}
            >
              <DeleteIcon fontSize="small">delete</DeleteIcon>
            </Fab>
          </div>
        )}
        </div>
        </div>
        <div className="fields" style={{display:'flex',flexDirection:'column'}}>
            <div className="card">
            <TextField
                {...register("nom")}
                placeholder="Product Name.."
                multiline
                fullWidth
                rows="3"
                margin="none"
                disableUnderline
                value={productData.nom}
                onChange={(e) =>
                setProduct({ ...productData, nom: e.target.value })
                }
            />
            <p style={{ color: "red", marginLeft: "10px" }}>
                {errors.nom?.message}
            </p>
            </div>
            <div className="card">
            <TextField
                {...register("description")}
                placeholder="Product Description.."
                multiline
                fullWidth
                rows="6"
                margin="none"
                disableUnderline
                value={productData.description}
                onChange={(e) =>
                setProduct({ ...productData, description: e.target.value })
                }
            />
            <p style={{ color: "red", marginLeft: "10px" }}>
                {errors.description?.message}
            </p>
            </div>
            <div className="card">
            <TextField
                {...register("quantite")}
                placeholder="Quantity"
                multiline
                fullWidth
                rows="2"
                margin="none"
                disableUnderline
                value={productData.quantite}
                onChange={(e) =>
                setProduct({ ...productData, quantite: e.target.value })
                }
            />
            <p style={{ color: "red", marginLeft: "10px" }}>
                {errors.quantite?.message}
            </p>
            </div>
            <div className="card">
            <TextField
                {...register("prix")}
                placeholder="Price"
                multiline
                fullWidth
                rows="2"
                margin="none"
                disableUnderline
                value={productData.prix}
                onChange={(e) =>
                setProduct({ ...productData, prix: e.target.value })
                }
            />
            <p style={{ color: "red", marginLeft: "10px" }}>
                {errors.prix?.message}
            </p>
            </div>
        </div>
        
        <div >
          <Button className="btn" aria-label="add" type="submit">
            Edit
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
