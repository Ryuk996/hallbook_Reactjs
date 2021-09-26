import React, { useEffect, useState } from "react"
import axios from "axios"
import env from "./settings"
import { Link, useHistory } from "react-router-dom"

export default function Halls(props){

    const[hallList,setHallList]=useState([])
    const[isLoading,setLoading]=useState(true)
    const history = useHistory();
    useEffect(async ()=> {
        try{
        
           let hall= await axios.get(`${env.api}/halls`)
        //    let hallList = hall.json();
            setHallList([...hall.data])
        //    console.log(hall.data);
            setLoading(false)
        }
        catch(error){
            console.log(error);
            setLoading(false)
        }
        

    },[])

    let handleDelete =async (id) => {
        let confirm= window.confirm("Are you sure want to delete ?")
        if(confirm){
        try{
            let deleteaTask =await axios.delete(`${env.api}/delete-hall/${id}`)
            console.log(deleteaTask)
            let rowIndex = hallList.findIndex(obj => obj.id==id);
            hallList.splice(rowIndex,1);
            setHallList([...hallList])

        }
        catch{
            console.log("error");
        }
    }
    }
    return(
        <>
        <h1 class="h3 mb-2 text-gray-800">halls</h1>
                    <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                        For more information about DataTables, please visit the <a target="_blank"
                            href="https://datatables.net">official DataTables documentation</a>.</p>
                              <Link to="/create-hall" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style={{marginLeft:"2%"}} >
        <i class="fas fa-download fa-sm text-white-50"></i> Createhall</Link>
        
        <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                {
                                    isLoading ? <h1>Loading...</h1> : 
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Hall name</th>
                                            <th>No.seats</th>
                                            <th>Amenities</th>
                                            <th>Price</th>
                                            <th>Customer Name</th>
                                            <th>Action</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>No.</th>
                                            <th>Hall name</th>
                                            <th>No.seats</th>
                                            <th>Amenities</th>
                                            <th>Price</th>
                                            <th>Customer Name</th>
                                            <th>Action</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {
                                            hallList.map((hall,index)=> {
                                                return <tr key= {hall._id} >
                                                    <td>{index + 1}</td>
                                                    <td>{hall.hallName}</td>
                                                    <td>{hall.no_Seats}</td>
                                                    <td>{hall.amenities}</td>
                                                    <td>{hall.price}</td>
                                                    <td>{hall.customersName}</td>
                                                   
                                                    <td><Link to={`/hall/book/${hall._id}`} className="btn btn-sm btn-primary">Book</Link></td>
                                                    <td>
                                                    <Link to={`/hall/edit/${hall._id}`} className="btn btn-sm btn-primary">Edit</Link>
                                                    <button  onClick={()=>handleDelete(hall._id)} className="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                                    
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                                }
                            </div>
                        </div>
                    </div>
                    </>
    )
}