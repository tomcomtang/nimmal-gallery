'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/app/components/Footer'
import { Cormorant } from 'next/font/google'
import TwoColumnRow from '@/app/components/gallery/TwoColumnRow'
import ThreeColumnRow from '@/app/components/gallery/ThreeColumnRow'
import MixedRow from '@/app/components/gallery/MixedRow'
import TwoEqualRow from '@/app/components/gallery/TwoEqualRow'
import TwoUnequalRow from '@/app/components/gallery/TwoUnequalRow'
import { Photo } from '@/app/types/gallery'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant'
})

// Sample photo data
const photos: Photo[] = [
  {
    id: 1,
    src: "/images/gallery-cover-work.jpg",
    alt: "Photo 1",
    title: "Morning Light",
    description: "Captured in the early hours of dawn",
    galleryInfo: {
      title: "Morning Light Gallery",
      description: "A collection of photographs capturing the ethereal beauty of morning light. Each image tells a story of dawn's first rays touching the world."
    },
    photoCount: 24
  },
  {
    id: 2,
    src: "https://moa.ie/wp-content/uploads/2021/04/MOA_14_1-scaled.jpg",
    alt: "Photo 2",
    title: "Urban Life",
    description: "The rhythm of city streets",
    galleryInfo: {
      title: "Urban Life Gallery",
      description: "Exploring the vibrant energy of city life through street photography. From bustling markets to quiet alleyways, each frame captures the essence of urban existence."
    },
    photoCount: 18
  },
  {
    id: 3,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_20_1-scaled-1.jpg",
    alt: "Photo 3",
    title: "Natural Beauty",
    description: "Exploring the wonders of nature",
    galleryInfo: {
      title: "Natural Beauty Gallery",
      description: "A journey through nature's most breathtaking landscapes. From majestic mountains to serene lakes, each photograph celebrates the beauty of our natural world."
    },
    photoCount: 32
  },
  {
    id: 4,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_24_1-scaled-1.jpg",
    alt: "Photo 4",
    title: "Architectural Details",
    description: "The art of built environment",
    galleryInfo: {
      title: "Architectural Details Gallery",
      description: "A close look at the intricate details of architectural masterpieces. Each image reveals the hidden beauty in the structures that surround us."
    },
    photoCount: 15
  },
  {
    id: 5,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_Carbon_Front_Crop_2.jpg",
    alt: "Photo 5",
    title: "Street Stories",
    description: "Everyday moments in the city",
    galleryInfo: {
      title: "Street Stories Gallery",
      description: "Capturing the candid moments that make up city life. Each photograph is a window into the stories that unfold on our streets every day."
    },
    photoCount: 27
  },
  {
    id: 6,
    src: "https://moa.ie/wp-content/uploads/2021/04/MOA_plat_3-scaled.jpg",
    alt: "Photo 6",
    title: "Urban Geometry",
    description: "Lines and shapes in the cityscape",
    galleryInfo: {
      title: "Urban Geometry Gallery",
      description: "Exploring the geometric patterns and shapes that define our urban landscape. Each image reveals the mathematical beauty hidden in our cities."
    },
    photoCount: 21,
    useGrid: true,
    coverImages: [
      "https://moa.ie/wp-content/uploads/2021/04/MOA_plat_3-scaled.jpg",
      "/images/gallery-cover-work.jpg",
      "https://moa.ie/wp-content/uploads/2021/04/MOA_14_1-scaled.jpg",
      "https://moa.ie/wp-content/uploads/2021/04/Moa_20_1-scaled-1.jpg"
    ]
  },
  {
    id: 7,
    src: "https://moa.ie/wp-content/uploads/2021/04/MOA_14_1-scaled.jpg",
    alt: "Photo 7",
    title: "City Lights",
    description: "The magic of urban nights",
    galleryInfo: {
      title: "City Lights Gallery",
      description: "A nocturnal journey through the city's illuminated landscapes. Each photograph captures the unique atmosphere of urban nightlife."
    },
    photoCount: 19
  },
  {
    id: 8,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_20_1-scaled-1.jpg",
    alt: "Photo 8",
    title: "Portrait Stories",
    description: "Faces and emotions",
    galleryInfo: {
      title: "Portrait Stories Gallery",
      description: "A collection of intimate portraits that tell stories through expressions and emotions. Each face reveals a unique narrative."
    },
    photoCount: 25
  },
  {
    id: 9,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_24_1-scaled-1.jpg",
    alt: "Photo 9",
    title: "Abstract Moments",
    description: "Finding beauty in chaos",
    galleryInfo: {
      title: "Abstract Moments Gallery",
      description: "Exploring the abstract beauty in everyday scenes. Each image challenges our perception of reality."
    },
    photoCount: 16
  },
  {
    id: 10,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_Carbon_Front_Crop_2.jpg",
    alt: "Photo 10",
    title: "Seasonal Changes",
    description: "Nature's transformation",
    galleryInfo: {
      title: "Seasonal Changes Gallery",
      description: "Documenting the beautiful transitions between seasons. Each photograph captures nature's ever-changing palette."
    },
    photoCount: 28
  },
  {
    id: 11,
    src: "https://moa.ie/wp-content/uploads/2021/04/MOA_plat_3-scaled.jpg",
    alt: "Photo 11",
    title: "Urban Patterns",
    description: "The rhythm of the city",
    galleryInfo: {
      title: "Urban Patterns Gallery",
      description: "Discovering the repetitive patterns and rhythms that make up our urban environment. Each image reveals the hidden order in city chaos."
    },
    photoCount: 22
  },
  {
    id: 12,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_20_1-scaled-1.jpg",
    alt: "Photo 3",
    title: "Natural Beauty",
    description: "Exploring the wonders of nature",
    galleryInfo: {
      title: "Natural Beauty Gallery",
      description: "A journey through nature's most breathtaking landscapes. From majestic mountains to serene lakes, each photograph celebrates the beauty of our natural world."
    },
    photoCount: 32
  }
]

