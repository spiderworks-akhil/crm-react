import SingleStage from "./SingleStage";
import {useState,useEffect,useContext} from  "react";
import "./Stages.css";
import AuthContext from "../../../../Auth/Auth";
import notify from "../../../../Helpers/Helper";
import axios from "axios/index";
import {Spinner,Modal} from "react-bootstrap"

const Stages = (props) => {

    const authCtx = useContext(AuthContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [button_loading, setButtonLoading] = useState(false);
    const [key, setKey] = useState(props.lead_id)

    const [toStatusId, setToStatusId] = useState('');
    const [toStatusName, setToStatusName] = useState('');

    const handleSubmit = () => {
        let data = {
            "leads_id": props.lead_id,
            "stages_id": toStatusId,
            "description": ""
        }
        updateStage(data)
    }

    const updateStage = async (data) => {
        setButtonLoading(true);
        await axios.post('leads/change-stage?api_token='+authCtx.token,data)
            .then(res => {
                console.log("Response of Call api : ",res.data.status);
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
                    setKey(Math.random());
                    handleClose();
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

    const stageClickHandler = (id, name) => {
        setToStatusId(id);
        setToStatusName(name);
        setShow(true);
    }


    const [stagesList, setStagesList] = useState([]);
    useEffect(() => {
        fetchStages();
    },[key])


    const fetchStages = async () => {
        let path = "leads/get-stages";
        await axios.get(path+'?api_token='+authCtx.token+'&leads_id='+props.lead_id).then(res => {

            if(res.data.status === "success"){
                setStagesList(res.data.data)
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
    }

    return <div className="row">
        <Modal show={show} onHide={handleClose}>
            <div className="modal-header">
                <h5 className="modal-title">Stage change</h5>
                <button type="button" className="close" onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">You are going to change the current stage of this lead to <b>{toStatusName}</b>. Are you sure?</div>
            <div className="modal-footer">
                <button type="button" className="btn btn-prm" onClick={handleSubmit}>Yes
                    {button_loading ? <Spinner className="ml-1" animation="border" size="sm" /> : ''}
                </button>
                <button type="button" className="btn btn-secondary"  onClick={handleClose}>No</button>
            </div>
        </Modal>

        <div className="col-md-12">
            <div className="arrow-steps  mt-3">
                {stagesList.map(obj => <SingleStage onStageClick={stageClickHandler} id={obj.id} name={obj.name} current={obj.is_current}  finished={obj.is_finished} /> )}
            </div>

            <div className="btn-group float-right">
                <button type="button" className="btn  btn-prm   " data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    Close <i className="ri-arrow-down-s-fill ml-2 float-right"></i>
                </button>
            </div>
        </div>
    </div>;
}

export default Stages;
