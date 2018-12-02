import React, { Component } from 'react';
import BlogDetailStore from '../stores/blogDetailStore';
import { fetchBlogDetail } from '../actions/blogActions';

import PageTitle from '../components/PageTitle';
import BlogContent from '../components/BlogContent';
import Sidebar from '../components/Sidebar';
import Preloader from '../components/Preloader';

export default class BlogDetail extends Component {
    constructor() {
        super( ...arguments );

        this.state = {
            data: {}
        };

        this.onBlogDetailChange = this.onBlogDetailChange.bind( this );
    }

    onBlogDetailChange( data ) {
        this.setState( {
            data
        } );
    }

    componentWillMount() {
        BlogDetailStore.on( 'change', this.onBlogDetailChange );
    }

    componentDidMount() {
        fetchBlogDetail( this.props.params.blogId );
    }

    componentWillUnmount() {
        BlogDetailStore.removeListener( 'change', this.onBlogDetailChange );
    }

    render() {
        return (
            <div>
                <PageTitle title={ this.state.data.title } description={ `Пост №${ this.state.data.id }` }/>
                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <BlogContent>
                                <Preloader show={ this.state.data.id === undefined }/>
                                { this.state.data.body }/>
                            </BlogContent>
                            <Sidebar title={'Tag cloud'}/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}