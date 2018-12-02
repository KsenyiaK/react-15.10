import React, { Component } from 'react';
import UsersStore from '../stores/usersStore';
import { fetchUsers } from '../actions/usersActions';

import PageTitle from '../components/PageTitle';
import User from '../components/User';
import Preloader from '../components/Preloader';

export default class Users extends Component {
    constructor() {
        super( ...arguments );

        this.state = {
            users: []
        };

        this.onUsersChange = this.onUsersChange.bind( this );
    }

    onUsersChange( users ) {
        this.setState( {
            users
        } );
    }

    componentWillMount() {
        UsersStore.on( 'change', this.onUsersChange )
    }

    componentDidMount() {
        fetchUsers();
    }

    componentWillUnmount() {
        UsersStore.removeListener( 'change', this.onUsersChange );
    }

    render() {
        const usersList = this.state.users.map( ( value ) => {
            return (
                <User data={ value } key={ value.id }/>
            );
        } );

        return (
            <div>
                <PageTitle title={'Пользователи'} description={'Читатели нашего блога'}/>
                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="row">
                                <Preloader show={ !this.state.users.length }/>
                                { usersList }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}