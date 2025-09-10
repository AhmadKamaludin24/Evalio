import React from "react";
import PixelBlast from "./PixelBlast";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="w-full relative py-4 px-4 h-[25rem] max-sm:h-[15rem] lg:px-12 bg-gradient-to-b from-black to-blue-950 rounded-2xl border-2 border-neutral-800 flex items-center justify-between">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "1",
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
      <div className="flex z-20 w-1/2 max-sm:w-full flex-col justify-center items-start">
        <h1 className="text-5xl max-md:text-2xl font-bold text-white">
          Forget the Nerves. Embrace Your Success.
        </h1>
        <h2 className="text-2xl max-md:text-sm my-3 text-neutral-200 ">
          Our AI is your ultimate practice partner. Get real-time feedback,
          refine your weaknesses, and walk into any interview with a smile and
          unshakeable confidence.
        </h2>
       <Button href="/interview" className="max-sm:w-full">Start an interview</Button>
      </div>
      <div className="z-20 max-sm:hidden flex justify-center items-center">
        <img src="/hero.png" alt="" className="w-72 max-md:w-44 object-cover" />
      </div>
    </div>
  );
};

export default Hero;
