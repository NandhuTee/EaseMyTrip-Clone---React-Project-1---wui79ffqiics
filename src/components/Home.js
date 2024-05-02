import React,{useState} from "react";
function Home(){
    const [color,setColor]=useState("");
    const[isRed,setIsRed]=useState(false);
    const[isBlue,setIsBlue]=useState(false);
    const red=()=>{
        setIsRed(!isRed);
    }
    const blue=()=>{
        setIsBlue(!isBlue);
    }
    return(
        <div className="w-[100%] h-[100vh] flex justify-center items-center">
            {isRed?(<div className="w-[200px] h-[200px] border border-solid border-red-500 rounded-[50%] flex justify-center items-center">
                {isBlue ? (<div className="w-[50%] h-[50%] rounded-[50%] border border-solid border-blue-500"></div>):(<div className="w-[50%] h-[50%] rounded-[50%] border border-solid border-red-500"></div>)}
                
            </div>):(<div className="w-[200px] h-[200px] border border-solid border-blue-500 rounded-[50%] flex justify-center items-center">
                {isBlue ? (<div className="w-[50%] h-[50%] rounded-[50%] border border-solid border-blue-500"></div>):(<div className="w-[50%] h-[50%] rounded-[50%] border border-solid border-red-500"></div>)}
            </div>)}
            <button onClick={blue}>Blue</button>
                <button onClick={red}>red</button>
        </div>
        
    )
}
export default Home;