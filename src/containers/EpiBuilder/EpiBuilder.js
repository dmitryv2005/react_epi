import React, { Component } from 'react';

import Aux from '../../hoc/Auxary/Auxary';
import Epidemiology from '../../components/Epidemiology/Epidemiology';
import BuildControls from '../../components/Epidemiology/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Epidemiology/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const ITEMS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class EpiBuilder extends Component {
    state = {
        // items: {
        //     salad: 1,
        //     bacon: 1,
        //     cheese: 2,
        //     meat: 1
        // },
        itesm: null,
        totalPrice: 4,
        purchasable: true,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-my-first-project-1679c.firebaseio.com/Itesms.json')
            .then(response => {
                this.setState({items: response.data})
            }).catch(error => {
                this.setState({error: true})
            });
    }

    updatePurchaseState (items) {
        const sum = Object.keys(items).map(iKey => {
            return items[iKey]
        }).reduce((sum, el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0});
    }

    addItemHandler = (type) => {
        const oldCount = this.state.items[type];
        const updateCount = oldCount + 1;
        const updatedItems = { 
            ...this.state.items
        }
        updatedItems[type] = updateCount;
        const priceAddition = ITEMS_PRICES[type];
        const oldValue = this.state.totalPrice;
        const newValue = oldValue + priceAddition;
        this.setState({totalPrice: newValue, items: updatedItems});
        this.updatePurchaseState(updatedItems);
    }

    removeItemHandler = (type) => {
        const oldCount = this.state.items[type];
        if(oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatedItems = { 
            ...this.state.items
        }
        updatedItems[type] = updateCount;
        const priceDeduction = ITEMS_PRICES[type];
        const oldValue = this.state.totalPrice;
        const newValue = oldValue - priceDeduction;
        this.setState({totalPrice: newValue, items: updatedItems});
        this.updatePurchaseState(updatedItems);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.items) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.items[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/demo', 
            search: '?' + queryString
        });

    }

    render () {
        const disabledInfo = {
            ...this.state.items
        }

        for ( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let epidem = this.state.error ? <p>Items can't be loaded!</p> : <Spinner />;

        if (this.state.items) {
          epidem = (
            <Aux>
              <Epidemiology items={this.state.items} />
              <BuildControls
                itemAdded={this.addItemHandler}
                itemRemove={this.removeItemHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                value={this.state.totalPrice}
              />
            </Aux>
          );
          orderSummary = (
            <OrderSummary
              items={this.state.items}
              value={this.state.totalPrice}
              generationCancelled={this.purchaseCancelHandler}
              generationContinued={this.purchaseContinueHandler}
            />
          );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
          <Aux>
            <Modal
              show={this.state.purchasing}
              modalClosed={this.purchaseCancelHandler}
            >
              {orderSummary}
            </Modal>
            {epidem}
          </Aux>
        );
    }
}

export default withErrorHandler(EpiBuilder, axios);