import React from "react";

import Aux from "../../../hoc/Auxary/Auxary";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const itemsSummary = Object.keys(props.items)
    .map( iKey => {
    return (
      <li key={iKey}>
        <span style={{ textTransform: 'capitalize' }}>{iKey}</span>: {props.items[iKey]}
      </li>);
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Epidemiology that contains the following items:</p>
      <ul>
        {itemsSummary}
      </ul>
      <p><strong>Total: ${props.value.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.generationCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.generationContinued}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;
