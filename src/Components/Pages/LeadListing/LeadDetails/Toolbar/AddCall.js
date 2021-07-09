import axios from "axios/index";
import notify from "../../../../Helpers/Helper";
import {Spinner} from "react-bootstrap"
import {useState,useContext} from "react"
import AuthContext from "../../../../Auth/Auth";

const AddCall = (props) => {
    const authCtx = useContext(AuthContext);

    const [button_loading, setButtonLoading] = useState(false);
    const [call, setCall] = useState("");

    const handleCallChange = (e) => {
        setCall(e.target.value);
    }

    const updateCall = async (data) => {
        setButtonLoading(true);
        await axios.post('call-logs/store?api_token='+authCtx.token,data)
            .then(res => {
                console.log("Response of Call api : ",res.data.status);
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
                }else{
                    if(res.data.errors){
                        let errors = (res.data.errors.errors);
                        console.log("Erross :", errors)
                        for(const [key, value] of  Object.entries(errors)){
                            notify('error',res.data.code,value);
                        }
                    }
                }
            })
        setButtonLoading(false);
    }


    const handleSubmit = () => {
        let data = {
            "leads_id": props.lead_id,
            "title":"NA",
            "description": call,
            "created_by" : 1,
            "updated_by" : 1,
        }
        updateCall(data)
        setCall("");
    }

    return (
        <div className="btn-group mr-1">
            <button type="button" className="btn def-btn  btn-icon" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                <i className="ri-phone-line" data-toggle="tooltip" data-placement="bottom"
                   title="Add Note"/>
            </button>
            <div className="dropdown-menu dropdown-menu-right pad-20 w-auto">
                <form>
                    <div className="form-group m-0">
                        <p className="form-check-label m-0">
                            <b> Add Call log</b>
                        </p>
                    </div>
                    <hr className="mt-2"/>
                    <div className="form-group">
                        <textarea className="form-control" placeholder="Enter Note" onChange={handleCallChange} rows="2" />
                    </div>
                    <button type="button" className="btn btn-prm" onClick={handleSubmit}>Save{button_loading ? <Spinner className="ml-1" animation="border" size="sm" /> : ''}</button>
                    <button type="button" className="btn btn-prm"> Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddCall;