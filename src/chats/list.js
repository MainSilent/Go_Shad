import React from 'react';
import $ from "jquery";

class ChatsList extends React.Component {
    openChat(index) {
        $(".contacts li").removeClass("active")
        if(index === "all" && this.props.chats) {
            $(".chat_all").addClass("active")
            this.props.chChat("all")
        }
        else {
            $(`.chat_${index}`).addClass("active")
            this.props.chChat(index)
        }
    }
    render() {
        return (
        <div className="card contacts_card">
        {/* <div className="card-header contacts-header"> 
        </div> */}
        {this.props.chats === false ? 
        <p className="retry-btn" onClick={this.props.retry}>Error: Try again</p> : 
        !this.props.chats.length ?
            <div className="spinner">
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
            </div> :
            <div className="card-body contacts_body" dir="rtl">
                <ul className="contacts">
                    <li className="chat_all active" onClick={() => this.openChat("all")}>
                        <div className="d-flex bd-highlight">
                            {/* <div className="img_cont"> 
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
                            </div> */}
                            <div className="user_info">
                                <span>پخش زنده ها</span>
                                <p></p>
                            </div>
                        </div>
                    </li>
                    {this.props.chats.map((chat, index) =>
                    <li key={index} className={`chat_${index}`} onClick={() => this.openChat(index)}>
                        <div className="d-flex bd-highlight">
                            {/* <div className="img_cont"> 
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
                            </div> */}
                            <div className="user_info">
                                <span>{chat.abs_object.title}</span>
                                <p>{chat.last_message.text}</p>
                            </div>
                        </div>
                    </li>
                    )}
                </ul>
            </div>
        }
        </div>
        )
    }
}

export default ChatsList