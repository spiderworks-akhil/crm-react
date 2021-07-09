import moment from "moment"

const SingleActivity = (props) => {
    let date = props.item.log_date;
    date = moment(date).fromNow();
    return <div className="row">
        <div className="col-md-2">
            <div className="message-day backday"> {date} </div>
        </div>
        <div className="col-md-10">
            <div className="message-item" id="m16">
                <div className="message-inner">
                    <div className="message-head clearfix">
                        <div className="user-detail">
                            <h5 className="handle">{props.item.user.name}</h5>
                            <div className="post-meta">
                                <div className="asker-meta">
                                    <span className="qa-message-what"></span>
                                    <span className="qa-message-when">

                              </span>
                                    <span className="qa-message-who">
                              <span className="qa-message-who-data">{props.item.log_type}</span>
                              </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="qa-message-content">
                        {props.item.description}
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default SingleActivity;