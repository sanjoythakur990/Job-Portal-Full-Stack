import { setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch()
    console.log(" inside useGetAllJobs ");
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                console.log("ksfb");
                
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials: true})
                console.log("yo ", res.data);
                
                if(res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs()
    },[])
} 

export default useGetAppliedJobs;