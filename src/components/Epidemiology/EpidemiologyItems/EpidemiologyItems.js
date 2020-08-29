import React , { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './EpidemiologyItems.module.css'

class EpidemiologyItem extends Component {
    render () {
    let item = null;

    switch (this.props.type) {
      case "layout-footer":
        item = <div className={classes.LayoutFooter}></div>;
        break;
      case "layout-header":
        item = (
          <div className={classes.LayoutHeader}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        item = <div className={classes.Meat}></div>;
        break;
      case "cheese":
        item = <div className={classes.Cheese}></div>;
        break;
      case "bacon":
        item = <div className={classes.Bacon}></div>;
        break;
      case "salad":
        item = <div className={classes.Salad}>  </div>;
        break;
      default: 
        item = null;
    }
    return item;
  }
};

EpidemiologyItem.propTypes = {
    type: PropTypes.string.isRequired
}

export default EpidemiologyItem;