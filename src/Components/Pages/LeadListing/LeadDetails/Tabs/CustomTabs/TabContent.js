import {useState, useContext, useEffect} from "react";
import AuthContext from "../../../../../Auth/Auth";
import axios from "axios/index";
import notify from "../../../../../Helpers/Helper";
import {Spinner} from "react-bootstrap"

const TabContent = (props) => {

    const authCtx = useContext(AuthContext);
    const [dataFields, setDataFields] =  useState([]);
    const [button_loading, setButtonLoading] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [fieldsData, setFieldsData] = useState([]);

    const get = (obj, key) => {
        return key.split(".").reduce(function(o, x) {
            return (typeof o == "undefined" || o === null) ? o : o[x];
        }, obj);
    }


    const fetchFields = () => {
        let path = 'data-tabs/get-fields';
        axios.get(path+'?tab_id=' + props.id +'&leads_id='+props.lead_id+'&api_token=' + authCtx.token).then(res => {

            if(res.data.status === "success"){
                setDataFields(res.data.data.fields)


                if(res.data.data.field_data){
                    setFieldsData(JSON.parse(res.data.data.field_data.data))
                    console.log("field data 1:", fieldsData)
                    let f = [...formFields];
                    Object.keys(fieldsData).forEach((key,index) => {
                        f[index] = {};
                        f[index]['field'] = key;
                        f[index]['value'] = fieldsData[key];
                        setFormFields(f);

                    })
                    console.log("field data 2:", fieldsData)
                }
            }else{
                if(res.data.errors){
                    let errors = (res.data.errors.errors);
                    console.log("Erross :", errors)
                    for(const [key, value] of  Object.entries(errors)){
                        notify('error',res.data.code,value);
                    }
                }

            }
        });
    };



        useEffect(() => {
            fetchFields();
        },[button_loading])


        if(props.show !== props.id){
            return <></>;
        }

        const handleFormChange = (e) => {
            let f = [...formFields];
            f[e.target.getAttribute('id')] = {};
            f[e.target.getAttribute('id')]['field'] = e.target.getAttribute('name');
            f[e.target.getAttribute('id')]['value'] = e.target.value;
            setFormFields(f);
            console.log("Form fields : ", formFields);
        }


    const updateContent = async (data) => {
        setButtonLoading(true);
        await axios.post('data-tabs/save-fields?api_token='+authCtx.token,data)
            .then(res => {
                console.log("Response of leads api : ",res.data);
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
                }else{
                    notify(res.data.status,res.data.code,res.data.message);

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
            "tabs_id": props.id,
            "data": formFields
        }
        console.log("Data going to submit" , data);
        updateContent(data);
    }


    const options = (data,selected) => {
        const myArr = data.split(",");
        return myArr.map(obj => {   return <option value={obj} selected={selected===obj? 'true' : 'false'}>{obj}</option> })
    }



    return <div className="tab-pane fade show active"  role="tabpanel"
                aria-labelledby="pills-Activity-tab">
        <div className="qa-message-list">

            <div className="row">

                <div className="col-md-6">
                    { dataFields  ? dataFields.map((obj,index) => <div className="row">
                        <div className="col-md-12"> {console.log(obj)}
                            <label>{obj.name}</label><br />

                            {(obj.field_type === "Small Text") ?
                                <input className="form-control" id={index} name={obj.field_name} type="text"
                                       onChange={handleFormChange}
                                       defaultValue={fieldsData[obj.field_name]? fieldsData[obj.field_name] : ''}
                                /> :

                                <select className="form-control"  id={index} name={obj.field_name} onChange={handleFormChange}>
                                    {options(obj.possible_values,fieldsData[obj.field_name])}
                                </select>

                            }
                        </div>
                    </div>) : ''}
                </div>

                <div className="col-md-6 " >
                    { fieldsData  ? <ul className="list-group custom-key-list">
                        {Object.keys(fieldsData).map((key) =>
                        key ?
                             <li className="list-group-item"><span className="key-field">{key}</span>{fieldsData[key]} </li>
                            :
                            ''
                    )}
                    </ul> :  <></>
                    }
                </div>
            </div>



            { dataFields.length >= 1  ? <button className="btn btn-primary" onClick={handleSubmit}>Submit  {button_loading ? <Spinner className="ml-1" animation="border" size="sm" /> : ''}</button>: ''}
        </div>
    </div>;
}

export default TabContent;