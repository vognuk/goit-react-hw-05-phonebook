import React from "react"
import { CSSTransition } from 'react-transition-group'
import s from './Heading.module.css'
import HeadingAnimation from './HeadingAnimation.module.css'

const Heading = () => {
    return (
        <CSSTransition
            in={true}
            appear={true}
            classNames={HeadingAnimation}
            timeout={500}
            unmountOnExit
        >
            <h1 className={s.title}>Phonebook</h1>
        </CSSTransition>
    );
};

export default Heading;
