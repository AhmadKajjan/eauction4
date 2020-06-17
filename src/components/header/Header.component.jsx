import React from 'react';
import {Navbar,Carousel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './Header.styles.scss';
import image1 from '../../contant/item1.jpg';
import image2 from '../../contant/item2.jpg';
import image3 from '../../contant/item3.jpg';
import { withRouter } from 'react-router-dom';
import {setCurrentUser,setCurrentUserProducts,setCurrentUserID} from '../../redux/user/user.action';

const handelLogout=(setCurrentUser,setCurrentUserProducts,setCurrentUserID,history)=>{
    setCurrentUser("");
    setCurrentUserID("");
    setCurrentUserProducts([]);
    history.push('/');
}
const Header=({currentUser,setCurrentUser,setCurrentUserProducts,setCurrentUserID,history})=>(
    <div>
        <Navbar bg="light"  bg="primary" variant="dark" expand="lg" className="navbar">
            <Navbar.Brand href="#home" className="brand">E_Auction</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {console.log(currentUser),
                    currentUser === "" ?
                        <Link className="link btn" to="/login">Login</Link>:
                        <Link className="link btn"onClick={e=>{handelLogout(setCurrentUser,setCurrentUserProducts,setCurrentUserID,history)}}>Logout</Link>
                    }
                    <Link className="link btn" to="/signup">SignUp</Link>
                    {
                        currentUser !== "" ?
                        <div>
                            <Link className="link btn" to="/addnewproduct">Add New Product</Link>
                            <Link className="link btn"to="/myproduct">My Product</Link>
                            <Link className="link btn" to="/searchforproducts">Search For Products</Link>
                        </div>:null
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      height="400px"
      src={image1}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      height="400px"
      src={image2}
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 image-responsive"
      height="400px"
      src={image3}
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
    </div>
)
const mapStateToProps=state=>({
    currentUser:state.user.currentUser,
})
const mapDispatchToProps=dispatch=>({
    setCurrentUser:user=>dispatch(setCurrentUser(user)),
    setCurrentUserProducts:products=>dispatch(setCurrentUserProducts(products)),
    setCurrentUserID:id=>dispatch(setCurrentUserID(id)),
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));