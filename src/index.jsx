import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Menu from './components/Menu';
import Container from './components/Container';
import List from './components/List';
import Counter from './components/Counter';
import CommentForm from './components/CommentForm';

const items = [
  { href: '/', title: 'Home' },
  { href: '/news', title: 'News' },
  { href: '/blog', title: 'Blog' },
];

const items1 = [
  { href: '/', title: 'Home1' },
  { href: '/news', title: 'News1' },
  { href: '/blog', title: 'Blog2' },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      isModal: false,
    }
  }

  handleComment = (comment) => {
    this.setState((prevState) => ({
      ...prevState,
      comments: prevState.comments.concat([comment]),
    }))
  }

  handleOpen = (e) => {
    this.setState({ isModal: true });
  }

  render() {
    const { comments, isModal } = this.state;

    return (
      <div className="box">
        <Container>
          <Menu items={items} title="Main menu" />
          Hello world!
          <Menu items={items1} title="Just another menu" />
          <List items={['MongodDB', 'RethinkDB', 'MySQL']} />
          <Counter /><br/>
          <ul>
            {comments.map((comment, idx) => <li key={idx}>{comment.author}: {comment.message}</li>)}
          </ul>
          <CommentForm onSend={this.handleComment} />
          {isModal && <div>Modal</div>}
          <button onClick={this.handleOpen}>Open Modal</button>
        </Container>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));
