import {Text, TextList, Button, Box} from './ContactList-styled'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { selectError, selectIsLoading, selectFilteredContacts } from "redux/selectors";
import { setFilter } from 'redux/filterSlice';
import { deleteContact } from 'redux/operations';
import { useEffect, useState } from 'react';
import { fetchContacts } from 'redux/operations';
import { RotatingLines } from 'react-loader-spinner';

export const ContactLIst = () =>{
  const [deletingContactId, setDeletingContactId] = useState(null);
  const [onDeleting, setOnDeleting] = useState(false);
   const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
      dispatch(fetchContacts());
    }, [dispatch]);

    const contacts = useSelector(selectFilteredContacts)

    const handleDelete = (id) => {
      setDeletingContactId(id);
      setOnDeleting(true)
      dispatch(deleteContact(id))
        .then(() => {
          setDeletingContactId(null);
          setOnDeleting(false)
        })
        .catch(() => {
          setDeletingContactId(null);
          setOnDeleting(false)
        });
    };

return(
<Box>
<h2>Contacts</h2>
   <Text>Find contacts by name</Text>
        <input
        onChange={(e) => dispatch(setFilter(e.target.value))}
          type="text"
          name="filter"
        />
        <TextList>
        {isLoading && !error &&  !onDeleting && <b>Loading...</b> }
        {contacts.map((contact) => (
            <li key={contact.id}> 
              {contact.name} : {contact.phone}
              {deletingContactId === contact.id ?
              <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="15"
                  visible={true}
              /> :  <Button onClick={() => handleDelete(contact.id)}>Delete</Button>}
                
            </li>
          ))}
        </TextList>
</Box>
)
}




