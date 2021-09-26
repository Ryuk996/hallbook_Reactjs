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
        
           let customer= await axios.get(`${env.api}/hall-details/${props.match.params.id}`)
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
        <h1 class="h3 mb-2 text-gray-800">customers</h1>
                    <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                        For more information about DataTables, please visit the <a target="_blank"
                            href="https://datatables.net">official DataTables documentation</a>.</p>
                              <Link to="/create-customer" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" style={{marginLeft:"2%"}} >
        <i class="fas fa-download fa-sm text-white-50"></i> Createcustomer</Link>
        
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
                                            <th>Customer name</th>
                                            <th>Amenities</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>No.</th>
                                            <th>Hall name</th>
                                            <th>Customer name</th>
                                            <th>Amenities</th>
                                            <th>Price</th>
                                            
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {
                                            customerList.map((customer,index)=> {
                                                return <tr key= {customer._id} >
                                                    <td>{index + 1}</td>
                                                    <td>{customer.hallName}</td>
                                                    <td>{customer.customersName}</td>
                                                    <td>{customer.amenities}</td>
                                                    <td>{customer.price}</td>
                                                    
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

