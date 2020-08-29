import React from 'react';

import classes from './Epidemiology.module.css';
import EpiItem from './EpidemiologyItems/EpidemiologyItems';

const epidemiology = (props) => {
    let transformItems = Object.keys(props.items)
        .map(itemKey => {
            // console.log(props.items[itemKey]);
            // console.log(Array(props.items[itemKey]));
            return [...Array(props.items[itemKey])].map((_, i) => {
                // console.log(i);
                return <EpiItem key={itemKey + i} type={itemKey} />; 
            });
        })
        .reduce((arr,el) => {
            return arr.concat(el);
        }, []);

    if (transformItems.length === 0) {
        transformItems = <p>Please add anything</p>
    }

    return (
        <div className={classes.Epidemiology}>
            <EpiItem type="layout-header" />
            {transformItems}
            <EpiItem type="layout-footer" />
        </div>
    );
}

export default epidemiology;