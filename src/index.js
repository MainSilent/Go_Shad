import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './auth';
import Chats from './chats';
const { ipcRenderer } = window.require('electron')

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      auth: "",
      loading: true
    }
  }
  chAuth(auth) {
    this.setState({
        auth: auth
    })
  }
  componentDidMount() {
    ipcRenderer.on('auth:reply', (event, auth) => {
        setTimeout(()=>{
          this.setState({
            loading: false
          })
        }, 2000)
        auth && this.chAuth(auth)
    })
    ipcRenderer.send('auth')
  }
  render() {
    return (
    <div className="app">
      {
      this.state.loading ?  
      <div className="loading">
        <img src="assets/images/icon.png" alt="گشاد"/>
        <h1>گشاد</h1>
      </div> 
      :
      <div className="home">
      {
          !this.state.auth ?
          <Auth chAuth={this.chAuth.bind(this)}/>
          :
          <Chats auth={this.state.auth}/>
      }
      </div>
      }
    </div>
    );
  }   
}

ReactDOM.render(<Home />, document.getElementById('root'));