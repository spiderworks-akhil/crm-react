import axios from "axios/index";
import {useState,useEffect,useContext} from  "react";
import {Spinner} from "react-bootstrap"
import notify from "../../../../Helpers/Helper";
import AuthContext from "../../../../Auth/Auth";
import Select from 'react-select'

const Warranty = (props) => {

    const authCtx = useContext(AuthContext);
    const [key, setKey] = useState(Math.random());

    const [productName, setProductName] = useState(props.lead_data.other_product);
    const [productId, setProductId] = useState(props.lead_data.products_id);

    const [warrantyTypes, setWarrantyTypes] = useState([]);
    const [serviceCenters, setServiceCenters] = useState([]);
    const [products, setProducts] = useState([]);

    const [serviceCenterID, setServiceCenterID] = useState(null);
    const [warrantyTypeId, setWarrantyTypeId] = useState(null);
    const [purchaseDate, setPurchaseDate] = useState('');
    const [purchaseValue, setPurchaseValue] = useState('');
    const [amountReceived, setAmountReceived] = useState('');
    const [amountPaid, setAmountPaid] = useState('');

    const [warrantyTypeName, setWarrantyTypeName] = useState('');

    // Handle Changes
    const ProductChangeHandler = (e) => { setProductId(e.value); }
    const ProductNameChangeHandler = (e) => {setProductName(e.target.value)}
    const serviceCenterChangeHandler = (e) => { setServiceCenterID(e.value); }
    const warrantyTypeHandler = (e) => { setWarrantyTypeId(e.value); }

    const PurchaseDateHandler = (e) => {setPurchaseDate(e.target.value)}
    const PurchaseValueHandler = (e) => {setPurchaseValue(e.target.value)}
    const AmountReceivedHandler = (e) => {setAmountReceived(e.target.value)}
    const AmountPaidHandler = (e) => {setAmountPaid(e.target.value)}


    const fetchWarrantyTypes = async () => {
        let path = "leads/get-warranty-types";
        await axios.get(path+'?api_token='+authCtx.token).then(res => {
            console.log(res.data);
            if(res.data.status === "success"){
                setWarrantyTypes(res.data.data);
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

    const fetchServiceCenters = async () => {
        let path = "leads/get-service-centers";
        await axios.get(path+'?api_token='+authCtx.token).then(res => {
            console.log(res.data);
            if(res.data.status === "success"){
                setServiceCenters(res.data.data);
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

    const fetchProducts = async () => {
        let path = "products";
        await axios.get(path+'?api_token='+authCtx.token).then(res => {
            console.log(res.data);
            if(res.data.status === "success"){
                setProducts(res.data.data.products);
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

    const fetchWarrantyDetails = async () => {
        let path = "leads/get-warranty";
        await axios.get(path+'?api_token='+authCtx.token+'&leads_id='+props.lead_id).then(res => {
            console.log(res.data);
            if(res.data.status === "success"){
                setProductId(res.data.data.products_id);
                setPurchaseDate(res.data.data.purchase_date);
                setWarrantyTypeId(res.data.data.warranty_types_id);
                setPurchaseValue(res.data.data.product_value);
                setAmountReceived(res.data.data.amount_received);
                setAmountPaid(res.data.data.amount_paid);
                setServiceCenterID(res.data.data.service_centers_id);

                setWarrantyTypeName(res.data.data.warranty_type.name);
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

    let productOptions = products.map(function (obj) {
        return { value: obj.product_name, label: obj.product_name };
    })
    let serviceCenterOptions = serviceCenters.map(function (obj) {
        return { value: obj.id, label: obj.name };
    })
    let warrantyTypeOptions = warrantyTypes.map(function (obj) {
        return { value: obj.id, label: obj.name };
    })


    const updateWarrantyDetails = async () => {


        let data = {
            leads_id: props.lead_id,
            products_id: productId,
            purchase_date: purchaseDate,
            warranty_types_id: warrantyTypeId,
            product_value: parseFloat(purchaseValue),
            amount_received:  parseFloat(amountReceived),
            amount_paid:  parseFloat(amountPaid),
            service_centers_id: serviceCenterID
        }

        await axios.post('leads/warranty-save?api_token='+authCtx.token,data)
            .then(res => {
                if(res.data.status === "success"){
                    notify(res.data.status,res.data.code,res.data.message);
                    setKey(Math.random());
                }else{
                    if(res.data.errors){
                        let errors = (res.data.errors.errors);
                        for(const [key, value] of  Object.entries(errors)){
                            notify('error',res.data.code,value);
                        }
                    }
                }
            })
    }

    const submitHandler = () => {
        updateWarrantyDetails();
    }

    useEffect(() => {
        fetchServiceCenters();
        fetchWarrantyTypes();
        fetchProducts();
        fetchWarrantyDetails();
    }, [key])

    return (
        <div className="row">


            <div className="col-md-6">

                <label>Choose a product</label>
                <Select options ={productOptions}
                        value = {productOptions.filter(option => option.label === productId)}  onChange={ProductChangeHandler}/>


                {serviceCenterOptions.length > 0 ?
                    <>
                        <label>Choose a service center</label>
                        <Select options={serviceCenterOptions}
                                value = {serviceCenterOptions.filter(option => option.value === serviceCenterID)}
                                onChange={serviceCenterChangeHandler}/>
                    </> : ''}

                <label>Choose a warranty type</label>
                <Select options={warrantyTypeOptions} onChange={warrantyTypeHandler}
                        value = {warrantyTypeOptions.filter(option => option.value === warrantyTypeId)}
                />

                <label>Purchase Date</label>
                <input type="date" className="form-control" onChange={PurchaseDateHandler} value={purchaseDate}/>

                <label>Purchase Value</label>
                <input className="form-control" onChange={PurchaseValueHandler} value={purchaseValue}/>

                <label>Amount Received</label>
                <input className="form-control" onChange={AmountReceivedHandler} value={amountReceived}/>

                <label>Amount Paid</label>
                <input className="form-control" onChange={AmountPaidHandler} value={amountPaid}/>

                <hr/>
                <button className="btn btn-primary" onClick={submitHandler}>Update</button>




            </div>
            <div className="col-md-6">
                <ul className="custom-key-list">
                    <li><span>Product Name</span>{productId}</li>
                    <li><span>Warranty type</span>{warrantyTypeName}</li>
                    <li><span>Purchase Date</span>{purchaseDate}</li>
                    <li><span>Purchase Value</span>{purchaseValue}</li>
                    <li><span>Amount Received</span>{amountReceived}</li>
                    <li><span>Amount Paid</span>{amountPaid}</li>
                </ul>
            </div>
        </div>
    );
}

export default Warranty;
