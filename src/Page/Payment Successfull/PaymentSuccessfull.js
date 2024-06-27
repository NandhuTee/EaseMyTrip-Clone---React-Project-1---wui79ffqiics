import React from 'react'
import "./PaymentSuccess.css";
import { useNavigate } from 'react-router'

function PaymentSuccessfull() {
  const navigate = useNavigate()
  const handleNavigate = ()=>{
    navigate("/")
  }
  return (
    <div className='PaymentSuccessfull_Parent'>
        <div className="w-[30%] max-[600px]:w-[90%] h-[30%] bg-[#fff] rounded-[10px] flex flex-col justify-center items-center">
            <h3 className="max-[600px]:w-[70%] max-[600px]:justify-center">Payment Successful and SuccessFully Booked!</h3>
            <p className='text-[12px] text-[#6a6868] mt-[5px] items-center'>Click on button for Confirm and Go to Home Page</p>
            <button onClick={handleNavigate} className="bg-[#ef6614] text-[#fff] text-[19px] mt-[20px] h-[45px] border-none cursor-pointer rounded-[40px] flex justify-center items-center w-[90%]">Click To continue</button>
        </div>
    </div>
  )
}

export default PaymentSuccessfull