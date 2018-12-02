import dispatcher from '../dispatcher';
import { FETCH_MENU_START } from '../constants/menuConstants';

export function fetchMenu() {
    dispatcher.dispatch( {
        type: FETCH_MENU_START
    } )
}