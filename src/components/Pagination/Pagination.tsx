import React from 'react';
import classes from './Pagination.module.css';

const classesArray = [classes.Pagination, classes.PaginationNumber].join(' ');
const pagination = (props: any) => (
    <div className={classesArray}>
        <ul>
            {props.items.map((item:any) => (
                <li
                    key={item}
                    className={item===props.active ? classes.active :  classes.inactive}
                    onClick={(ev)=>props.clicked(item)}
                >
                    {item}
                </li>
            ))}

        </ul>
    </div>
);

export default pagination;
