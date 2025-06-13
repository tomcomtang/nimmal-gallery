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
  const [currentGalleryInfo, setCurrentGalleryInfo] = useState(info)

  const handlePhotoClick = (photo: typeof photos[0], e: React.MouseEvent) => {
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
      {/* 内容层 */}
      <div className="container mx-auto px-4 relative z-10">
        {/* 照片网格 */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {photos.slice(0, 6).map((photo, index) => (
              <div 
                key={photo.id}
                className={`group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  index === 0 ? 'md:col-span-7' : 
                  index === 1 ? 'md:col-span-5' : 
                  index === 5 ? 'md:col-span-7 h-[500px]' :
                  'md:col-span-4'
                } ${index === 0 ? '' : 'cursor-pointer'}`}
                onClick={(e) => {
                  if (index !== 0) {
                    handlePhotoClick(photo, e)
                  }
                }}
              >
                <div className={`w-full relative ${
                  index < 2 ? 'h-[300px]' : 
                  index < 5 ? 'h-[360px]' :
                  index === 5 ? 'h-[500px]' :
                  'h-[360px]'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      {photo.useGrid ? (
                        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                          {photo.coverImages.map((imgSrc, imgIndex) => (
                            <div key={imgIndex} className="relative overflow-hidden">
                              <img
                                src={imgSrc}
                                alt={`${photo.title} - Preview ${imgIndex + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                      {/* 添加照片数量标签 */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        <span className="text-sm font-medium text-gray-700">
                          {photo.photoCount} Photos
                        </span>
                      </div>
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
                        {/* 添加照片数量标签 */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                          <span className="text-sm font-medium text-gray-700">
                            {photo.photoCount} Photos
                          </span>
                        </div>
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
                      {/* 添加照片数量标签 */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        <span className="text-sm font-medium text-gray-700">
                          {photos[1].photoCount} Photos
                        </span>
                      </div>
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
                      {/* 添加照片数量标签 */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        <span className="text-sm font-medium text-gray-700">
                          {photos[2].photoCount} Photos
                        </span>
                      </div>
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
                      {/* 添加照片数量标签 */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        <span className="text-sm font-medium text-gray-700">
                          {photos[3].photoCount} Photos
                        </span>
                      </div>
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
                      {/* 添加照片数量标签 */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        <span className="text-sm font-medium text-gray-700">
                          {photos[4].photoCount} Photos
                        </span>
                      </div>
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
                    {/* 相册名称 */}
                    <h2 className="text-3xl font-medium mb-4 text-gray-900">
                      {currentGalleryInfo.title}
                    </h2>
                    
                    {/* 相册备注 */}
                    <p className="text-gray-600 mb-8 flex-grow">
                      {currentGalleryInfo.description}
                    </p>

                    {/* 按钮组 */}
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

      {/* 页脚 */}
      <Footer />
    </div>
  )
} 