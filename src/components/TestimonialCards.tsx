'use client'
import { testimonials } from '@/data/music_data.json'
import InfiniteMovingCards from './ui/infinite-moving-cards'
import { cn } from "@/lib/utils"

interface TestimonialCardsProps {
    id: number;
    clientName: string;
    testimonial: string;
    rating: number;
    image: string;
    date: string;
}

function TestimonialCards() {
  return (
    <div className={cn(
        'h-[40rem] w-full rounded-md flex flex-col items-center justify-center ' ,
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
      )}>
      <h1 className=" mt-10 text-3xl font-bold text-center mb-8">Hear from our customers</h1>
      <div className=" flex justify-center w-full overflow-hidden px-4 sm:px-6:lg:px-8 ">
        <InfiniteMovingCards 
          items={testimonials} 
          direction="right" 
          speed="slow" 
        />
      </div>
    </div>
  )
}

export default TestimonialCards;