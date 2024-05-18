import {createContext, useState} from "react";
import run from "../config/gemini";

export const Context=createContext();

const ContextProvider=(props)=>{
    const [input,setInput]=useState("");
    const [recentprompt,setRecentprompt]=useState("");
    const [previousprompts,setPreviousprompts]=useState([]);
    const [showresult,setShowresult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");
     const onSent=async(prompt)=>{
        setResultData("");
          setLoading(true);
          setShowresult(true);
          setRecentprompt(input);
          const response= await run(input);
          setResultData(response);
          setLoading(false);
          setInput("");
        }
        
    const contextValue={
       previousprompts,
       setPreviousprompts,
       onSent,
       setRecentprompt,
       recentprompt,
       showresult,
       loading,
       resultData,
       input,
       setInput
    }

    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    )
}

export default ContextProvider;