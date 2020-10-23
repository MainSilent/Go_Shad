import React from 'react';
import $ from "jquery";

class ChatsList extends React.Component {
    openChat(index) {
        $(".contacts li").removeClass("active")
        if(index === "all") $(".chat_all").addClass("active")
        else $(`.chat_${index}`).addClass("active")
    }
    render() {
        return (
        <div className="card contacts_card">
        <div className="card-header contacts-header">
                <input type="checkbox" id="cbx" style={{display: "none"}}/>
                <label htmlFor="cbx" className="toggle"><span></span></label>  
                <p>شرکت خودکار در پخش زنده ها</p>
        </div>
        <div className="card-body contacts_body" dir="rtl">
            <ul className="contacts">
            <li className="chat_all active" onClick={() => this.openChat("all")}>
                    <div className="d-flex bd-highlight">
                        {/* <div className="img_cont"> 
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
                        </div> */}
                        <div className="user_info">
                            <span>همه ی پخش زنده ها</span>
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
                            <span>{chat.abs_object.title.replace(/�\?/g, "ف")}</span>
                            <p>{chat.last_message.text.replace(/�\?/g, "ف")}</p>
                        </div>
                    </div>
                </li>
                )}
            </ul>
        </div>
        </div>
        )
    }
}

export default ChatsList