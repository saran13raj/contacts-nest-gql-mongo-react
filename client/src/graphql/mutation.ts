import { gql } from '@apollo/client';

// mutation InsertContact($input: ContactInput!) {
// createContact(input: $input) {
export const INSERT_ONE_CONTACT = gql`
	mutation InsertContact($name: String!, $phone: String!, $email: String!, $picture: String!) {
		createContact(input: { name: $name, phone: $phone, email: $email, picture: $picture }) {
			_id
			name
			phone
			email
			picture
		}
	}
`;

export const DELETE_ONE_CONTACT = gql`
	mutation DeleteOneContact($_id: String!) {
		deleteContact(_id: $_id)
	}
`;

export const UPDATE_ONE_CONTACT = gql`
	mutation UpdateOneContact(
		$_id: String!
		$name: String!
		$phone: String!
		$email: String!
		$picture: String!
	) {
		updateContact(
			data: {
				query: { _id: $_id }
				set: { name: $name, phone: $phone, email: $email, picture: $picture }
			}
		) {
			_id
			name
			phone
			email
			picture
		}
	}
`;
