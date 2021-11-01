import React, { useState } from 'react';
import Modal from 'react-modal';
import { Redirect, useHistory, useLocation } from 'react-router';
import { useMutation } from '@apollo/client';

import './ContactView.css';
import { DELETE_ONE_CONTACT, UPDATE_ONE_CONTACT } from '../../graphql/mutation';

interface Contact {
	_id: string;
	name: string;
	phone: string;
	email: string;
	picture: string;
}

interface LocationState {
	from: {
		pathname: string;
		// state: Contact;
	};
}

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

const ContactView = () => {
	const location = useLocation<any>();
	let history = useHistory();

	console.log(location.state);
	const contact = location.state.contact;

	const [showUpdateContact, setShowUpdateContact] = useState(false);
	const [name, setName] = useState(contact.name);
	const [number, setNumber] = useState(contact.phone);
	const [email, setEmail] = useState(contact.email);
	const [picture, setPicture] = useState(contact.picture);
	const [showError, setShowError] = useState(false);

	const defaultAvatar =
		'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';

	const [deleteContact] = useMutation(DELETE_ONE_CONTACT, {
		variables: {
			_id: contact._id
		}
	});

	const [updateContact, { data, loading, error }] = useMutation(UPDATE_ONE_CONTACT, {
		variables: {
			_id: contact._id,
			name,
			phone: number,
			email,
			picture
		}
	});

	const errorMessage = () => {
		return <p className='header__errorMessage'>Please enter valid name and number</p>;
	};

	const onUpdateContact = async (e: any) => {
		console.log('update');
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

			await updateContact();
			if (data) {
				<Redirect to='/' />;
			}

			setShowError(false);
			setShowUpdateContact(false);
		}
	};

	const onDeleteContact = async () => {
		await deleteContact();
		history.push('/');
		// return <Redirect to='/' />;
	};

	return (
		<div className='contactView'>
			<div className='contactView__pic'>
				<img
					src={contact.picture ? contact.picture : defaultAvatar}
					alt='contact pic'
					width='150'
					height='150'
					className='contact__pic--border'
				/>
			</div>
			<div className='contactView__details'>
				<p className='contactView__details__text'>
					<strong>Name:</strong> {name}
				</p>
				<p className='contactView__details__text'>
					<strong>Mobile Number:</strong> {number}
				</p>
				<p className='contactView__details__text'>
					<strong>Email:</strong> {email ? email : '-'}
				</p>
				<div
					className='contactView__update'
					onClick={() => {
						setShowUpdateContact(true);
					}}>
					Update
				</div>
				<div className='contactView__delete' onClick={onDeleteContact}>
					Delete
				</div>
			</div>
			<Modal isOpen={showUpdateContact} style={modalStyles}>
				<div className='header__add'>
					<div className='header__add__title'>
						<h2>Please enter the contact details</h2>
						<button onClick={() => setShowUpdateContact(false)}>Close</button>
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
								<button onClick={onUpdateContact}>Update</button>
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

export default ContactView;
