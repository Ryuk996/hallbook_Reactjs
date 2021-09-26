import React, { useEffect, useState } from "react"
import axios from "axios";
import env from "./settings"
import { useHistory } from "react-router";
export default function BookCustomer(props){

    const [hallName,setHallname]=useState(" ");
    const [customerName,setCustomerName]=useState(" ");
    const [start_Time,setstart_Time]=useState(" ");
    const [end_Time,setend_Time]=useState(" ");
    const [date,setDate]=useState(" ");
    const[isLoading,setLoading]=useState(false)
    const history = useHistory();

    useEffect(()=>{
      axios.get(`${env.api}/halls/${props.match.params.id}`).then((res)=>{
        setHallname(res.data.hallName)
      })
    },[])
   
    
    let handlleSubmit =async(e) => {
      e.preventDefault();
      try {
        setLoading(true)
        let studPut =await axios.put(`${env.api}/book-customer/${props.match.params.id}`,{customerName,start_Time,end_Time,date})
        console.log(studPut)
        setLoading(false)
        history.push("/hall")
      }
      catch{
        console.error();
        setLoading(false)
      }
    }

    return(
        <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Book hall</h1>
      </div>
      <div className="container">
        <form onSubmit={handlleSubmit}>
          <div className='row'>
            <div  className="col-lg-6">
                <label>Hall name</label>
                <input type="text" value={hallName}  className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label>Customer name</label>
                <input type="text" value={customerName} onChange={(e) => {setCustomerName(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label>Start Time</label>
                <input type="time" value={start_Time} onChange={(e) => {setstart_Time(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label>End Time</label>
                <input type="time" value={end_Time} onChange={(e) => {setend_Time(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => {setDate(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-12">
                <input type="submit" value="Update" className="btn btn-primary mt-3"></input>
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}