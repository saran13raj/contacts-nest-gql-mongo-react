import React from 'react';
import renderer from 'react-test-renderer';
import ReactDom from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import Contact from './Contact';
import { render } from '@testing-library/react';

const contact = {
	_id: '61811f2004dd629f1f4fa3fa',
	name: 'diablo',
	phone: '+911132334455',
	email: 'diablo.g.com',
	info: {
		place: 'Chennai',
		sport: 'Tennis'
	},
	address: {
		_id: '6181173fa5b3355349dafa6b',
		location: 'Chennai'
	}
};

describe('Contact component', () => {
	it('renders Contact without crashing', () => {
		// const div = document.createElement('div');
		// ReactDom.render(
		// 	<MemoryRouter>
		// 		<Contact contact={contact} />
		// 	</MemoryRouter>,
		// 	div
		// );
		// ReactDom.unmountComponentAtNode(div);

		const tree = renderer.create(
			<MemoryRouter>
				<Contact contact={contact} />
			</MemoryRouter>
		);

		// console.log(tree);
		expect(tree.toJSON()).toMatchSnapshot();
	});

	it('should render contact with text diablo', () => {
		const name = 'diablo';
		const rendered = render(
			<MemoryRouter>
				<Contact contact={contact} />
			</MemoryRouter>
		);
		// console.log('check contact name',rendered);
		expect(rendered.getByText(name)).toBeTruthy();
	});
});
