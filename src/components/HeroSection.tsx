import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { Button } from '@/components/ui/moving-border'; 

function HeroSection() {
  return (
    <div
    className='h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center 
    relative overflow-hidden mx-auto py-10 md:py-0 ' 
    >
        <div className='p-4 relative z-10 w-full text-center'>
        <Spotlight
        className="absolute inset-0 w-[200%] h-[200%] opacity-30 animate-spotlight-lr"
        fill="#3b82f6"
      />
            <Spotlight
        className="absolute inset-0 w-[200%] h-[200%] opacity-30 animate-spotlight-rl"
        fill="#fbbf24"
      />
           <h1
           className='mt-20 md:mt-0 text-4xl md:text-7xl font-bold
           bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500'
           >Maister the art of web development</h1>
           <p
           className='mt-4 text-lg md:text-2xl text-gray-600'
           >Learn how to build a website from scratch and launch your career as a web developer</p>
             <div className="flex justify-center">
      <Button
        containerClassName="mt-4 w-40"
        className="font-medium"
        as="a"
        href="/courses"
        multiColor={true}
        glowEffect={true}
      >
        Get Started
      </Button>
    </div>
      </div>
    
    </div>
  )
}

export default HeroSection