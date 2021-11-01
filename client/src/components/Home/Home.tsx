import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import './Home.css';
import Header from '../Header/Header';
import { FETCH_ALL_CONTACTS_QUERY } from '../../graphql/query';
import ContactView from '../ContactView/ContactView';
import ContactList from '../ContactList/ContactList';

const Home = () => {
	const [contacts, setContacts] = useState([]);
	const { loading, error, data } = useQuery(FETCH_ALL_CONTACTS_QUERY);

	if (loading) {
		console.log('Loading contacts:::');
	}

	if (error) {
		console.log('Error loading contacts:::', error);
	}

	console.log(data);

	useEffect(() => {
		if (data) {
			setContacts(data.contacts);
		}
	}, [data]);

	return (
		<div className='home'>
			<ContactList contacts={contacts} />
		</div>
	);
};

export default Home;
