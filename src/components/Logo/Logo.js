import React from 'react';

import epiLogo from '../../assests/images/epi.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={epiLogo} alt="Epi Logo" />
    </div>
);

export default logo;