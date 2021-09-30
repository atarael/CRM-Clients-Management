
import React from "react";
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { withRouter } from "react-router-dom";
function mapStateToProps(state) {
  // ;
  return {
    product: state.productReducer.product
  };
}

const mapDispatchToProps = (dispatch) => ({
  setInsuranceId: (insurance_Id) => dispatch(actions.setInsuranceId(insurance_Id)),
  setInsuranceName: (insurance_Name) => dispatch(actions.setInsuranceName(insurance_Name)),
  setInsuranceDescription: (Insurance_Description) => dispatch(actions.setInsuranceDescription(Insurance_Description)),
  setInsurancePrice: (insurance_Price) => dispatch(actions.setInsurancePrice(insurance_Price)),
  setInsurancePicture: (insurance_Picture) => dispatch(actions.setInsurancePicture(insurance_Picture))

})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(function ProductCard(props) {
  const { IdProduct, description, name, price, picture } = props;
  function clickProduct() {

    props.history.push("/admin/products/" + IdProduct);
    props.setInsuranceName(name);
    props.setInsuranceDescription(description);
    props.setInsurancePrice(price);
    props.setInsurancePicture(picture);
    props.setInsuranceId(IdProduct);
  }


  return (
    <Card className="shadow-lg" onClick={clickProduct} style={{ width: '17rem', height: '27rem', margin: '1rem' }}>
      <p></p>
      <Card.Img variant="top" style={{ width: '6rem', position: 'relative', left: '100px' }} src={picture} />

      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
      <Card.Footer >
        <small style={{ color: 'green' }} >Price: starting from {price} ILS per month</small>
      </Card.Footer>
    </Card>
  );
})
)