import IconButton from '@material-ui/core/IconButton';
import React from 'react';

function FormUploadImage(props) {
	return (
		<div className="main_content">
            <div style={{width:'300px'}}  className="card" >
                <label htmlFor="button-file">
                        <input accept="image/*" style={{visibility: 'hidden'}} id="button-file" type="file" onChange={props.onChange} />
                        <IconButton className="card_img" component="span">
                            <img src="/images/add_image.png" />
                        </IconButton>
                </label>
                <div className="card_header">
                <h2></h2>
                <p></p>
                <p className="price">
                    <span></span>
                </p>
                </div>
            </div>
		</div>
	);
}

export default FormUploadImage;
