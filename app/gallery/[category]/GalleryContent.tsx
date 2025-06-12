'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/app/components/Footer'
import { Cormorant } from 'next/font/google'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant'
})

// 示例照片数据
const photos = [
  {
    id: 1,
    src: "/images/gallery-cover-work.jpg",
    alt: "Photo 1",
    title: "Morning Light",
    description: "Captured in the early hours of dawn"
  },
  {
    id: 2,
    src: "https://moa.ie/wp-content/uploads/2021/04/MOA_14_1-scaled.jpg",
    alt: "Photo 2",
    title: "Urban Life",
    description: "The rhythm of city streets"
  },
  {
    id: 3,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_20_1-scaled-1.jpg",
    alt: "Photo 3",
    title: "Natural Beauty",
    description: "Exploring the wonders of nature"
  },
  {
    id: 4,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_24_1-scaled-1.jpg",
    alt: "Photo 4",
    title: "Architectural Details",
    description: "The art of built environment"
  },
  {
    id: 5,
    src: "https://moa.ie/wp-content/uploads/2021/04/Moa_Carbon_Front_Crop_2.jpg",
    alt: "Photo 5",
    title: "Street Stories",
    description: "Everyday moments in the city"
  },
  {
    id: 6,
    src: "https://moa.ie/wp-content/uploads/2021/04/MOA_plat_3-scaled.jpg",
    alt: "Photo 6",
    title: "Urban Geometry",
    description: "Lines and shapes in the cityscape"
  },
]

interface GalleryContentProps {
  category: string;
  info: {
    title: string;
    description: string;
  };
}

export default function GalleryContent({ category, info }: GalleryContentProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null)
  const [selectedPhotoPosition, setSelectedPhotoPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null)

  const handlePhotoClick = (photo: typeof photos[0], event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    setSelectedPhotoPosition({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    })
    setSelectedPhoto(photo)
  }

  const handleClose = () => {
    setSelectedPhoto(null)
    setSelectedPhotoPosition(null)
  }

  return (
    <div className={`min-h-screen pt-20 pb-12 ${cormorant.variable} font-cormorant`}>
      {/* 内容层 */}
      <div className="container mx-auto px-4 relative z-10 pt-8">
        {/* 照片网格 */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {photos.slice(0, 6).map((photo, index) => (
              <div 
                key={photo.id}
                className={`group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  index === 0 ? 'md:col-span-7' : 
                  index === 1 ? 'md:col-span-5' : 
                  index === 5 ? 'md:col-span-7 h-[500px]' :
                  'md:col-span-4'
                }`}
                onClick={(e) => handlePhotoClick(photo, e)}
              >
                <div className={`w-full relative ${
                  index < 2 ? 'h-[300px]' : 
                  index < 5 ? 'h-[360px]' :
                  index === 5 ? 'h-[500px]' :
                  'h-[360px]'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {index === 0 && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/80" />
                        <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
                          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wider">
                            {info.title}
                          </h2>
                          <p className="text-lg text-gray-700 mb-6 max-w-2xl italic">
                            {info.description}
                          </p>
                          <p className="text-base text-gray-600 max-w-2xl italic">
                            Photography has been my passion for over a decade. Through this gallery, I hope to share not just images, but the emotions and stories behind them. Every shot is a window into a moment that moved me, and I'm excited to share these moments with you.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* 右侧两个垂直排列的卡片 */}
            <div className="md:col-span-5 flex flex-col h-[500px] gap-4">
              {photos.slice(0, 2).map((photo, index) => (
                <div 
                  key={`right-${index}`} 
                  className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-1 cursor-pointer"
                  onClick={(e) => handlePhotoClick(photo, e)}
                >
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                      <div className="w-full h-full overflow-hidden rounded-lg">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 第四行布局 */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8">
              <div 
                className="md:col-span-6 group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={(e) => handlePhotoClick(photos[1], e)}
              >
                <div className="w-full h-[360px] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={photos[1].src}
                        alt={photos[1].alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div 
                className="md:col-span-6 group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={(e) => handlePhotoClick(photos[2], e)}
              >
                <div className="w-full h-[360px] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={photos[2].src}
                        alt={photos[2].alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Row 5 */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8">
              <div 
                className="md:col-span-5 group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={(e) => handlePhotoClick(photos[3], e)}
              >
                <div className="w-full h-[360px] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={photos[3].src}
                        alt={photos[3].alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div 
                className="md:col-span-7 group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={(e) => handlePhotoClick(photos[4], e)}
              >
                <div className="w-full h-[360px] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={photos[4].src}
                        alt={photos[4].alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 浮层 */}
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
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    className="w-full h-full object-cover"
                  />
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
                  >
                    <h3 className="text-2xl font-medium mb-4">{selectedPhoto.title}</h3>
                    <p className="text-gray-600 mb-6">{selectedPhoto.description}</p>
                    <button 
                      className="mt-auto text-gray-500 hover:text-gray-700"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 页脚 */}
      <Footer />
    </div>
  )
} 