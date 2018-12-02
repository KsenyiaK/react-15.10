import dispatcher from '../dispatcher';
import {
    FETCH_BLOG_START,
    FETCH_BLOG_DETAIL_START
} from '../constants/blogConstants';

export function fetchBlogItems() {
    dispatcher.dispatch( {
        type: FETCH_BLOG_START
    } );
}

export function fetchBlogDetail( id ) {
    dispatcher.dispatch( {
        type: FETCH_BLOG_DETAIL_START,
        payload: id
    } );
}