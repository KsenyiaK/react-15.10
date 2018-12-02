import dispatcher from '../dispatcher';
import { FETCH_USERS_START } from '../constants/usersConstatnts';

export function fetchUsers() {
    dispatcher.dispatch( {
        type: FETCH_USERS_START
    } );
}