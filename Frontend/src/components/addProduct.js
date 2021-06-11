import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { TextField , Button} from "@material-ui/core";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import UploadDropZone from "@rpldy/upload-drop-zone";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router';

export default function AddProduct() {
  const filterBySize = (file) => {
    //filter out images larger than 5MB
    return file.size <= 5242880;
  };
  const [productData, setProduct] = useState({
    nom: "",
    description: "",
    image: "",
    quantite: "",
    prix: "",
  });
  const history = useHistory();
  //*************add Product*************
  const Submit = e => {
        axios.post("http://localhost:4000/product",productData)
              .then(function (response) {
                setProduct(response.data);
                history.push('/');
              });
  };
  //*************Form validation*************
	const schema = yup.object().shape({
		description: yup
			.string()
			.required('Please provide a description for your Product')
			.min(15, 'Too Short! description should contain at least 15 characters'),
		nom: yup
			.string()
			.required('Please provide a name for your Product')
			.min(5, 'Too Short! name should contain at least 5 characters')
			.max(50, 'name Too Long!'),
        quantite: yup
            .number()
			.required('Please provide a quantity for your Product')
            .typeError('Quantity must be a number!'),
        prix: yup
            .number()
			.required('Please provide a price for your Product')
            .typeError('Price must be a number!'),
	});
  const {
    register,
    handleSubmit,
    formState: { errors }
        } = useForm({ resolver: yupResolver(schema) });
  return (
    <div className="container">
      <Header />
      <form onSubmit={handleSubmit(Submit)} noValidate autoComplete="off" className="add_form">
        <div className="card">
          <TextField
            {...register('nom')}
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
          <p style={{ color: 'red', marginLeft:'10px' }}>{errors.nom?.message}</p>
        </div>
        <div className="card">
          <TextField
            {...register('description')}
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
          <p style={{ color: 'red', marginLeft:'10px' }}>{errors.description?.message}</p>
          {/* <Uploady
            destination={{ url: "my-server.com/upload" }}
            fileFilter={filterBySize}
            accept="image/*"
          >
            <UploadDropZone destination={{ headers: { "x-test": "1234" } }}>
              <h3>Drop Images Here</h3>
            </UploadDropZone>
            <UploadPreview />
          </Uploady> */}
        </div>
        <div className="card">
            <TextField
                {...register('quantite')}
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
          <p style={{ color: 'red', marginLeft:'10px'}}>{errors.quantite?.message}</p>
        </div>
        <div className="card">
            <TextField
                {...register('prix')}
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
          <p style={{ color: 'red', marginLeft:'10px'}}>{errors.prix?.message}</p>
        </div>
        <div className="p-8">
            <Button
              className="btn"
              aria-label="add"
              type="submit"
            >
              Add
            </Button>
          </div>
      </form>
      <Footer />
    </div>
  );
}
