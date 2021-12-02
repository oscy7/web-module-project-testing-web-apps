import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    //Arrange
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    //Arrange
    render(<ContactForm/>)
    //Act
    const contactHeader = screen.queryByText(/Contact Form/i);
    //Assert
    expect(contactHeader).toBeInTheDocument();
    expect(contactHeader).toBeTruthy();
    expect(contactHeader).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange
    render(<ContactForm/>)
    //Act
    const oneError = screen.getByLabelText(/First Name*/i);
    //Assert
    userEvent.type(oneError, '123');
    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //Arrange
    render(<ContactForm/>)
    //Act
    const threeError = screen.getByRole('button');
    userEvent.click(threeError);
    //Assert
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //Arrange
    render(<ContactForm/>)
    //Act
    const firstN = screen.getByLabelText(/first name*/i);
    userEvent.type(firstN, '123456')
    const lastN = screen.getByLabelText(/last name*/i);
    userEvent.type(lastN, '123456');
    const myButton = screen.getByRole('button');
    userEvent.click(myButton);

    const errorMessage = await screen.getAllByTestId('error');
    //Assert
    expect(errorMessage).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    //Arrange
    render(<ContactForm/>)
    //Act
    const myEmail = screen.getByLabelText(/email*/i);
    userEvent.type(myEmail, 'myemail@email');

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
    //Assert
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    //Arrange
    render(<ContactForm/>)
    //Act
    const myButton = screen.getByRole('button');
    userEvent.click(myButton);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    //Assert
    expect(errorMessage).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //Arrange
    render(<ContactForm/>)
    //Act
    const firstN = screen.getByLabelText(/first name*/i);
    const lastN = screen.getByLabelText(/last name*/i);
    const myEmail = screen.getByLabelText(/email*/i);

    userEvent.type(firstN, 'mynameisthis');
    userEvent.type(lastN, 'thisismylastname');
    userEvent.type(myEmail, 'thisemail@email.com');

    const pressButton = screen.getByRole('button');
    userEvent.click(pressButton);
    //Assert a negative test

    await waitFor(() => {
        const showFirstName= screen.queryByText('mynameisthis')
        const showLastName = screen.queryByText('thisismylastname')
        const showEmail = screen.queryByText('thisemail@email.com')
        const showMessage = screen.queryByText('messageDisplay');

        expect(showFirstName).toBeInTheDocument();
        expect(showLastName).toBeInTheDocument();
        expect(showEmail).toBeInTheDocument();
        //this is the negative test
        expect(showMessage).not.toBeInTheDocument();


    })

});

test('renders all fields text when all fields are submitted.', async () => {
    //Arrange
    //Act
    //Assert
    render(<ContactForm/>)
    //Act
    const firstN = screen.getByLabelText(/first name*/i);
    const lastN = screen.getByLabelText(/last name*/i);
    const myEmail = screen.getByLabelText(/email*/i);
    const myMessage = screen.getByLabelText(/message/i);

    userEvent.type(firstN, 'mynameisthis');
    userEvent.type(lastN, 'thisismylastname');
    userEvent.type(myEmail, 'thisemail@email.com');
    userEvent.type(myMessage,'this is my message')

    const pressButton = screen.getByRole('button');
    userEvent.click(pressButton);
    //Assert a negative test

    await waitFor(() => {
        const showFirstName= screen.queryByText('mynameisthis')
        const showLastName = screen.queryByText('thisismylastname')
        const showEmail = screen.queryByText('thisemail@email.com')
        const showMessage = screen.queryByText('this is my message');

        expect(showFirstName).toBeInTheDocument();
        expect(showLastName).toBeInTheDocument();
        expect(showEmail).toBeInTheDocument();
        expect(showMessage).toBeInTheDocument();


    })
});