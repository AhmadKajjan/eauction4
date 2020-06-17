import React from 'react';
import {connect} from 'react-redux';
import {Button,Container,Row,Col,Card,CardDeck ,Table} from 'react-bootstrap';
import './showuserproduct.styles.scss';

class ShowUserProducts extends React.Component{
  
    constructor(props)
    {
        super(props);
        
        this.state={
            products:[],
        }
    }
    componentDidMount()
    {
        if(this.props.currentUserID!==""){
            const x=fetch("https://svu-e-auction.herokuapp.com/api/product/userproducts/"+this.props.currentUserID);
            const p1=x.then(res=>res.json());
            p1.then(data=>{this.setState({products:data.data});
        });
        }
    }
    handelClick=(productID)=>
    {
        const x =fetch('https://svu-e-auction.herokuapp.com/api/product/sold/'+productID);
    }
    render(){
        return(
            <div>
            {
                this.props.currentUserID===""?
                <div>
                { this.props.history.push('/')}
                </div>:
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
                                        item.isSold===false && item.bidOffers.length>0?
                                        <Button variant="primary" onClick={ e=>  this.handelClick(item._id) }>sell it</Button>
                                        :null
                                    }</Card.Footer>
                                </Card>
                            </Col>
                    ))
                    :null
                    }
                    </CardDeck>   
                }
                </div>    
        )
    }
}
const mapStateToProps=state=>({
    currentUserID:state.user.currentUserID,
})
export default connect(mapStateToProps,null)(ShowUserProducts);