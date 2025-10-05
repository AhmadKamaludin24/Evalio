"use client";
import React, { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constans/audio-wave.json";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { interviewer } from "@/constans";
import { createFeedback } from "@/lib/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  username,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: {
  username: string | undefined;
  userId: string | undefined;
  interviewId?: string;
  feedbackId?: string;
  type: string | undefined;
  questions?: string[] | null;
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([
    { role: "assistant", content: `Hi ${username}! Let's start the interview` },
  ]);
  const router = useRouter();

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log(error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    console.log("generate feedback here");

    const { success, feedbackId: id } = await createFeedback({
      interviewId: interviewId!,
      userId: userId!,
      transcript: messages,
      feedbackId,
    });

    if (success && id) {
      router.push(`/interview/${interviewId}/feedback`);
    } else {
        console.log("Error saving feedback");
        router.push("/");
      }
  };

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, type, userId]);

  const handleCall = async () => {
    navigator.mediaDevices?.enumerateDevices().then((devices) => {
      const hasMic = devices.some((d) => d.kind === "audioinput");

      if (!hasMic) {
        toast.error("Microfon Not Found");
        return;
      }
    });
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(undefined, undefined, undefined ,process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: username,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }

    setCallStatus(CallStatus.ACTIVE);
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    await vapi.stop();
  };

  const lastMessage = messages[messages.length - 1]?.content;

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
      <div className="w-full  items-center h-[35rem] max-sm:h-[27rem] flex mt-4 max-sm:mt-1 gap-5 justify-between ">
        <div
          className={cn(
            "w-1/2 relative max-sm:w-full transition-colors duration-1000  flex flex-col justify-center items-center  rounded-2xl border-2 border-neutral-900 h-[90%]",
            isSpeaking
              ? "bg-gradient-to-b from-cyan-950 to-black "
              : "bg-gradient-to-b from-neutral-900 to-black "
          )}>
          <div className="absolute inset-0 z-0 ">
            <img src="/pattern.png" alt="" />
          </div>
          <img
            src="/chatbot.png"
            alt="AI avatar"
            className={cn(
              "w-44 max-sm:w-24 z-10",
              callStatus === CallStatus.CONNECTING &&
                "opacity-100 animate-pulse"
            )}
          />
          <div className="ralative z-10 w-full">
            <h1
              className={cn(
                "text-4xl max-sm:text-xl text-center left-1/2 -translate-x-1/2 absolute font-semibold text-white mt-4 transition-opacity duration-1000",
                isSpeaking ? "opacity-0" : "opacity-100"
              )}>
              Evalio - AI Interviewer
            </h1>
          </div>
          <div
            className={cn(
              " transition-opacity z-10 duration-1000",
              callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
              isSpeaking ? "opacity-100" : "opacity-0"
            )}>
            <Lottie
              lottieRef={lottieRef}
              animationData={soundwaves}
              autoplay={true}
              className="w-[300px] max-sm:w-[150px]"
            />
          </div>
        </div>
        <div className="w-1/2 relative max-sm:hidden bg-gradient-to-b from-neutral-900 to-black rounded-2xl border-2 border-neutral-900 h-[90%] flex flex-col justify-center gap-5 items-center">
          <div className="absolute inset-0 z-0 ">
            <img src="/pattern.png" alt="" />
          </div>
          <div className="w-44 h-44 z-10 bg-amber-50 rounded-full"></div>
          <h1 className="font-semibold z-10 text-4xl">{username ?? ""}</h1>
        </div>
      </div>

      <div className="w-full h-[5rem] max-sm:h-[3rem] bg-gradient-to-b from-neutral-900 to-black rounded-2xl border-2 border-neutral-900 flex justify-center items-center">
        <p
          key={lastMessage}
          className={cn(
            "transition-opacity duration-500 opacity-0 max-sm:text-sm",
            "animate-fadeIn opacity-100"
          )}>
          {lastMessage}
        </p>
      </div>

      <button
        onClick={
          callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
        }
        className={`p-4 max-sm:p-3 max-sm:text-sm w-32 mt-7 mx-auto rounded-full ${
          callStatus === CallStatus.ACTIVE
            ? "bg-red-500"
            : callStatus === CallStatus.CONNECTING
            ? "bg-amber-500"
            : "bg-green-500"
        }`}>
        {callStatus === CallStatus.ACTIVE
          ? "End Session"
          : callStatus === CallStatus.CONNECTING
          ? "Connecting"
          : "Start Session"}
      </button>
    </div>
  );
};

export default Agent;
