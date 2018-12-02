import React, { Component } from 'react';
import MenuStore from '../stores/menuStore';
import { fetchMenu } from '../actions/menuActions';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Menu from '../components/Menu';
import MenuItem from '../components/MenuItem';

export default class Main extends Component {
    constructor() {
        super( ...arguments );

        this.state = {
            logo: {
                standard: '/images/logo.png',
                retina: '/images/logo@2x.png',
                alt: 'Блог'
            },

            menu: []
        };

        this.onMenuChange = this.onMenuChange.bind( this );
    }

    onMenuChange( menu ) {
        this.setState( {
            menu
        } )
    }

    componentWillMount() {
        MenuStore.on( 'change', this.onMenuChange )
    }

    componentDidMount() {
        fetchMenu();
    }

    componentWillUnmount() {
        MenuStore.removeListener( 'change', this.onMenuChange )
    }

    render() {
        const menuItems = this.state.menu.map( ( item, index ) => {
            return (
                <MenuItem href={ item.href } key={ index }>{ item.name }</MenuItem>
            );
        } );

        return (
            <div id="wrapper" className="clearfix">
                <Header>
                    <Logo srcLogoStandard={ this.state.logo.standard }
                          srcLogoRetina={ this.state.logo.retina } alt={ this.state.logo.alt }/>
                    <Menu>
                        { menuItems }
                    </Menu>
                </Header>

                { this.props.children }

                <Footer/>
            </div>
        );
    }
}