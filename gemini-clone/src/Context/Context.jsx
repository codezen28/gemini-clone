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

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord)
        },15*index)
    }

    const newChat=()=>{
        setLoading(false);
        setShowresult(false);

    }

     const onSent=async(prompt)=>{
        setResultData("");
          setLoading(true);
          setShowresult(true);
          let response;
          if(prompt!==undefined){
            response= await run(prompt);
            setRecentprompt(prompt);
          }
          else{
            setPreviousprompts(prev=>[...prev,input])
             setRecentprompt(input);
             response= await run(input);
          }
         
        
          
          let responseArray=response.split("**");
          let newResponse="";
          for(let i=0;i<responseArray.length;i++)
            {
            if( i%2===0){
                newResponse=newResponse + responseArray[i];
            }
            else{
                newResponse= newResponse + "<b>" + responseArray[i] + "</b>";
            }
          }
          let newResponse2=newResponse.split("*").join("<br>");
          let newResponseArray = newResponse2.split("");
          for (let i = 0; i < newResponseArray.length; i++) {
              const nextWord = newResponseArray[i];
              delayPara(i, nextWord + "");
          setLoading(false);
          setInput("");
        }
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
       setInput,newChat
    }

    

    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    )
}

export default ContextProvider;