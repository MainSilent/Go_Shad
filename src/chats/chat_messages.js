import React from 'react';
const { ipcRenderer } = window.require('electron')

class ChatsMessages extends React.Component {
    render() {
        return (
        <div className="card msg_card">
            <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                    <div className="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
                        <span className="online_icon"></span>
                    </div>
                    <div className="user_info">
                        <span>Chat with Khalid</span>
                        <p>1767 Messages</p>
                    </div>
                    <div className="video_cam">
                        <span><i className="fas fa-video"></i></span>
                        <span><i className="fas fa-phone"></i></span>
                    </div>
                </div>
            </div>
            <div className="card-body msg_card_body">
                
            </div>
        </div>
        )
    }
}

export default ChatsMessages