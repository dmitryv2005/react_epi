import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import EpiDemoSummary from '../../components/Order/EpiDemoSummary/EpiDemoSummary';
import ContactData from './ContactData/ContactData';

class EpiDemo extends Component {
    state = {
        items: null,
        price: 0
    }

    UNSAFE_componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const items = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['item1', '1']
            if(param[0] === 'price') {
                price = param[1];
            } else {
                items[param[0]] = +param[1];
            }
        }
        this.setState({items: items, totalPrice: price});
    }

    demoCancelledHandler = () => {
        this.props.history.goBack();
    } 

    demoContinuedHandler = () => {
        this.props.history.replace('/demo/items-data');
    } 

    render() {
        return (
          <div>
            <EpiDemoSummary
              items={this.state.items}
              demoCancelled={this.demoCancelledHandler}
              demoContinued={this.demoContinuedHandler}
            />
            <Route
              path={this.props.match.path + "/items-data"}
              render={(props) => (
                <ContactData
                  items={this.state.items}
                  price={this.state.totalPrice}
                  {...props}
                />
              )}
              //   component={ContactData}
            />
          </div>
        );
    }
}

export default EpiDemo;