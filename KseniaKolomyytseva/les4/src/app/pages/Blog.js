import React, { Component } from 'react';
import { fetchBlogItems } from '../actions/blogActions';
import BlogStore from '../stores/blogStore';

import PageTitle from '../components/PageTitle';
import BlogContent from '../components/BlogContent';
import Sidebar from '../components/Sidebar';
import BlogItem from '../components/BlogItem';
import Pagination from '../components/Pagination';
import Preloader from '../components/Preloader';

export default class Blog extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        };

        this.onBlogChange = this.onBlogChange.bind( this );
    }

    onBlogChange( posts ) {
        this.setState( {
            posts
        } );
    }

    componentWillMount() {
        BlogStore.on( 'change', this.onBlogChange );
    }

    componentDidMount() {
        fetchBlogItems();
    }

    componentWillUnmount() {
        BlogStore.removeListener( 'change', this.onBlogChange );
    }

    render() {

        if ( !this.props.children ) {
            return (
                <div>
                    <PageTitle title={'Блог'} description={'Наши последние новости'}/>
                    <section id="content">
                        <div className="content-wrap">
                            <div className="container clearfix">
                                <BlogContent>
                                    <Preloader show={ !this.state.posts.length }/>
                                    <BlogItem items={ this.state.posts }/>
                                    <Pagination/>
                                </BlogContent>
                                <Sidebar title={'Tag cloud'}/>
                            </div>
                        </div>
                    </section>
                </div>
            );

        } else {
            return (
                this.props.children
            );
        }
    }
}