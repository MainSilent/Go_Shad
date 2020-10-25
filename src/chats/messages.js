import React from 'react';
import Live from './live'

class ChatsMessages extends React.Component {
    render() {
        return (
        <div className="card msg_card">
            <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                    {/*<div className="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
                        <span className="online_icon"></span>
                    </div>*/}
                    {this.props.index !== "all" ?
                    <div className="user_info">
                        <span>{this.props.chat.abs_object.title}</span>
                        {/* <p>1767 Messages</p> */}
                    </div>
                    :
                    <div className="autoMode">
                        <input type="checkbox" id="cbx" style={{display: "none"}}/>
                        <label htmlFor="cbx" className="toggle"><span></span></label>  
                        <p className="auto-p">شرکت خودکار در پخش زنده ها</p>
                    </div>
                    }
                </div>
            </div>
            <div className="msg_card_body">
                {this.props.loading && 
                <div className="spinner">
                    <div className="spinner-item"></div>
                    <div className="spinner-item"></div>
                    <div className="spinner-item"></div>
                </div>
                }
                {this.props.index !== "all" ?
                <ul className="lives_grid">
                    {this.props.messages.messages &&
                    Object.keys(this.props.messages.messages).map(index => 
                    this.props.messages.messages[index].type === "Live" &&
                        <Live key={index} message={this.props.messages.messages[index]}/>
                    )}
                    {this.props.messages.old_has_continue &&
                    <div className="spinner">
                        <div className="spinner-item"></div>
                        <div className="spinner-item"></div>
                        <div className="spinner-item"></div>
                    </div>
                    }
                    {this.props.messages === false && 
                        <p className="retry-btn msg" onClick={this.props.retry}>Error: Try again</p> 
                    }
                </ul>
                :
                <h1>All of them!</h1>
                }
            </div>
        </div>
        )
    }
}

export default ChatsMessages