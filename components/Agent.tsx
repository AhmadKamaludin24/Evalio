"use client";
import React, { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constans/audio-wave.json";
import { cn } from "@/lib/utils";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

const Agent = ({name} : {name: string | undefined}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(true);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.ACTIVE);
  const messages = [
    "Whats your name",
    "my name is Kamal"
  ]

  const lastMessage = messages[messages.length -1]
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  return (
    <div className="flex flex-col">
      <div className="w-full  items-center h-[35rem] flex mt-4 gap-5 justify-between ">
        <div className="w-1/2 relative max-sm:w-full bg-gradient-to-b from-cyan-950 flex flex-col justify-center items-center to-black rounded-2xl border-2 border-neutral-900 h-[90%]">
          <img
            src="/chatbot.png"
            alt="AI avatar"
            className={cn(
              "w-44",
              callStatus === CallStatus.CONNECTING &&
                "opacity-100 animate-pulse"
            )}
          />
          <div className="ralative w-full">
            <h1
              className={cn(
                "text-4xl text-center left-1/2 -translate-x-1/2 absolute font-semibold text-white mt-4 transition-opacity duration-1000",
                isSpeaking ? "opacity-0" : "opacity-100"
              )}>
              Evalio - AI Interviewer
            </h1>
          </div>
          <div
            className={cn(
              " transition-opacity duration-1000",
              callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
              isSpeaking ? "opacity-100" : "opacity-0"
            )}>
            <Lottie
              lottieRef={lottieRef}
              animationData={soundwaves}
              autoplay={true}
              className="w-[300px]"
            />
          </div>
        </div>
        <div className="w-1/2 max-sm:hidden bg-gradient-to-b from-neutral-900 to-black rounded-2xl border-2 border-neutral-900 h-[90%] flex flex-col justify-center gap-5 items-center">
          <div className="w-44 h-44 bg-amber-50 rounded-full"></div>
          <h1 className="font-semibold text-4xl">{name ?? ""}</h1>
        </div>
      </div>

      <div className="w-full h-[5rem] bg-gradient-to-b from-neutral-900 to-black rounded-2xl border-2 border-neutral-900 flex justify-center items-center">
        <p key={lastMessage} className={cn("transition-opacity duration-500 opacity-0", "animate-fadeIn opacity-100")}>{lastMessage}</p>
      </div>

      <button className={`p-4 w-32 mt-7 mx-auto rounded-full ${callStatus === CallStatus.ACTIVE ? "bg-red-500" : callStatus === CallStatus.CONNECTING ? "bg-amber-500" : "bg-green-500"}`} >
        {callStatus === CallStatus.ACTIVE ? "End Session" : callStatus === CallStatus.CONNECTING ? "Connecting" : "Start Session"}
      </button>
    </div>
  );
};

export default Agent;
