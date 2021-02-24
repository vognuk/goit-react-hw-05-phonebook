import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'
import Heading from './components/Heading'
import Form from './components/Form'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Animation from './components/NotificationNumberExist/Animation.module.css'
import NotificationNumberExist from './components/NotificationNumberExist'

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    sameContact: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevState) {
    const { contacts: nowContacts } = this.state;
    const { contacts: prevContacts } = prevState;
    if (nowContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nowContacts));
    }
  }

  checkContact = (name, number) => {
    const { contacts, sameContact } = this.state;
    if (contacts.some(elem => elem.number === number)) {
      this.setState({ sameContact: true });
      setTimeout(() => {
        this.setState({ sameContact: false });
      }, 1000);

      return;
    } else
      this.addContact(name, number);
  };

  addContact = (name, number) => {
    const contactData = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [contactData, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  filterContacts = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(el =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, name, filter, number, sameContact } = this.state;
    return (
      <div className='container'>
        <div className="heading">
          <Heading />

          <CSSTransition
            in={sameContact}
            timeout={250}
            classNames={Animation}
            unmountOnExit
          >
            <NotificationNumberExist message="The contact is already exists." />
          </CSSTransition>
        </div>

        <Form
          name={name}
          number={number}
          contacts={contacts}
          onChange={this.handleChange}
          onSubmit={this.checkContact}
        ></Form>

        <Filter
          value={filter}
          onChange={this.filterContacts}
        />

        <Contacts
          contacts={this.getVisibleContacts()}
          onDelete={this.deleteContact}
        />
      </div >
    );
  }
}
