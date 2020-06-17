import React from 'react';
import Header from './components/header/Header.component';
import {Route,Switch} from 'react-router-dom';
import Login from './pages/login/Login.component';
import Signup from './pages/signup/signup.components';
import AddProduct from './pages/addprodcut/addProduct.compnent';
import ShowUserProducts from './pages/showUserProduct/showuserproduct.components';
import SearchForProduct from './pages/searchForProject/searchforproduct.components';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header history/>
      <div className="after-header">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/addnewproduct" component={AddProduct}/>
        <Route exact path="/myproduct" component={ShowUserProducts}/>
        <Route exact path="/searchforproducts" component={SearchForProduct}/>
      </Switch>
      </div>
    </div>
  );
}

export default App;
