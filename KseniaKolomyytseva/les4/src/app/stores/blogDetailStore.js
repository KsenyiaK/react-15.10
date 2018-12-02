import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import axios from 'axios';

import {
    FETCH_BLOG_DETAIL_START,
    FETCH_BLOG_DETAIL_END
} from '../constants/blogConstants';

class BlogDetailStore extends EventEmitter {
    constructor() {
        super( ...arguments );

        this.data = [];

        this.fetchBlogDetailEnd = this.fetchBlogDetailEnd.bind( this );
        this.fetchBlogDetailStart = this.fetchBlogDetailStart.bind( this );
        this.change = this.change.bind( this );
        this.handleActions = this.handleActions.bind( this );
    }

    fetchBlogDetailStart( id ) {
        axios.get( `https://jsonplaceholder.typicode.com/posts/${ id }` )
            .then( ( response ) => {
                const { data } = response;
                dispatcher.dispatch( {
                    type: FETCH_BLOG_DETAIL_END,
                    payload: data
                } );
            } );
    }

    fetchBlogDetailEnd( data ) {
        this.data = data;
        this.change();
    }

    change() {
        this.emit( 'change', this.data );
    }

    handleActions( action ) {
        switch ( action.type ) {
            case FETCH_BLOG_DETAIL_START: {
                this.fetchBlogDetailStart( action.payload );
                break;
            }

            case FETCH_BLOG_DETAIL_END: {
                this.fetchBlogDetailEnd( action.payload );
                break;
            }
        }
    }
}

const blogDetailStore = new BlogDetailStore();
dispatcher.register( blogDetailStore.handleActions );
export default blogDetailStore;