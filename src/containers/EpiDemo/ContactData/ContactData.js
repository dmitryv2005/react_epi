import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Street'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Zip Code'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
            isNumeric: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Country'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your e-mail'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                {values: 'fastest', displayValue: 'Fastest'},
                {values: 'chepest', displayValue: 'Chepest'},
                {values: 'Best Available', displayValue: 'Best available'},
                ]
        },
        validation: {
            // required: false
        },
        value: 'fasters',
        valid: true
      },
      currentDate: {
        elementType: 'date',
        elementConfig: {
            type: 'date',
            placeholder: 'Current Date and Time'
        },
        validation: {
            required: false
        },
        value: '',
        valid: true
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const currentDate = new Date();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
        if( formElementIdentifier === 'currentDate' ) {
            formData[formElementIdentifier] = currentDate;
        } else {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
    }

    const order = {
      items: this.props.its,
      price: this.props.price,
      orderInfo: formData,
      currentDate: currentDate,
     };

     this.props.onOrderEpi(order);
  };

  checkValidity(value, rules) {
    let isValid = true;
    if(!rules) {
        return true;
    }

    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
  } 

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);

    const updatedOrderForm = {
        ...this.state.orderForm
    };
    const updatedFormElement = { 
        ...updatedOrderForm[inputIdentifier] 
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
// console.log(updatedFormElement);
    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    const formElementArray = [];

    for(let key in this.state.orderForm) {
        formElementArray.push( { 
            id: key,
            config: this.state.orderForm[key]
        });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
            <Input
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))}
        {/* <Button btnType="Success" clicked={this.orderHandler}> */}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    its: state.epiBuilder.items,
    price: state.epiBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderEpi: (orderData) => dispatch(actions.epidemiology(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));