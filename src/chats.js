import React from 'react';
import ChatsList from './chats/list';
import ChatMessages from './chats/messages'
import 'bootstrap/dist/css/bootstrap.min.css';
const { ipcRenderer } = window.require('electron')

class Chats extends React.Component {
  constructor() {
    super()
    this.state = {
      msgLoading: false,
      index: "all",
      current_chat: {
        abs_object: {title: "خانه"}
      },
      chats: [],
      mainChats: {},
      messages: {},
      lastMsgid: 0
    }
    this.chChat = this.chChat.bind(this)
    this.getChats = this.getChats.bind(this)
    this.getMessages = this.getMessages.bind(this)
  }
  getChats() {
    !this.state.chats.length &&
      this.setState({chats: []})
      ipcRenderer.on('chats:reply', (event, chats) => {
        if(!chats) this.setState({chats: false})
        else
          this.setState({
            chats: chats.chats
          })
      })
      ipcRenderer.send('chats', this.props.auth)
  }
  getMessages() {
    if(this.state.messages.old_has_continue) {
      this.setState({msgLoading: true, messages: []})
      ipcRenderer.on('messages:reply', (event, messages) => {
        if(!messages) this.setState({messages: false, msgLoading: false})
        else {
          this.setState({
            messages: messages,
            lastMsgid: messages.old_max_id,
            msgLoading: false
          })
        }
      })
      ipcRenderer.send(
        'messages',
        this.props.auth,
        this.state.lastMsgid,
        this.state.current_chat.object_guid
      )
    }
  }
  chChat(index) {
    index === "all" ?
      this.setState({
        index: "all",
        current_chat: {
          abs_object: {title: "خانه"}
        }
      }) :
      this.state.chats[index] !== this.state.current_chat &&
        this.setState({
          index: index,
          current_chat: this.state.chats[index]
        })
  }
  componentDidMount() {
    !this.state.chats.length &&
      ipcRenderer.on('chats:reply', (event, chats) => {
        if(!chats) this.setState({chats: false})
        else
          this.setState({
            chats: chats.chats,
            mainChats: chats
          })
      })
      ipcRenderer.send('chats', this.props.auth)
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.current_chat.object_guid !== this.state.current_chat.object_guid) {
      this.setState({msgLoading: true, messages: []})
      
      ipcRenderer.on('messages:reply', (event, messages) => {
        if(!messages) this.setState({messages: false, msgLoading: false})
        else
          this.setState({
            messages: messages,
            lastMsgid: messages.old_max_id,
            msgLoading: false
          })
      })
      ipcRenderer.send(
        'messages',
        this.props.auth,
        this.state.current_chat.last_message_id,
        this.state.current_chat.object_guid
      )
    }
  }
  render() {
    return (
    <div className="chats-container">
        <ChatMessages 
          index={this.state.index}
          loading={this.state.msgLoading}
          chat={this.state.current_chat}
          chats={this.state.chats}
          mainchats={this.state.mainChats}
          messages={this.state.messages}
          retry={this.getMessages}
          auth={this.props.auth}
        />
        <ChatsList 
          chats={this.state.chats}
          retry={this.getChats}
          chChat={this.chChat}
          current_chat={this.state.current_chat}
        />
    </div>
    );
  }   
}

export default Chats