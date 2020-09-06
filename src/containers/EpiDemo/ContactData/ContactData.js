import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: ''
        },
        currentDate: '',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const currentDate = new Date();
        // console.log(this.props.items);
        this.setState({loading: true});
        const order = {
            items: this.props.items,
            price: this.props.price,
            customer: {
                name: 'Max Sh',
                adress: {
                    street: 'Test Stree1',
                    zipCode: '34655',
                    country: 'USA'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'faster',
            currentDate: currentDate
        }
        axios
          .post("/orders.json", order)
          .then((response) => {
            this.setState({ loading: false });
            this.props.history.push('/');
            // console.log(response))
          })
          .catch((error) => {
            this.setState({ loading: false });
            // console.log(error))
          });
    }

    render() {
        let form = (
          <form>
            <input type="text" name="name" placeholder="Your Name" />
            <input type="text" name="email" placeholder="Your email" />
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="zip" placeholder="Zip Code" />
            <Button btnType="Success" clicked={this.orderHandler}>
              ORDER
            </Button>
          </form>
        );

        if (this.state.loading) {
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

export default ContactData;