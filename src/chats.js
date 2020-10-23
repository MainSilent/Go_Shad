import React from 'react';
import ChatsList from './chats/chats_list';
import ChatMessages from './chats/chat_messages'
import 'bootstrap/dist/css/bootstrap.min.css';
const { ipcRenderer } = window.require('electron')

class Chats extends React.Component {
  constructor() {
    super()
    this.state = {
      chats: []
    }
  }
  componentDidMount() {
    ipcRenderer.on('chats:reply', (event, chats) => {
      chats.chats &&
        this.setState({
          chats: chats.chats
        },() => console.log(this.state.chats))
    })
    ipcRenderer.send('chats', this.props.auth)
  }
  render() {
    return (
    <div className="chats-container">
        <ChatMessages />
        <ChatsList chats={this.state.chats}/>
    </div>
    );
  }   
}

export default Chats