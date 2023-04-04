import { useEffect, useState } from 'react'
import axios from 'axios';

 const useFetch = (url:string) => {
    const [data, setData]=useState<any|[]>([]);
    const [loading,setLoading]=useState(false);
    const [refetchData,setRefetchData]=useState(false);
    const [error, setError] =useState<any|string>();
    useEffect(()=>{
       const fetchData =async()=>{ 
        setLoading(true);
        setRefetchData(false)
        try{
            const response = await axios.get(url, {
                headers: {
                  'Authorization': 'Bearer ' + process.env.REACT_APP_JSON_SECRET,
                  'Content-Type': 'application/json'
                }
              })
            setData(response.data)
        }catch(error){
            setError(error)
            console.log(error)
        }
        setLoading(false);
       }
       fetchData()
    },[url,refetchData])   
    return {data,loading, error,setRefetchData}
}

export default useFetch