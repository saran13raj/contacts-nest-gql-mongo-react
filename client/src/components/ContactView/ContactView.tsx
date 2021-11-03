import React, { useState } from 'react';
import Modal from 'react-modal';
import { Redirect, useHistory, useLocation } from 'react-router';
import { useMutation } from '@apollo/client';
import 'antd/dist/antd.css';
import { Button, Input, Tooltip } from 'antd';
import {
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	InfoCircleOutlined,
	MailOutlined,
	MobileOutlined,
	PictureOutlined,
	UserOutlined
} from '@ant-design/icons';

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
		height: '430px',
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
	const [location1, setLocation1] = useState(contact.address);
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
				<div>
					<img
						src={contact.picture ? contact.picture : defaultAvatar}
						alt='contact pic'
						width='150'
						height='150'
						className='contact__pic--border'
					/>
				</div>
				<div
					className='contactView__update'
					onClick={() => {
						setShowUpdateContact(true);
					}}>
					<EditOutlined />
				</div>
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
				<p className='contactView__details__text'>
					<strong>Location:</strong> {location1 ? location1.location : '-'}
				</p>

				<div className='contactView__delete' onClick={onDeleteContact}>
					<DeleteOutlined />
				</div>
			</div>
			<Modal isOpen={showUpdateContact} style={modalStyles}>
				<div className='header__add'>
					<div className='header__add__title'>
						<h2>Please enter the contact details</h2>
						<Button
							type='primary'
							shape='circle'
							danger
							icon={<CloseOutlined />}
							onClick={() => setShowUpdateContact(false)}
						/>
					</div>
					<div className='header__add__form'>
						<form>
							<div className='header__add__detail'>
								<Input
									type='text'
									placeholder='Name'
									size='middle'
									prefix={<UserOutlined className='site-form-item-icon' />}
									suffix={
										<Tooltip title='Contact Name'>
											<InfoCircleOutlined
												style={{ color: 'rgba(0,0,0,.45)' }}
											/>
										</Tooltip>
									}
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className='header__add__detail'>
								<Input
									type='text'
									placeholder='Mobile Number'
									size='middle'
									prefix={<MobileOutlined className='site-form-item-icon' />}
									suffix={
										<Tooltip title='Mobile Number'>
											<InfoCircleOutlined
												style={{ color: 'rgba(0,0,0,.45)' }}
											/>
										</Tooltip>
									}
									value={number}
									onChange={(e) => setNumber(e.target.value)}
								/>
							</div>
							<div className='header__add__detail'>
								<Input
									type='text'
									placeholder='Email'
									size='middle'
									prefix={<MailOutlined className='site-form-item-icon' />}
									suffix={
										<Tooltip title='Email'>
											<InfoCircleOutlined
												style={{ color: 'rgba(0,0,0,.45)' }}
											/>
										</Tooltip>
									}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='header__add__detail'>
								<Input
									type='text'
									placeholder='Picture'
									size='middle'
									prefix={<PictureOutlined className='site-form-item-icon' />}
									suffix={
										<Tooltip title='Profile Picture'>
											<InfoCircleOutlined
												style={{ color: 'rgba(0,0,0,.45)' }}
											/>
										</Tooltip>
									}
									value={picture}
									onChange={(e) => setPicture(e.target.value)}
								/>
							</div>
							<div className='header__add__button__div'>
								<Button type='primary' shape='round' onClick={onUpdateContact}>
									Update
								</Button>
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
