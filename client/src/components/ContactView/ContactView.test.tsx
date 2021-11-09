import React from 'react';
import TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import ContactView from './ContactView';
import { DELETE_ONE_CONTACT, UPDATE_ONE_CONTACT } from '../../graphql/mutation';

configure({ adapter: new Adapter() });

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useLocation: () => ({
		pathname: 'localhost:3000/contact',
		state: {
			contact: {
				_id: '61811f2004dd629f1f4fa3fa',
				name: 'testName',
				phone: '+911132334455',
				email: 'testemai.g.com',
				info: {
					place: 'Chennai',
					sport: 'Tennis'
				},
				address: {
					_id: '6181173fa5b3355349dafa6b',
					location: 'Chennai'
				}
			}
		}
	})
}));

const mocks = [
	{
		request: {
			query: DELETE_ONE_CONTACT,
			variables: {
				_id: '618269512bffd91568cb95db'
			}
		},
		result: {
			data: {
				deleteContact: 'Contact deleted successfully'
			}
		}
	},
	{
		request: {
			query: UPDATE_ONE_CONTACT,
			variables: {
				_id: '618269512bffd91568cb95db',
				name: 'test',
				phone: '1234567890',
				email: 'test@g.com',
				picture: ''
			}
		},
		result: {
			data: {
				_id: '618269512bffd91568cb95db',
				name: 'test',
				phone: '1234567890',
				email: 'test@g.com',
				picture: ''
			}
		}
	}
];

describe('Contact component', () => {
	it('renders Contact without crashing', () => {
		const component = TestRenderer.create(
			<MockedProvider mocks={mocks} addTypename={false}>
				<ContactView />
			</MockedProvider>
		);

		const tree = component.toJSON();
		// console.log(tree);
		expect(tree).toMatchSnapshot();
		// console.log(tree?.children[1].children[0].children[2]);
		expect(tree?.children[1].children[0].children[0].children).toContain('Name:');
		expect(tree?.children[1].children[0].children[2]).toEqual('testName');
	});

	// it('should render contactView with text diablo', () => {
	// 	const name = 'diablo';
	// 	const rendered = render(<ContactView />);
	// 	// console.log('check contact name',rendered);
	// 	expect(rendered.getByText(name)).toBeTruthy();
	// });
});
