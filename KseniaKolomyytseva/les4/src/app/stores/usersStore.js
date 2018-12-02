import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import axios from 'axios';

import {
    FETCH_USERS_START,
    FETCH_USERS_END
} from '../constants/usersConstatnts';

class UsersStore extends EventEmitter {
    constructor() {
        super( ...arguments );

        this.users = [];

        this.fetchUsersStart = this.fetchUsersStart.bind( this );
        this.fetchUsersEnd = this.fetchUsersEnd.bind( this );
        this.change = this.change.bind( this );
        this.handleActions = this.handleActions.bind( this );
    }

    fetchUsersStart() {
        axios.get( 'https://jsonplaceholder.typicode.com/users' )
            .then( ( response ) => {
                const { data } = response;
                dispatcher.dispatch( {
                    type: FETCH_USERS_END,
                    payload: data
                } );
            } );
    }

    fetchUsersEnd( users ) {
        this.users = users;
        this.change();
    }

    change() {
        this.emit( 'change', this.users );
    }

    handleActions( action ) {
        switch ( action.type ) {
            case FETCH_USERS_START: {
                this.fetchUsersStart();
                break;
            }

            case FETCH_USERS_END: {
                this.fetchUsersEnd( action.payload );
                break;
            }
        }
    }
}

const usersStore = new UsersStore();
dispatcher.register( usersStore.handleActions );
export default usersStore;