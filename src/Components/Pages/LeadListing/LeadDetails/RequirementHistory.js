const RequirementHistory = () => {
    return (
        <div className="dropdown-menu dropdown-menu-right w-max-300" >
        <ol className="chat">
            <li className="other">
                <div className="msg">
                    <div className="user">User</div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                    <time> 11-10-2012, 20:17</time>
                </div>
            </li>
            <li className="self">
                <div className="msg">
                    <div className="user">Staff <span className="range admin">Admin</span></div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                    <time>  11-10-2012, 20:18</time>
                </div>
            </li>
        </ol>
        </div>
    );
}

export default RequirementHistory;