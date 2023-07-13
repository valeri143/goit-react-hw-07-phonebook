import React, { useState } from "react"
import { Title, FormStyled, Input, Button, Label, Box } from './FormStyled'
import { nanoid } from 'nanoid';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getContacts } from "redux/selectors";
import { addContact } from "redux/contactListSlice";

export const Form = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch()

  const [name, setName] = useState('');
  const [number, setNumber] = useState('')

  const onSubmit = (e) =>{
  e.preventDefault();
  if (name.trim() === ''|| number.trim() === '') {
    return;
  }
  const contact = {
    id: nanoid(),
    name: name.trim(),
    number: number.trim(),
  };
  const existingContact = contacts.some(({name}) => contact.name.toLowerCase() === name.toLowerCase());
    if (existingContact) {
      alert('This contact already exists in the phonebook!');
      return;
    }
  dispatch(addContact(contact))
  setName('');
  setNumber('')
}
  const onChange = (e) => {
  switch (e.target.name) {
    case 'name':
      setName(e.target.value);
      break;
    case 'number':
      setNumber(e.target.value);
      break;
    default:
      console.log(`${e.target.name} does not exist`);
  }
};

   return (
    <Box>
    <Title>Phonebook</Title>
    <FormStyled onSubmit={onSubmit}>
        <Label>
        Name
   <Input
   onChange={onChange}
    type="text"
    name="name"
    value={name}
    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    required
  />
  </Label>
  <Label>
  Number
  <Input
    onChange={onChange}
  type="tel"
  name="number"
  value={number}
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
/>
  </Label>
  <Button>Add Contact</Button>
   </FormStyled>
    </Box>
   )}
