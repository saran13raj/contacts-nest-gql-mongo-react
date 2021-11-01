import React from 'react';
import { Link } from 'react-router-dom';

import './Contact.css';

const Contact = ({ contact }: any) => {
	const defaultAvatar =
		'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';

	const linkTo = {
		pathname: '/contact',
		state: { contact }
	};

	return (
		<div key={contact._id} className='contact'>
			<Link to={linkTo} className='contact__link'>
				<div className='contact__pic'>
					<img
						src={contact.picture ? contact.picture : defaultAvatar}
						alt='contact pic'
						width='60'
						height='60'
						className='contact__pic--border'
					/>
				</div>
				<div className='contact__name'>
					<p>{contact.name}</p>
				</div>
			</Link>
		</div>
	);
};

export default Contact;
