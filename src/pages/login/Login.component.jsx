import React,{useState} from 'react';
import {connect} from 'react-redux';
import {setCurrentUser,setCurrentUserProducts,setCurrentUserID} from '../../redux/user/user.action';
import {Form,Button,Container,Row,Col,Alert} from 'react-bootstrap';
import './Login.styles.scss';
 const handleSubmit=(userName,password,setCurrentUser,setCurrentUserProducts,setCurrentUserID,setErrorMessage,history)=>event=>{
     event.preventDefault();
    const x =fetch('https://svu-e-auction.herokuapp.com/api/user/login', {
     method: "POST",
     headers: {
         'Content-Type': 'application/json',
       },
     body: JSON.stringify({
         userName:userName,
         password:password,         
       })
    });
    const p1=x.then(res=>res.json());
    p1.then(data=>{console.log(data);
        if(data.status!==1)
            setErrorMessage(data.message);
        else{
        setCurrentUser(data.data.userName);
        setCurrentUserProducts(data.data.products);
        setCurrentUserID(data.data._id);
        history.push('/searchforproducts');}
    });
 }
const Login=({setCurrentUser,setCurrentUserProducts,setCurrentUserID,history})=>{
        const [userName,setUserName]=useState("");
        const [password,setPassword]=useState("");
        const [errorMessage,setErrorMessage]=useState("");
        return(
            <Container  fluid="md">   
                <Row>
                    <Col xs={8}>      
                        <Form onSubmit={handleSubmit(userName,password,setCurrentUser,setCurrentUserProducts,setCurrentUserID,setErrorMessage,history)}>
                        <Form.Group as={Row} controlId="formPlaintextUserName">
                            <Form.Label column xs="3">
                                User Name
                            </Form.Label>
                            <Col xs="9">
                            <Form.Control type="text" onChange={e=>setUserName(e.target.value)} placeholder="User Name" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column xs="3">
                            Password
                            </Form.Label>
                            <Col xs="9">
                            <Form.Control type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col xs="10">
                            </Col>
                            <Button variant="primary"  xs="2" className="submit-button" type="submit">
                                    Submit
                            </Button>
                        </Row>
                        </Form>
                        {
                            errorMessage===""?
                            null:
                            <Alert variant="danger">
                                {errorMessage}
                            </Alert>
                        }
                    </Col>
        
                </Row>
            </Container>  
        )
}
const mapDispatchToProps=dispatch=>({
    setCurrentUser:user=>dispatch(setCurrentUser(user)),
    setCurrentUserProducts:products=>dispatch(setCurrentUserProducts(products)),
    setCurrentUserID:id=>dispatch(setCurrentUserID(id)),
})
export default connect(null,mapDispatchToProps)(Login);