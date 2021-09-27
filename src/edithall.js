import React, { useEffect, useState } from "react"
import axios from "axios";
import env from "./settings"
import { useHistory } from "react-router";
export default function EditHall(props){

    const [hallName,setHallname]=useState(" ");
    const [no_Seats,setNo_seats]=useState(" ");
    const [amenities,setAmenities]=useState(" ");
    const [price,setPrice]=useState(" ");
    const[isLoading,setLoading]=useState(false)
    const history = useHistory();

    useEffect(()=>{
      axios.get(`${env.api}/halls/${props.match.params.id}`).then((res)=>{
        setHallname(res.data.hallName)
        setNo_seats(res.data.no_Seats)
        setAmenities(res.data.amenities)
      })
    },[])
    
    
    let handlleSubmit =async(e) => {
      e.preventDefault();
      try {
        setLoading(true)
        
        let studPut =await axios.put(`${env.api}/update-hall/${props.match.params.id}`,{hallName,no_Seats,amenities,price})
        console.log(studPut)
        setLoading(false)
        history.push("/room")
      }
      catch{
        console.error();
        setLoading(false)
      }
    }

    return(
        <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Edit Hall</h1>
      </div>
      <div className="container">
        <form onSubmit={handlleSubmit}>
          <div className='row'>
            <div  className="col-lg-6">
                <label>Room name</label>
                <input type="text" value={hallName} onChange={(e) => {setHallname(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label>No_Seats</label>
                <input type="text" value={no_Seats} onChange={(e) => {setNo_seats(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label>Amenities</label>
                <input type="text" value={amenities} onChange={(e) => {setAmenities(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-6">
                <label>Price</label>
                <input type="price" value={price} onChange={(e) => {setPrice(e.target.value)}} className="form-control"></input>
            </div>
            <div  className="col-lg-12">
                <input type="submit" value="Upprice" className="btn btn-primary mt-3"></input>
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}