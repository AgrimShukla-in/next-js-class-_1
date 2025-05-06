import Link from "next/link";
import React from "react";
import {web} from "@/data/music_data.json";
import { HoverEffect } from "./ui/card-hover-effect";



function UpcomingWebinars() {
  return (
    <div className="p-12 bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl mb-2 text-blue-600">Upcoming Webinars</h2>
          <p className="text-gray-400 text-xl font-bold">
            Stay tuned for the latest webinars to enhance your learning!
          </p>
        </div>
        <div className="mt-10">
          <HoverEffect items={web} />
        </div>
        <div className="mt-10 text-center">
        <Link href="/webinars">
        <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
          Go to Webinars
        </button>
      </Link>

        </div>
      </div>
    </div>

  );
}

export default UpcomingWebinars;