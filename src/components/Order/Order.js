import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    let dt = new Date(props.currDate);
    // console.log(props.orderInfo);

    const items  = [];

    for (let itemName in props.items) {
      items.push({ name: itemName, amount: props.items[itemName] });
    }

    const itemOutput = items.map((item) => {
      return (
        <span
          style={{
            textTrasform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px",
          }}
          key={item.name}
        >
          {item.name} ({item.amount})
        </span>
      );
    });

    return (
    <div className={classes.Order}>
        <p>{dt.toDateString()} {dt.toLocaleTimeString('en-US', { hour12: false })}</p>
        <p>Items: {itemOutput}</p>
        <p>Price:  <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    )
}

export default order;