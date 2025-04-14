import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { loading } = useSelector(auth => auth.slice) 
  const { loading, user } = useSelector(store => store.auth);

  useEffect(() => {
    if(user) {
      navigate("/")
    }
  }, [])

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
  
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if(res.data.success){
        dispatch(setUser(res.data.userObj))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex align-center justify-center max-w-7xl mx-auto">
        <form
        onSubmit={loginHandler}
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex align-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className='my-2 w-full'><Loader2 className="h-4 w-4 mr-2 animate-spin" />Please Wait</Button> : 
            <Button type="submit" className="w-full my-2">
            Login
          </Button>
          }
          
          <span className="text-sm flex justify-center gap-2">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-500 font-bold hover:text-blue-700"
            >
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
