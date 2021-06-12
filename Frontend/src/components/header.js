import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function Header() {
  return (
    <>
      <nav>
        <div className="logo">Confledis.</div>
        <ul>
          <li>Home</li>
          <li>Our Products</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
        <div >
          <i className="fa fa-search"></i>
          <i className="fa fa-shopping-basket"></i>
        </div>
      </nav>
    </>
  );
}
