import React from "react";
import Button from "./Button";
import { Award, Calendar, CircleUserRound, CreditCardIcon, Star } from "lucide-react";
import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import { getFeedbackByInterviewId, getUsernameById } from "@/lib/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
 
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  const creator = await getUsernameById(userId ? userId : undefined)
  console.log(creator)
  return (
    <div
      key={interviewId}
      className="w-[24%] max-md:w-full bg-gradient-to-br from-neutral-900 via-black border-2 border-neutral-600 rounded-2xl relative  to-blue-900 flex flex-col p-4 h-96">
      <img src={getRandomInterviewCover()} alt="logo" className="w-32" />
      <div className="absolute inset-0 ">
        <img src="/pattern.png" alt="patttern" />
      </div>
      <h1 className="text-2xl mt-3 font-semibold text-white">
        {role} Interview
      </h1>
      <div className="mt-3 text-sm gap-3 justify-around flex items-center">
        <div className="flex justify-center text-white items-center">
          <Award /> <p>--/100</p>
        </div>
        <div className="flex justify-center text-white items-center">
          <Calendar /> <p>{formattedDate}</p>
        </div>
       
      </div>
      {/* <p className="text-sm text-white mt-3 h-12 ">{interview.description}</p> */}
      <Button href={`/interview/${interviewId}`} className="mt-auto w-full">
        Start Interview
      </Button>

      <p className="text-sm mt-3 text-white/50">Generate By {creator}</p>
    </div>
  );
};

export default InterviewCard;
