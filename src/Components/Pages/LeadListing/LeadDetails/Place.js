const Place = (props) => {
    return (
        <div className="col-md-3 pl-0">
            <div className="lead-details-item">
                        <span className=" d-flex align-items-center">
                            <i className="ri-building-2-line" data-toggle="tooltip" data-placement="bottom"
                               title="Branch"></i><b> {props.place}</b> <a href="#" className="point-drop"
                                                                                data-toggle="dropdown"
                                                                                aria-haspopup="true"
                                                                                aria-expanded="false">  <i
                            className="ri-arrow-down-s-fill"></i>  </a>
                           <div className="dropdown-menu dropdown-menu-right">
                              <button className="dropdown-item" type="button">Action 33</button>
                              <button className="dropdown-item" type="button">Another action</button>
                              <button className="dropdown-item" type="button">Something else here</button>
                           </div>
                        </span>
            </div>
            <hr/>
        </div>
    );
}

export default Place;