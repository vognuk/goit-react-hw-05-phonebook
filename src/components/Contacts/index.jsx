import React, { Component } from 'react'
import s from './Contacts.module.css'
import ContactsAnimation from './ContactsAnimation.module.css'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class Contacts extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    children: PropTypes.element,
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };

  state = {

  }

  render() {
    const { contacts, onDelete, children } = this.props;

    return (<div>
      <TransitionGroup
        component="ul"
        className={s.list}
      >
        {contacts.map((el, id) => (
          <CSSTransition
            key={id}
            timeout={250}
            classNames={ContactsAnimation}
          >
            <li className={s.item} key={id}>
              {`${el.name}: ${el.number}`}
              <button
                className={s.button}
                onClick={() => { onDelete(el.id); }}
              >
                Delete
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {children}
    </div>
    );
  };
};

export default Contacts;
