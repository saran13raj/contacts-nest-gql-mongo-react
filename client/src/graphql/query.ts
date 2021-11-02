import { gql } from '@apollo/client';

export const FETCH_ALL_CONTACTS_QUERY = gql`
	query FetchAllContacts {
		contacts {
			_id
			name
			phone
			email
			picture
			info
		}
	}
`;

export const FECTH_ONE_CONTACT_QUERY = (_id: string) => gql`
query FetchOneContact($_id: String!){
    contact(_id: "${_id}") {
      _id
      name
      phone
      email
      picture
      info
    }
  }
`;
