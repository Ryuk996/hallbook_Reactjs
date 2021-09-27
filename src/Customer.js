import React, { useEffect, useState } from "react"
import axios from "axios"
import env from "./settings"
import { Link, useHistory } from "react-router-dom"

export default function Customer(props){

    const[customerList,setCustomerList]=useState([])
    const[isLoading,setLoading]=useState(true)
    const history = useHistory();
    useEffect(async ()=> {
        try{
      
           let customer= await axios.get(`${env.api}/customers`)
        //    let customerList = customer.json();
            setCustomerList([...customer.data])
        //    console.log(customer.data);
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
            
            let deleteaTask =await axios.delete(`${env.api}/delete-customer/${id}`)
            console.log(deleteaTask)
            let rowIndex = customerList.findIndex(obj => obj.id==id);
            customerList.splice(rowIndex,1);
            setCustomerList([...customerList])

        }
        catch{
            console.log("error");
        }
    }
    }
    return(
        <>
        <h1 class="h3 mb-2 text-gray-800">Customers</h1>
                    
                              <Link to="/create-customer" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style={{marginLeft:"2%"}} >
        <i class="fas fa-download fa-sm text-white-50"></i> Create customer</Link>
        
        <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">DataTables of Customers</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                {
                                    isLoading ? <h1>Loading...</h1> : 
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Customer Name</th>
                                            <th>Start_Time</th>
                                            <th>End_Time</th>
                                            <th>Start date</th>
                                            <th>Action</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>No.</th>
                                            <th>Customer Name</th>
                                            <th>Start_Time</th>
                                            <th>End_Time</th>
                                            <th>Start date</th>
                                            <th>Action</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {
                                            customerList.map((customer,index)=> {
                                                return <tr key= {customer._id} >
                                                    <td>{index + 1}</td>
                                                    <td>{customer.customerName}</td>
                                                    <td>{customer.start_Time}</td>
                                                    <td>{customer.end_Time}</td>
                                                    <td>{customer.date}</td>
                                                    <td><Link to={`/customer/detail/${customer._id}`} className="btn btn-sm btn-primary">View hallDetails</Link></td>
                                                    <td>
                                                    <Link to={`/customer/edit/${customer._id}`} className="btn btn-sm btn-primary">Edit</Link>
                                                    <button  onClick={()=>handleDelete(customer._id)} className="btn btn-sm btn-danger">Delete</button>
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