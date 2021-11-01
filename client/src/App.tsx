import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import ContactList from './components/ContactList/ContactList';
import ContactView from './components/ContactView/ContactView';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Header />
				<Switch>
					<Route path='/contact' exact>
						<ContactView />
					</Route>
					<Route path='/' exact>
						<Home />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
