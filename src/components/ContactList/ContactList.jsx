import {Text, TextList, Button, Box} from './ContactList-styled'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getContacts, getFilter } from "redux/selectors";
import { setFilter } from 'redux/filterSlice';
import { deleteContact } from 'redux/contactListSlice';

export const ContactLIst = () =>{
   const dispatch = useDispatch()
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter)

      const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()));

return(
<Box>
<h2>Contacts</h2>
   <Text>Find contacts by name</Text>
        <input
        onChange={(e) => dispatch(setFilter(e.target.value))}
          type="text"
          name="filter"
          value={filter}
        />
        <TextList>
          {filteredContacts.map((contact) => (
            <li key={contact.id}> 
              {contact.name} : {contact.number}
              <Button onClick={() => dispatch(deleteContact(contact.id))}>Delete</Button>
            </li>
          ))}
        </TextList>
</Box>
)
}