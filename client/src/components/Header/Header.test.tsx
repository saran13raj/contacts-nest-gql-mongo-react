import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';
import { INSERT_ONE_ADDRESS, INSERT_ONE_CONTACT } from '../../graphql/mutation';

const mocks = [
	{
		request: {
			query: INSERT_ONE_ADDRESS,
			variables: {
				location: 'Chennai'
			}
		},
		result: {
			data: {
				createAddress: { id: '1', location: 'Chennai' }
			}
		}
	},
	{
		request: {
			query: INSERT_ONE_CONTACT,
			variables: {
				name: 'test',
				phone: '1234567890',
				email: 'test2g.com',
				picture: '',
				info: { age: 24, area: 'test area' },
				address: '1'
			}
		},
		result: {
			data: {
				name: 'test',
				phone: '1234567890',
				email: 'test2g.com',
				picture: '',
				info: { age: 24, area: 'test area' },
				address: {
					_id: '1',
					location: 'Chennai'
				}
			}
		}
	}
];

describe('Header component', () => {
	it('renders Header without crashing', () => {
		const component = TestRenderer.create(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</MockedProvider>
		);

		// console.log(component);
		const tree = component.toJSON();
		// console.log(tree);
		expect(tree).toMatchSnapshot();
		// console.log(tree?.props.children);
		// expect(tree.children).toContain('Contacts app')
	});
});