interface GalleryContentProps {
  category: string;
  info: {
    title: string;
    description: string;
  };
}

export default function GalleryContent({ category, info }: GalleryContentProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedPhotoPosition, setSelectedPhotoPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [currentGalleryInfo, setCurrentGalleryInfo] = useState(info)

  const handlePhotoClick = (photo: Photo, e: React.MouseEvent) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setSelectedPhotoPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    })
    setSelectedPhoto(photo)
    setCurrentGalleryInfo(photo.galleryInfo)
  }

  const handleClose = () => {
    setSelectedPhoto(null)
    setSelectedPhotoPosition(null)
  }

  const handleNextGallery = () => {
    if (!selectedPhoto) return
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
    const nextPhoto = photos[(currentIndex + 1) % photos.length]
    setSelectedPhoto(nextPhoto)
    setCurrentGalleryInfo(nextPhoto.galleryInfo)
  }

  return (
    <div className={`min-h-screen pt-40 pb-12 ${cormorant.variable} font-cormorant`}>
      {/* Content Layer */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Photo Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* First row - Two columns */}
            <TwoColumnRow 
              photos={photos.slice(0, 2)} 
              onPhotoClick={handlePhotoClick}
              info={info}
            />

            {/* Second row - Three columns */}
            <ThreeColumnRow 
              photos={photos.slice(2, 5)} 
              onPhotoClick={handlePhotoClick}
            />

            {/* Third row - Mixed layout */}
            <MixedRow 
              mainPhoto={photos[5]}
              sidePhotos={photos.slice(6, 8)}
              onPhotoClick={handlePhotoClick}
            />

            {/* Fourth row - Two equal columns */}
            <TwoEqualRow 
              photos={photos.slice(8, 10)} 
              onPhotoClick={handlePhotoClick}
            />

            {/* Fifth row - Two unequal columns */}
            <TwoUnequalRow 
              photos={photos.slice(10, 12)} 
              onPhotoClick={handlePhotoClick}
            />
          </div>
        </div>
      </div>

      {/* Floating Layer */}
      <AnimatePresence>
        {selectedPhoto && selectedPhotoPosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={handleClose}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{
                  x: selectedPhotoPosition.x - window.innerWidth / 2 + selectedPhotoPosition.width / 2,
                  y: selectedPhotoPosition.y - window.innerHeight / 2 + selectedPhotoPosition.height / 2,
                  width: selectedPhotoPosition.width,
                  height: selectedPhotoPosition.height,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  width: '1200px',
                  height: '600px',
                }}
                exit={{
                  x: selectedPhotoPosition.x - window.innerWidth / 2 + selectedPhotoPosition.width / 2,
                  y: selectedPhotoPosition.y - window.innerHeight / 2 + selectedPhotoPosition.height / 2,
                  width: selectedPhotoPosition.width,
                  height: selectedPhotoPosition.height,
                }}
                transition={{
                  type: "spring", 
                  duration: 1.2,
                  bounce: 0.1
                }}
                className="bg-white rounded-lg overflow-hidden flex"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-2/3 relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedPhoto.id}
                      src={selectedPhoto.src}
                      alt={selectedPhoto.alt}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ 
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  </AnimatePresence>
                </div>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '33.333%' }}
                  exit={{ width: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.4
                  }}
                  className="p-8 flex flex-col overflow-hidden bg-white"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6,
                      delay: 0.8 
                    }}
                    className="flex flex-col h-full"
                  >
                    {/* Album name */}
                    <h2 className="text-3xl font-medium mb-4 text-gray-900">
                      {currentGalleryInfo.title}
                    </h2>
                    
                    {/* Album description */}
                    <p className="text-gray-600 mb-8 flex-grow">
                      {currentGalleryInfo.description}
                    </p>

                    {/* Button group */}
                    <div className="space-y-4">
                      <button 
                        className="w-full py-2 px-4 bg-amber-100/80 text-gray-800 rounded-lg hover:bg-amber-100 transition-colors"
                        onClick={() => window.location.href = `/gallery/${category}/detail`}
                      >
                        View Gallery Details
                      </button>
                      
                      <button 
                        className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={handleNextGallery}
                      >
                        Next Gallery
                      </button>

                      <button 
                        className="w-full py-2 px-4 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  )
} 