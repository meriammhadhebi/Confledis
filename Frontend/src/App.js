import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import MainContent from './components/mainContent';
import AddProduct from './components/addProduct';
import EditProduct from './components/EditProduct';
import DetailsProduct from './components/DetailsProduct';

function App() {
  return (
    <div >
        <Router>
          <Fragment>
            <Switch>
              <Route path='/' exact component={MainContent}/>
              <Route path='/new' component={AddProduct}/>
              <Route path='/edit/:id' component={EditProduct}/>
              <Route path='/details/:id' component={DetailsProduct}/>
            </Switch>
          </Fragment>
        </Router>
    </div>
  );
}

export default App;
