import React from 'react';

import Epidemiology from '../../Epidemiology/Epidemiology';
import Button from '../../UI/Button/Button';
import classes from './EpiDemoSummary.module.css';

const epiDemoSummary = (props) => {
    return (
        <div className={classes.EpiDemoSummary}>
            <h1>We hope it is a good DEMO!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Epidemiology items={props.items}/>
            </div>
            <Button btnType="Danger" clicked={props.demoCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.demoContinued}>Continue</Button>
        </div>
    )
} 

export default epiDemoSummary;