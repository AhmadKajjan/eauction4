import React,{useState} from 'react';
import {Form,Button,Container,Alert,Row,Col} from 'react-bootstrap';
import './Signup.styles.scss';
 const handleSubmit=(userName,password,phoneNumber,setErrorMessage,history)=>event=>{
    event.preventDefault();
    
    const url='https://svu-e-auction.herokuapp.com/api/user/register';
    const x =fetch(url, {
     method: "POST",
     headers: {
      
         'Content-Type': 'application/json',
       },
     body: JSON.stringify({
         userName:userName,
         password:password,
         phoneNumber:phoneNumber,         
       })
    });
    const p1=x.then(res=>res.json());
    p1.then(data=>{console.log(data);
        if(data.status!==1)
            setErrorMessage(data.message);
        else 
             history.push('/searchforproducts');
    })
 }
export  default function  Signup({history}){
        const [userName,setUserName]=useState('');
        const [password,setPassword]=useState('');
        const [phoneNumber,setPhoneNumber]=useState('');
        const [errorMessage,setErrorMessage]=useState("");
        return(
            <Container  fluid="md">   
                <Row>
                    <Col xs={8}>      
                        <Form onSubmit={handleSubmit(userName,password,phoneNumber,setErrorMessage,history)}>
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
                        <Form.Group as={Row} controlId="formPlaintextPhoneNumber">
                            <Form.Label column xs="3">
                               Phone Number
                            </Form.Label>
                            <Col xs="9">
                            <Form.Control type="text" onChange={e=>setPhoneNumber(e.target.value)} placeholder="Phone Number" />
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
