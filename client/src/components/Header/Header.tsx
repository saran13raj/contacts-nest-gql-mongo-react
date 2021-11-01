import React, { useState } from 'react';
import Modal from 'react-modal';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import './Header.css';
import { INSERT_ONE_CONTACT } from '../../graphql/mutation';

const modalStyles = {
	content: {
		height: '350px',
		width: '600px',
		marginTop: '100px',
		marginLeft: 'auto',
		marginRight: 'auto'
	}
};

Modal.setAppElement('#root');

const Header = () => {
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');
	const [email, setEmail] = useState('');
	const [picture, setPicture] = useState('');
	const [showAddContact, setShowAddContact] = useState(false);
	const [showError, setShowError] = useState(false);

	const [addContact, { data, loading, error }] = useMutation(INSERT_ONE_CONTACT, {
		variables: {
			// input: {
			name,
			phone: number,
			email,
			picture
			// }
		}
	});

	if (loading) {
		console.log('Loading:::');
	}

	if (error) {
		console.log('Error adding contact:::', error);
	}

	const onAddContact = async (e: any) => {
		e.preventDefault();
		if (name.length === 0 || number.length === 0) {
			setShowError(true);
			return;
		} else {
			const contactObj = {
				name,
				number,
				email,
				picture
			};
			console.log(contactObj);

			await addContact();
			if (data) {
				<Redirect to='/' />;
			}

			setShowError(false);
			setShowAddContact(false);
		}
	};

	const errorMessage = () => {
		return <p className='header__errorMessage'>Please enter valid name and number</p>;
	};

	return (
		<div className='header'>
			<Link to='/' className='header__home'>
				<h3>Contacts app</h3>
			</Link>
			<div className='header__action'>
				<button onClick={() => setShowAddContact(true)}>Add contact</button>
			</div>
			<Modal isOpen={showAddContact} style={modalStyles}>
				<div className='header__add'>
					<div className='header__add__title'>
						<h2>Please enter the contact details</h2>
						<button onClick={() => setShowAddContact(false)}>Close</button>
					</div>
					<div className='header__add__form'>
						<form>
							<div className='header__add__detail'>
								<label>Name</label>
								<input
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className='header__add__detail'>
								<label>Mobile Number</label>
								<input
									type='text'
									value={number}
									onChange={(e) => setNumber(e.target.value)}
								/>
							</div>
							<div className='header__add__detail'>
								<label>Email</label>
								<input
									type='text'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='header__add__detail'>
								<label>Profile Picture</label>
								<input
									type='text'
									value={picture}
									onChange={(e) => setPicture(e.target.value)}
								/>
							</div>
							<div className='header__add__button__div'>
								<button onClick={onAddContact}>Add</button>
							</div>
							<div className='header__add__error'>
								{showError ? errorMessage() : null}
							</div>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Header;
