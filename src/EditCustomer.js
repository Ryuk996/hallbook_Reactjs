import React, { useState, useEffect } from "react"

import axios from "axios";
import env from "./settings"
import { useHistory } from "react-router-dom";

export default function EditCustomer(props){

    const [customerName,setCustomerName]=useState(" ");
    const [start_Time,setstart_Time]=useState(" ");
    const [end_Time,setend_Time]=useState(" ");
    const [date,setDate]=useState(" ");

    const [task,setTask]=useState(" ");

    const[isLoading,setLoading]=useState(false)
    const history = useHistory();
    useEffect(()=>{
        axios.get(`${env.api}/customers/${props.match.params.id}`).then((res)=>{
          setCustomerName(res.data.customerName)
          setstart_Time(res.data.start_Time)
          setend_Time(res.data.end_Time)
        })
      },[])
    
    let handlleSubmit =async(e) => {
      e.preventDefault();
      
      try {
        setLoading(true)
     
        let putcustomer= await axios.put(`${env.api}/update-customer/${props.match.params.id}`,{customerName,start_Time,end_Time,date});
        alert(putcustomer.data)
        setLoading(false)
        history.push("/customer")
      }
      catch{
        console.error();
        setLoading(false)
      }
    }

    return(
        <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Edit Customer</h1>
      </div>
      <div className="container">
        <form onSubmit={handlleSubmit}>
          <div className='row'>
            <div  className="col-lg-6">
                <label>Customer name</label>
                <input type="text" value={customerName} onChange={(e) => {setCustomerName(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label>start_Time</label>
                <input type="time" value={start_Time} onChange={(e) => {setstart_Time(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label>end_Time</label>
                <input type="time" value={end_Time} onChange={(e) => {setend_Time(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label> Date</label>
                <input type="date" value={date} onChange={(e) => {setDate(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-12">
                <input type="submit" value="submit" className="btn btn-primary mt-3" disabled={isLoading}></input>
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}