import React from "react"
import { Title, FormStyled, Input, Button, Label, Box } from './FormStyled'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { selectContacts } from "redux/selectors";
import { addContact } from "redux/operations";
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const scheme = yup.object().shape({
name: yup.string().required("Please enter the contact's name"),
number: yup.number().min(10).required("Please enter the phone number")
})


export const Form = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch()

  const onSubmit = ({name, number}, {resetForm}) =>{
  if (name.trim() === ''|| number.trim() === '') {
    return;
  }
  const contact = {
    name: name.trim(),
    phone: number.trim(),
  };
  const existingContact = contacts.some(({name}) => contact.name.toLowerCase() === name.toLowerCase());
    if (existingContact) {
      toast.info('This contact already exists in the phonebook!');
      return;
    }
  dispatch(addContact({name: name.trim(), phone: number.trim()}))
  resetForm()
}

const notifyError = (msg) => {
  toast.info(msg);
};

    const initialValues = {
      name:"",
      number:""
    }

    return (
      <Box>
        <Title>Phonebook</Title>
        <Formik initialValues={initialValues} validationSchema={scheme} onSubmit={onSubmit}>
          <FormStyled>
            <Label>
              Name
              <Input type="text" name="name" />
              <ErrorMessage name="name" render={msg => notifyError(msg)}/>
            </Label>
            <Label>
              Number
              <Input type="tel" name="number" />
              <ErrorMessage name="number" render={msg => notifyError(msg)}/>
            </Label>
            <Button type="submit">Add Contact</Button>
          </FormStyled>
        </Formik>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Box>
    )}


