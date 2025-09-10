import { Calendar, Star } from 'lucide-react';
import React from 'react'
import Button from './Button';
const InterviewCard = [
  {
    id: 1,
    title: "Front End Interview",
    description: "This is a front end interview practice session. You will be asked questions related to HTML, CSS, JavaScript",
    date: "2023-10-01",
    stats: 100,
    imgUrl: "/interview/front-end.png",
    url: "/interview/1",
  },
  {
    id: 2,
    title: "backend Interview",
    description: "This is a backend interview practice session. You will be asked questions related to server-side programming, databases, APIs, and popular backend frameworks ",
    date: "2023-09-25",
    stats: 85,
    imgUrl: "/interview/backend.png",
    url: "/interview/2",
  },
  {
    id: 3,
    title: "fullstack Interview",
    date: "2023-09-20",
    description: "This is a full-stack interview practice session. You will be asked questions that cover both front-end and back-end development.",
    stats: 90,
    imgUrl: "/interview/fullstack.png",
    url: "/interview/3",
  },
    {
    id: 4,
    title: "Data Structures Interview",
    date: "2023-09-15",
    description: "This is a data structures interview practice session. You will be asked questions related to arrays, linked lists, trees, graphs, and other fundamental data structures.",
    stats: 95,
    imgUrl: "/interview/backend.png",
    url: "/interview/4",
  },
];
const InterviewSection = () => {
  return (
    <div className="mt-7 w-full flex flex-col">
          <h1 className="text-white text-2xl lg:text-4xl font-semibold">Take Interview</h1>
          <div className="flex flex-wrap items-center mt-7 gap-4 ">
            {InterviewCard.map((interview) => (
              <div
                key={interview.id}
                className="w-[24%] max-md:w-full bg-gradient-to-br from-neutral-900 via-black border-2 border-neutral-600 rounded-2xl relative  to-blue-900 flex flex-col p-4 h-96">
                <img src={interview.imgUrl} alt="logo" className="w-32" />
                <div className="absolute inset-0 "><img src="/pattern.png" alt="patttern" /></div>
                <h1 className="text-2xl mt-3 font-semibold text-white">{interview.title}</h1>
                <div className="mt-3 gap-4 justify-around flex items-center">
                  <div className="flex justify-center text-white items-center">
                    <Star/> <p>--/100</p>
                  </div>
                  <div className="flex justify-center text-white items-center">
                    <Calendar/> <p>{interview.date}</p>
                  </div>
                </div>
                <p className="text-sm text-white mt-3 h-12 ">{interview.description}</p>
                <Button href={interview.url} className="mt-auto w-full">Start Practice</Button>
              </div>
            ))}
          </div>
        </div>
  )
}

export default InterviewSection
