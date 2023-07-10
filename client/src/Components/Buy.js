import { useState } from "react";
import {ethers} from 'ethers'

const Buy = (state) =>{
    const[name,setName] = useState("");
    const [message,setMessage] = useState("");
    const [price,setPrice] = useState(0.0);
    const[processing,setProcessing] = useState(false)


    const buyChai = async (event)=>{
        try{
            setProcessing(true)
            event.preventDefault();
            const {contract} = state.state;        
            const eths = {value:ethers.utils.parseEther(price.toString())}
            const transaction = await contract.buyChai(name,message,eths);
            await transaction.wait();
        }catch(e){
            console.log(e)
        }
        setProcessing(false)
    }

    return (
        <>
            <div className="bg-top pt-5">
                <form onSubmit={buyChai} className="container bg-light-10 p-4 rounded">
                    <div className="row py-5">

                        <div className="col-sm-4">
                            <label htmlFor="name" className="fw-bold text-light d-flex my-2">Enter Name</label>
                            <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" placeholder="Enter your name"></input>
                        </div>

                        <div className="col-sm-4">
                            <label htmlFor="message" className="fw-bold text-light d-flex my-2">Enter Message</label>
                            <input className="form-control" value={message}  onChange={(e)=>setMessage(e.target.value)} type="text" id="message" placeholder="Enter your message"></input>
                        </div>


                        <div className="col-sm-4">
                            <label htmlFor="amount" className="fw-bold text-light d-flex my-2">Enter amount</label>
                            <input className="form-control" value={price} onChange={(e)=>setPrice(e.target.value)} type="number" id="amount" placeholder="Enter amount"></input>
                        </div>

                    </div>
                    <div className="d-flex w-100 justify-content-right">
                    <button className="btn ms-auto btn-dark px-4" type="submit">
                        {(processing)?<><span className="spinner-border p-2 spinner-border-sm mx-2" role="status" aria-hidden="true"></span></>:<></>}
                        Pay
                    </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Buy