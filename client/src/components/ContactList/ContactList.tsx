import React from 'react';

import './ContactList.css';
import Contact from '../Contact/Contact';

const ContactList = ({ contacts }: any) => {
	return (
		<div className='contactsList'>
			{contacts &&
				contacts.map((contact: any) => <Contact contact={contact} key={contact._id} />)}
		</div>
	);
};

export default ContactList;
