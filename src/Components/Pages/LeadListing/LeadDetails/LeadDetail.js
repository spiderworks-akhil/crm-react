import RequirementHistory from './RequirementHistory'
import Name from './Name';
import Company from "./Company";
import Email from "./Email";
import Phone from "./Phone";
import Owner from "./Owner";
import Place from "./Place";
import DateTime from "./Date";
import EditLead from "./EditLead";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import ToolBar from "./Toolbar/ToolBar";
import Activity from "./Tabs/Activity"
import Notes from "./Tabs/Notes"
import Calls from "./Tabs/Calls"


const LeadDetail = (props) => {

    const [title,setTitle] = useState(props.lead_data.title)
    const [name,setName] = useState(props.lead_data.name)
    const [primary_contact_id,setPrimaryContactId] = useState(props.lead_data.primary_contact_id)
    const [phone_number,setPhoneNumber] = useState(props.lead_data.phone_number)
    const [email,setEmail] = useState(props.lead_data.email)
    const [requirement,setRequirement] = useState(props.lead_data.requirement)
    const [company_name,setCompanyName] = useState(props.lead_data.company_name)
    const [created_by,setCreatedBy] = useState(props.lead_data.created_by)
    const [created_at,setCreatedAt] = useState(props.lead_data.created_at)
    const [updated_at,setUpdatedAt] = useState(props.lead_data.updated_at)

    const [showActivityTab,setShowActivityTab] = useState(true);
    const [showNotesTab,setShowNotesTab] = useState(false);
    const [showCallTab,setShowCallTab] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowActivity = () => {
        setShowNotesTab(false);
        setShowCallTab(false);
        setShowActivityTab(true);
    }

    const handleShowNotes = () => {
        setShowActivityTab(false);
        setShowCallTab(false);
        setShowNotesTab(true);
    }

    const handleShowCalls = () => {
        setShowNotesTab(false);
        setShowActivityTab(false);
        setShowCallTab(true);
    }

    const onLeadUpdateHandler = (id) =>{
        props.onLeadupdate(id)
    }

    if(!props.lead_data){
        return <p>Please select a lead</p>;
    }
    const short_name = props.lead_data.name.substring(0,2).toUpperCase();
    return (
        <div>
            <ToolBar lead_data={props.lead_data} />
            <div className="box-shadow pad-10 lead-right-item">
            <Modal show={show} onHide={handleClose}>
                <EditLead onCloseModal={handleClose} onLeadUpdate={onLeadUpdateHandler} lead_data={props.lead_data} lead_id={props.lead_data.id} />
            </Modal>
            <div className="row  lead-left-item mb-2">
                <div className="col-md-12">
                    <div className=" lead-left-item   ">
                        <div className="btn-group float-right">
                            <button type="button" className="btn def-btn  btn-icon" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                <i className="ri-more-2-fill"/>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <button className="dropdown-item" type="button" onClick={handleShow}>Edit Lead</button>
                            </div>
                        </div>
                        <div className="name-cntr">{short_name}</div>
                        <div className=" user-spec ">
                           <span className=" f-14 font-medium text-truncate black">  {title? title : 'Create a lead title.....'}
                           <a className="d-inline-block" href="#" onClick={handleShow}>
                           <i className="ri-pencil-line  "/></a>
                           </span><br/>
                            <span className="  user-info-deta">
                              <a href="#" className="point-drop float-right" data-toggle="dropdown" aria-haspopup="true"
                                 aria-expanded="false">  <i className="ri-arrow-down-s-fill"/>  </a>
                                {requirement}
                                <RequirementHistory/>
                           </span>
                        </div>
                        <div className="clearfix"/>
                    </div>
                </div>
            </div>

            <div className="row m-0 lead-details">
                <Name primary_contact_id={primary_contact_id} name={props.lead_data.name} lead_id={props.lead_data.id}/>
                <Company company={company_name} />
                <Email showModal={handleShow} email={email}/>
                <Phone showModal={handleShow} phone={phone_number}/>
            </div>
            <hr className="mt-2 mb-2"/>
            <div className="row m-0 lead-details">
                <Owner owner={created_by}/>
                <Place place="unknown"/>
                <DateTime date={created_at}/>
                <DateTime date={updated_at}/>
            </div>

                <hr/>


                <ul className="nav nav-pills mb-3 tabs-cntr" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="pills-Activity-tab" data-toggle="pill"
                           role="tab" aria-controls="pills-Activity" aria-selected="true" onClick={handleShowActivity}>Activity</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="pills-Notes-tab" data-toggle="pill"  role="tab"
                           aria-controls="pills-Notes" aria-selected="false"  onClick={handleShowNotes}>Notes</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="pills-Calls-tab" data-toggle="pill"  role="tab"
                           aria-controls="pills-Calls" aria-selected="false"  onClick={handleShowCalls}>Calls</a>
                    </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">
                    {showActivityTab ? <Activity lead_id={props.lead_data.id} /> : '' }
                    {showNotesTab ? <Notes lead_id={props.lead_data.id} /> : '' }
                    {showCallTab ? <Calls lead_id={props.lead_data.id} /> : '' }
                </div>

            </div>
        </div>
    );
}

export default LeadDetail;