'use client'

import { div } from "motion/react-client"
import { WavyBackground } from "./ui/wavy-background";
import{item} from '@/data/music_data.json'
import { AnimatedTooltip } from "./ui/animated-tooltip";

function Instructors() {
  return (
     <div className="relative flex flex-col items-center justify-center w-full h-[40rem]">
      <WavyBackground className="h-[40rem] w-full rounded-md flex flex-col items-center justify-center ">
          <h2 className="text-2xl md:text-4xl font-bold lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 " >Meet our Teem</h2>
          <p className="mt-4 text-lg md:text-2xl text-green-50">Learn how to build a website from scratch and launch your career as a web developer</p>
           <div className="flex flex-row items-center justify-center mb-10 w-full">
           <AnimatedTooltip items={item} />

           </div>
      </WavyBackground>
     </div>
  )
}

export default Instructors