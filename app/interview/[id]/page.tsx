import Agent from "@/components/Agent";
import Navbar from "@/components/Navbar";
import PixelBlast from "@/components/PixelBlast";
import { Spotlight } from "@/components/ui/spotlight-new";
import { getCurrentUser } from "@/lib/auth.action";
import { getInterviewById } from "@/lib/general.action";
import React from "react";

const page = async ({params}: {params: {id: string}}) => {
  const {id} = await params
  console.log(id)

  const user = await getCurrentUser();
  const interview = await getInterviewById(id)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-black via-black to-blue-950">
      <Spotlight />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "-1",
        }}>
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#3396D3"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>
      <div className="container px-4 text-white flex flex-col mx-auto z-40">
        <Navbar name={user?.name} />

        <h1 className="text-4xl max-sm:text-2xl font-semibold">{interview?.role} Interview</h1>
        <Agent username={user?.name} userId={user?.id} questions={interview?.questions } interviewId={id} type="interview"/>
      </div>
    </div>
  );
};

export default page;
