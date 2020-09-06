import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                // console.log(res);
                const fetchOrders = [];
                for(let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key 
                    });
                    // console.log(key);
                }
                this.setState({loading: false, orders: fetchOrders})
            })
            .catch(err => { 
                this.setState({loading: false})
            });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order  key={order.id}
                            items={order.items} 
                            price={order.price} 
                            currDate={order.currentDate} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);