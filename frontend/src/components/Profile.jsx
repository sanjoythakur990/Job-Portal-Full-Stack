import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const skills = ["Html", "Css", "JavaScript", "ReactJs"];
const isResume = true;
function Profile() {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth)
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto border border-gray-200 bg-white rounded-2xl my-5 p-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src="https://img.freepik.com/free-vector/business-logo_23-2147503133.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user.profile?.skills.length !== 0 ? (
              user.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user.profile?.resume ? (
            <a
              target="blank"
              href={user.profile?.resume}
              // href={`https://docs.google.com/viewer?url=${encodeURIComponent(user.profile?.resume)}&embedded=true`}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl bg-white">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Application Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
