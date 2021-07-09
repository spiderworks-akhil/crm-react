import AuthContext from "../../../../Auth/Auth";
import {useState,useEffect,useContext} from  "react";
import axios from "axios/index";
import notify from "../../../../Helpers/Helper";

const Notes = (props) => {
    const authCtx = useContext(AuthContext);

    const [notesList, setNotesList] = useState([]);
    useEffect(() => {
        fetchNotes();
    },[])

    const fetchNotes = async () => {
        let path = "leads/notes";
        await axios.get(path+'?api_token='+authCtx.token+'&leads_id='+props.lead_id).then(res => {
console.log(res.data.data)
            if(res.data.status === "success"){
                notify(res.data.status,res.data.code,res.data.message);
                setNotesList(res.data.data.activities)
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


    return (<>Notes</>);

}

export default Notes;