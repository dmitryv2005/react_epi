import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import EpiDemoSummary from '../../components/Order/EpiDemoSummary/EpiDemoSummary';
import ContactData from './ContactData/ContactData';

class EpiDemo extends Component {
 
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
              items={this.props.its}
              demoCancelled={this.demoCancelledHandler}
              demoContinued={this.demoContinuedHandler}
            />
            <Route
              path={this.props.match.path + "/items-data"}
              component={ContactData}
            />
          </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    its: state.items
  }
}

export default connect(mapStateToProps)(EpiDemo);