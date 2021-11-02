import React, { useState } from 'react';
import Modal from 'react-modal';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Button, Input, Tooltip } from 'antd';
import {
	CloseOutlined,
	InfoCircleOutlined,
	MailOutlined,
	MobileOutlined,
	PictureOutlined,
	UserOutlined
} from '@ant-design/icons';

import './Header.css';
import { INSERT_ONE_CONTACT } from '../../graphql/mutation';

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
			picture,
			info: { age: 24, area: 'test area' }
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
			<div className='header__home'>
				<Link to='/' className='header__title'>
					<h2 className='header__title__text'>Contacts app</h2>
				</Link>
			</div>
			<div className='header__action'>
				<Button
					// type='primary'
					shape='round'
					color='#D5D5D5'
					onClick={() => setShowAddContact(true)}>
					Add contact
				</Button>
			</div>
			<Modal isOpen={showAddContact} style={modalStyles}>
				<div className='header__add'>
					<div className='header__add__title'>
						<h2>Please enter the contact details</h2>
						<Button
							type='primary'
							shape='circle'
							danger
							icon={<CloseOutlined />}
							onClick={() => setShowAddContact(false)}
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
								<Button type='primary' shape='round' onClick={onAddContact}>
									Add
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

export default Header;
