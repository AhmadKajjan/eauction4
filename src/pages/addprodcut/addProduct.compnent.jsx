import React,{useState} from 'react';
import {connect} from 'react-redux';
import {Form,Button,Container,Row,Col,Alert} from 'react-bootstrap';
import './addProduct.stayles.scss';
 const handleSubmit=(productName,initialPrice,currentUserID,setErrorMessage,history)=>event=>{
     event.preventDefault();
     console.log(currentUserID);
     const userData={
         _id:currentUserID
     }
     console.log(userData);
    const x =fetch('https://svu-e-auction.herokuapp.com/api/product/store', {
     method: "POST",
     headers: {
         'Content-Type': 'application/json',
       },
     body: JSON.stringify({
         productName:productName,
         initialPrice:initialPrice,
         user:userData        
       })
    });
    const p1=x.then(res=>res.json());
    p1.then(data=>{console.log(data);
        if(data.status!==1)
            setErrorMessage(data.message);
        else 
        history.push('/myproduct');
    });
 }
const AddProduct=({currentUserID,history})=>{
        const [productName,setProductName]=useState("");
        const [initialPrice,setInitialPrice]=useState("");
        const [errorMessage,setErrorMessage]=useState("");
        return(
            <div>
            {
                currentUserID===""?
                <div>
                { history.push('/')}
                </div>:
            <Container  fluid="md">   
                <Row>
                    <Col xs={8}>      
                        <Form onSubmit={handleSubmit(productName,initialPrice,currentUserID,setErrorMessage,history)}>
                        <Form.Group as={Row} controlId="formPlaintextUserName">
                            <Form.Label column xs="3">
                                Product Name
                            </Form.Label>
                            <Col xs="9">
                            <Form.Control type="text" onChange={e=>setProductName(e.target.value)} placeholder="Product Name" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column xs="3">
                            Inital Price
                            </Form.Label>
                            <Col xs="9">
                            <Form.Control type="Number" onChange={e=>setInitialPrice(e.target.value)} placeholder="Initial price" />
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
                    }
         </div>
        )
}
const mapStateToProps=state=>({
  currentUserID:state.user.currentUserID,
})
export default connect(mapStateToProps,null)(AddProduct);