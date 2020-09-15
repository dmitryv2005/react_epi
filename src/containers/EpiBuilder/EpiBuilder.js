import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxary/Auxary';
import Epidemiology from '../../components/Epidemiology/Epidemiology';
import BuildControls from '../../components/Epidemiology/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Epidemiology/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class EpiBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('https://react-my-first-project-1679c.firebaseio.com/Itesms.json')
        //     .then(response => {
        //         this.setState({items: response.data})
        //     }).catch(error => {
        //         this.setState({error: true})
        //     });
    }

    updatePurchaseState (items) {
        const sum = Object.keys(items).map(iKey => {
            return items[iKey]
        }).reduce((sum, el) => {
            return sum + el;
        },0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/demo');
    }

    render () {
        const disabledInfo = {
            // ...this.state.items  // redux replacment
            ...this.props.its
        }

        for ( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let epidem = this.state.error ? <p>Items can't be loaded!</p> : <Spinner />;

        if (this.props.its) {
          epidem = (
            <Aux>
              <Epidemiology items={this.props.its} />
              <BuildControls
                itemAdded={this.props.onItemAdded}
                itemRemove={this.props.onItemRemoved}
                disabled={disabledInfo}
                purchasable={this.updatePurchaseState(this.props.its)}
                ordered={this.purchaseHandler}
                value={this.props.price}
              />
            </Aux>
          );
          orderSummary = (
            <OrderSummary
              items={this.props.its}
              value={this.props.price}
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

const mapStateToProps = state =>  {
    return {
        its: state.items,
        price: state.totalPrice
    }
}

const mapDispatchToProps =  dispatch => {
    return {
        onItemAdded: (itName) => dispatch({type: actionTypes.ADD_ITEM, itemName: itName}),
        onItemRemoved: (itName) => dispatch({type: actionTypes.REMOVE_ITEM, itemName: itName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(EpiBuilder, axios));