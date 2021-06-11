import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import MainContent from './components/mainContent';
import AddProduct from './components/addProduct';

function App() {
  return (
    <div >
        <Router>
          <Fragment>
            <Switch>
              <Route path='/' exact component={MainContent}/>
              <Route path='/new' component={AddProduct}/>
            </Switch>
          </Fragment>
        </Router>
    </div>
  );
}

export default App;
