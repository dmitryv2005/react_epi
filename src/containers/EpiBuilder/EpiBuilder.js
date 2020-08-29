import React, { Component } from 'react';

import Aux from '../../hoc/Auxary/Auxary';
import Epidemiology from '../../components/Epidemiology/Epidemiology';
import BuildControls from '../../components/Epidemiology/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Epidemiology/OrderSummary/OrderSummary';

const ITEMS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class EpiBuilder extends Component {
    state = {
        items: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 1
        },
        totalPrice: 4,
        purchasable: true,
        purchasing: false
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
        alert('Temporary continue');
    }

    render () {
        const disabledInfo = {
            ...this.state.items
        }

        for ( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
          <Aux>
            <Modal
              show={this.state.purchasing}
              modalClosed={this.purchaseCancelHandler}
            >
              <OrderSummary 
                    items={this.state.items} 
                    value={this.state.totalPrice}
                    generationCancelled={this.purchaseCancelHandler}
                    generationContinued={this.purchaseContinueHandler}/>
            </Modal>
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
    }
}

export default EpiBuilder;