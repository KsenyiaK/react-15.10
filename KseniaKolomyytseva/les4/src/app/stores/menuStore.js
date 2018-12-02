import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import axios from 'axios';

import {
    FETCH_MENU_START,
    FETCH_MENU_END
} from '../constants/menuConstants';

class MenuStore extends EventEmitter {
    constructor() {
        super( ...arguments );

        this.menu = [];

        this.fetchMenuStart = this.fetchMenuStart.bind( this );
        this.fetchMenuEnd = this.fetchMenuEnd.bind( this );
        this.change = this.change.bind( this );
        this.handleActions = this.handleActions.bind( this );
    }

    fetchMenuStart() {
        axios.get( './data/menu.json' )
            .then( ( response ) => {
                const { data } = response;
                dispatcher.dispatch( {
                    type: FETCH_MENU_END,
                    payload: data
                } );
            } );
    }

    fetchMenuEnd( menu ) {
        this.menu = menu;
        this.change();
    }

    change() {
        this.emit( 'change', this.menu );
    }

    handleActions( action ) {
        switch ( action.type ) {
            case FETCH_MENU_START: {
                this.fetchMenuStart();
                break;
            }

            case FETCH_MENU_END: {
                this.fetchMenuEnd( action.payload );
                break;
            }
        }
    }
}

const menuStore = new MenuStore();
dispatcher.register( menuStore.handleActions );
export default menuStore;