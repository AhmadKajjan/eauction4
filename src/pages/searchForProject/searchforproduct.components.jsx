import React from 'react';
import {connect} from 'react-redux';
import {Button,Form,Row,Col,Card,CardDeck ,Table,Alert} from 'react-bootstrap';
import './searchforproducts.styles.scss';

class SearchForProduct extends React.Component{
  
    constructor(props)
    {
        super(props);
        
        this.state={
            products:[],
            searchField:'',
            bidField:'',
            errorMessage:'',
        }
    }
    handelSearch=()=>{
            const x=fetch("http://localhost:8000/api/product/search/"+this.props.currentUserID+"/"+this.state.searchField);
            const p1=x.then(res=>res.json());
            p1.then(data=>{console.log(data);this.setState({...this.state,products:data.data})});
    }
    addNewBid= async (productId)=>{
        var status;
            const x = await fetch('http://localhost:8000/api/bidoffer/bidFor', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user:this.props.currentUserID,
                        product:productId,
                        offeredPrice:parseInt(this.state.bidField),         
                    })
                    }).then(res=>res.json()).then(data=>status=data.status);
                
        if(status===1)
        {
            this.setState({product:[],bidField:'',errorMessage:''})
            this.handelSearch();
        }
        else 
            this.setState({...this.state,bidField:'',errorMessage:'something went wrong'});
    }
    render(){
        return(
            <div>
            {
                this.props.currentUserID===""?
                <div>
                { this.props.history.push('/')}
                </div>:
            <div>
                <Row>
                    <div>
                        {
                            this.state.errorMessage!==''?
                            <Alert variant={"danger"}>{this.state.errorMessage}</Alert>:
                            null
                        }
                    </div>
                </Row>
                <Row>
                    <Col xs="2" sm="3" md="4">
                    </Col>
                    <Col xs="2" sm="3" md="4">
                    <Form.Group as={Row} controlId="searchField">
                         
                            <Col xs="10">
                                <Form.Control type="text" value={this.state.searchField} onChange={e=>this.setState({...this.state,searchField:e.target.value})} placeholder="Search" />
                            </Col>
                            <Col xs="2">
                               <Button variant="primary" className="btn btn-primary" onClick={e=>{this.handelSearch()}} >
                                    Search
                               </Button>
                            </Col>
                            
                        </Form.Group>
                    </Col>
                </Row>
                <div>
                 <CardDeck > {            
             this.state.products.length>0?
                    this.state.products.map(item=>(
                        <Col xs="12" sm="6" md="4" >
                            <Card className="text-center cardClass"   key={item._id }>
                                <Card.Header>
                                    <h3>Product Name : {item.productName}</h3>
                                    <h5>Owner : {item.user.userName}</h5>
                                    <h6>initial price : {item.initialPrice}</h6>
                                    <h6>Max Bid Offer : {item.maxOfferedPrice}</h6>            
                                </Card.Header>
                                <Card.Body className="cardbodyClass">
                                    <Card.Title>bids on product</Card.Title>
                                    <Card.Text>
                                        <div className="showBids">
                                            {
                                                item.bidOffers.length>0?
                                                <Table striped bordered hover size="sm">
                                                <thead>
                                                <tr>
                                                    <th>offerd by</th>
                                                    <th>offered price</th>
                                                </tr>
                                                </thead>
                                                <tbody>{
                                                    item.bidOffers.map(bid=>
                                                <tr>
                                                        <td>{bid.user.userName}</td>
                                                        <td>{bid.offeredPrice}</td>
                                                    
                                                </tr>
                                                    )}
                                                </tbody>
                                            </Table>:
                                            <p>
                                                no bids  yet
                                            </p>
                                                
                                            }
                                        </div>
                                    </Card.Text>
                                   
                                </Card.Body>
                                <Card.Footer className="text-muted"> {
                                    <Form onSubmit={e=>{
                                        if(item.maxOfferedPrice>parseInt(this.state.bidField,10))
                                            this.setState({...this.state,errorMessage:'your bid offer should be more than '+item.maxOfferedPrice})
                                        else  
                                            this.addNewBid(item._id,this.setState);}}>
                                        <Form.Group as={Row} controlId="searchField" >
                                           <Col xs="8">
                                                 <Form.Control type="Number"  onChange={e=>this.setState({...this.state,bidField:e.target.value})} placeholder="bid now" />
                                            </Col>
                                            <Col>
                                            <Button variant="primary" type="submit" >add Bid</Button>
                                             </Col>
                                        </Form.Group>
                                    </Form>
                                    }</Card.Footer>
                                </Card>
                            </Col>
                    ))
                    :null
                    }
                    </CardDeck>       
                </div>
             </div>
            }
            </div>
        )
    }
}
const mapStateToProps=state=>({
    currentUserID:state.user.currentUserID,
})
export default connect(mapStateToProps,null)(SearchForProduct);