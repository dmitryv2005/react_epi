import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Epi Builder</NavigationItem>
        <NavigationItem link="/">Check it out</NavigationItem>
    </ul>
);

export default navigationItems;