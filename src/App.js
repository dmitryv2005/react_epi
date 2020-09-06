import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import EpiBuilder from './containers/EpiBuilder/EpiBuilder';
import EpiDemo from './containers/EpiDemo/EpiDemo';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/demo" component={EpiDemo} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={EpiBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
