import React from 'react';
import classes from './Table.module.css';

console.log(classes.Table);

const table = (props:any) => (
    <p className={classes.Table}>Table</p>
);

export default table;