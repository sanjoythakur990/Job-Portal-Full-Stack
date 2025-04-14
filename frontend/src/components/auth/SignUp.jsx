import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function SignUp() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: "",
  });
  const navigate = useNavigate()
  const { loading, user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  useEffect(() => {
      if(user) {
        navigate("/")
      }
    }, [])

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const chnageFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData()  // using FormData because we're sending a file, without FormData we can't send a file
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if(input.file){
      formData.append("file", input.file)
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      if(res.data.success){
        navigate("/login")
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
          onSubmit={onSubmitHandler}
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="John Doe"
            />
          </div>
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
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="98XXXXXXXX"
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
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                defaultValue={input.file}
                accept="image/*"
                onChange={chnageFileHandler}
              />
            </div>
          </div>
          {
            loading ? <Button className='my-2 w-full'><Loader2 className="h-4 w-4 mr-2 animate-spin" />Please Wait</Button> : 
            <Button type="submit" className="w-full my-2">
            Submit
          </Button>
          }
          <span className="text-sm flex justify-center gap-2">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-500 font-bold hover:text-blue-700"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
