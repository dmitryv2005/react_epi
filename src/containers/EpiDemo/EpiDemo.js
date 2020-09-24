import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to="/" />
        if (this.props.its) {
          const initRedirect = this.props.inited  ? <Redirect to="/"/> : null;
          summary = (
            <div>
              {initRedirect}
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

        return summary;
    }
}

const mapStateToProps = state => {
  return {
    its: state.epiBuilder.items,
    inited: state.order.initialaized
  }
}

export default connect(mapStateToProps)(EpiDemo);