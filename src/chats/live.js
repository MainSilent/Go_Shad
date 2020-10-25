import React from 'react';
const { ipcRenderer } = window.require('electron')

class Live extends React.Component {
    formatDate(timestamp) {
        const date = new Date(parseInt(timestamp)*1000)
        return `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()} ${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }
    timeConvert(n) {
        if(!n) return "N/A"
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + ":" + (rminutes<10?'0':'') + rminutes;
    }
    render() {
        return (
        <li>
            <figure className="grid__figure">
                <img
                    src={`data:image/jpeg;base64, ${this.props.message.live_data.thumb_inline}`}
                    className={!this.props.message.live_data.live_status.can_play && "cantplay"} alt=""/>
                {!this.props.message.live_data.live_status.can_play ? 
                    <>
                        <h1>N/A</h1>
                        <div className="live_detail">
                            <p>{this.timeConvert(this.props.message.live_data.live_status.duration)}</p>
                        </div>
                    </> : 
                    <div className="live_detail">
                        <p>{this.timeConvert(this.props.message.live_data.live_status.duration)}</p>
                        <img src="assets/images/download.png"/>
                        <img src="assets/images/play.png"/>
                    </div>
                }
                <figcaption>
                    {this.formatDate(this.props.message.time)}
                </figcaption>
            </figure>
        </li>
        )
    }
}

export default Live