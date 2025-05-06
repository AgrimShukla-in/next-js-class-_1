'use client';
import Link from 'next/link'
import{webDevelopmentCourses,photographyCourses} from '@/data/music_data.json'
import { BackgroundGradient } from './ui/background-gradient';
import { div } from 'motion/react-client';


interface products {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    instructor: string;
    isFeatured: boolean;
    image: string;
}


function FeaturedCorses() {

  return (
   <div className='py-12 bg-blue-950 ' 
   >
    <div>
        <div className="text-center">
          <h2 className="text-3xl  mb-2 caret-blue-600" >Featured products</h2>
          <p className="text-gray-400 text-4xl font-bold">Check out our most popular products</p>
        </div>
    </div>


    <div className='mt-10'>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {webDevelopmentCourses.map((product:products) => (
        <div key={product.id} className="flex justify-center">
        <BackgroundGradient className="w-full max-w-sm rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-56 object-cover object-center" 
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              ${product.price}
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-b from-slate-800 to-slate-900">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.title}</h3>
            <p className="text-cyan-300 font-medium mb-2">Instructor: {product.instructor}</p>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <span className="text-yellow-400">★★★★</span>
                <span className="text-yellow-400 opacity-50">★</span>
                <span className="text-gray-400 ml-1 text-sm">4.0</span>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
                Enroll Now
              </button>
            </div>
          </div>
        </BackgroundGradient>
      </div>
        ))}
         {photographyCourses.map((product:products) => (
        <div key={product.id} className="flex justify-center">
        <BackgroundGradient className="w-full max-w-sm rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-56 object-cover object-center" 
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              ${product.price}
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-b from-slate-800 to-slate-900">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.title}</h3>
            <p className="text-cyan-300 font-medium mb-2">Instructor: {product.instructor}</p>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <span className="text-yellow-400">★★★★</span>
                <span className="text-yellow-400 opacity-50">★</span>
                <span className="text-gray-400 ml-1 text-sm">4.0</span>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
                Enroll Now
              </button>
            </div>
          </div>
        </BackgroundGradient>
      </div>
        ))}

       </div>
    </div>
    <div
    className='mt-20 text-center'
    > <Link href={'/products'}
    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'
    >
    View all products
    </Link>
    
    </div>
    </div>
  )
}

export default FeaturedCorses