import AddNote from './AddNote'
import './ToolBar.css'
import AddLabel from "./AddLabel";
import AddCall from "./AddCall";


const ToolBar = (props) => {


    return (
        <div className="row">

            <div className="col-md-5">
                <AddLabel lead_id={props.lead_data.id}/>
            </div>

            <div className="col-md-7  ">
                <div className="d-flex justify-content-end pb-2">
                   <AddNote lead_id={props.lead_data.id} />
                   <AddCall lead_id={props.lead_data.id} />
                </div>
            </div>

        </div>
    );
}

export default ToolBar;