import React from "react"
import s from './NotificationNumberExist.module.css'


const NotificationNumberExist = ({ message }) => {
    return (<p className={s.card}>{message}</p>);
};

export default NotificationNumberExist;
