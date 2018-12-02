import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import axios from 'axios';

import {
    FETCH_BLOG_START,
    FETCH_BLOG_END
} from '../constants/blogConstants';

class BlogStore extends EventEmitter {
    constructor() {
        super( ...arguments );

        this.items = [];

        this.fetchBlogEnd = this.fetchBlogEnd.bind( this );
        this.fetchBlogStart = this.fetchBlogStart.bind( this );
        this.change = this.change.bind( this );
        this.handleActions = this.handleActions.bind( this );
    }

    fetchBlogStart() {
        axios.get( 'https://jsonplaceholder.typicode.com/posts' )
            .then( ( response ) => {
                const { data } = response;
                dispatcher.dispatch( {
                    type: FETCH_BLOG_END,
                    payload: data
                } );
            } );
    }

    fetchBlogEnd( data ) {
        this.items = data;
        this.change();
    }

    change() {
        this.emit( 'change', this.items );
    }

    handleActions( action ) {
        switch ( action.type ) {
            case FETCH_BLOG_START: {
                this.fetchBlogStart();
                break;
            }

            case FETCH_BLOG_END: {
                this.fetchBlogEnd( action.payload );
                break;
            }
        }
    }
}

const blogStore = new BlogStore();
dispatcher.register( blogStore.handleActions );
export default blogStore;