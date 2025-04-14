import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skill) => skill),
    file: user?.profile?.resume,
  });

  function changeEventHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills)
    if(input.file){
        formData.append("file", input.file)
    }
    
    try {
        setLoading(true)
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        if(res.data.success){
            dispatch(setUser(res.data.userObj))
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    } finally{
        setLoading(false)
        setOpen(false)
    }
    
  }

  const onFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input, file})
  }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="fullname"
                  type="text"
                  onChange={changeEventHandler}
                  value={input.fullname}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={changeEventHandler}
                  value={input.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="number" className="text-right">
                  Ph No.
                </Label>
                <Input
                  id="number"
                  name="phoneNumber"
                  type="text"
                  onChange={changeEventHandler}
                  value={input.phoneNumber}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="bio" type="text" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  name="skills"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={onFileHandler}
                  accept="application/pdf"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="my-2 w-full">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-2">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
