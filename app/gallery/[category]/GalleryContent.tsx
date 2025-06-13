'use client'

import { useState, useMemo } from 'react'
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
    alt: "Gallery Photo 1",
    title: "Nature Collection",
    description: "A beautiful collection of nature photographs showcasing the wonders of the natural world.",
    photoCount: 24,
    createdAt: "2024-03-15",
    galleryInfo: {
      title: "Nature Collection Gallery",
      description: "A beautiful collection of nature photographs showcasing the wonders of the natural world."
    }
  },
  {
    id: 2,
    src: "/images/work-album-cover.jpg",
    alt: "Gallery Photo 2",
    title: "Urban Life",
    description: "Capturing the essence of city life through unique perspectives and moments.",
    photoCount: 18,
    createdAt: "2024-03-14",
    galleryInfo: {
      title: "Urban Life Gallery",
      description: "Capturing the essence of city life through unique perspectives and moments."
    }
  },
  {
    id: 3,
    src: "/images/gallery-cover-work.jpg",
    alt: "Gallery Photo 3",
    title: "Portrait Series",
    description: "A series of intimate portraits revealing the depth of human emotion.",
    photoCount: 12,
    createdAt: "2024-03-13",
    galleryInfo: {
      title: "Portrait Series Gallery",
      description: "A series of intimate portraits revealing the depth of human emotion."
    }
  },
  {
    id: 4,
    src: "/images/work-album-cover.jpg",
    alt: "Gallery Photo 4",
    title: "Architecture",
    description: "Exploring the beauty of architectural design and structural forms.",
    photoCount: 15,
    createdAt: "2024-03-12",
    galleryInfo: {
      title: "Architecture Gallery",
      description: "Exploring the beauty of architectural design and structural forms."
    }
  },
  {
    id: 5,
    src: "/images/gallery-cover-work.jpg",
    alt: "Gallery Photo 5",
    title: "Street Photography",
    description: "Candid moments from the streets, telling stories of everyday life.",
    photoCount: 20,
    createdAt: "2024-03-11",
    galleryInfo: {
      title: "Street Photography Gallery",
      description: "Candid moments from the streets, telling stories of everyday life."
    }
  },
  {
    id: 6,
    src: "/images/work-album-cover.jpg",
    alt: "Gallery Photo 6",
    title: "Landscape",
    description: "Breathtaking landscapes from around the world.",
    photoCount: 16,
    createdAt: "2024-03-10",
    galleryInfo: {
      title: "Landscape Gallery",
      description: "Breathtaking landscapes from around the world."
    }
  },
  {
    id: 7,
    src: "/images/gallery-cover-work.jpg",
    alt: "Gallery Photo 7",
    title: "Wildlife",
    description: "Capturing the beauty and majesty of wildlife in their natural habitats.",
    photoCount: 22,
    createdAt: "2024-03-09",
    galleryInfo: {
      title: "Wildlife Gallery",
      description: "Capturing the beauty and majesty of wildlife in their natural habitats."
    }
  },
  {
    id: 8,
    src: "/images/work-album-cover.jpg",
    alt: "Gallery Photo 8",
    title: "Abstract",
    description: "Abstract compositions exploring form, color, and texture.",
    photoCount: 14,
    createdAt: "2024-03-08",
    galleryInfo: {
      title: "Abstract Gallery",
      description: "Abstract compositions exploring form, color, and texture."
    }
  },
  {
    id: 9,
    src: "/images/gallery-cover-work.jpg",
    alt: "Gallery Photo 9",
    title: "Travel",
    description: "Journeys and adventures captured through the lens.",
    photoCount: 19,
    createdAt: "2024-03-07",
    galleryInfo: {
      title: "Travel Gallery",
      description: "Journeys and adventures captured through the lens."
    }
  },
  {
    id: 10,
    src: "/images/work-album-cover.jpg",
    alt: "Gallery Photo 10",
    title: "Food",
    description: "Culinary delights and gastronomic experiences.",
    photoCount: 17,
    createdAt: "2024-03-06",
    galleryInfo: {
      title: "Food Gallery",
      description: "Culinary delights and gastronomic experiences."
    }
  },
  {
    id: 11,
    src: "/images/gallery-cover-work.jpg",
    alt: "Gallery Photo 11",
    title: "Fashion",
    description: "Fashion photography showcasing style and elegance.",
    photoCount: 21,
    createdAt: "2024-03-05",
    galleryInfo: {
      title: "Fashion Gallery",
      description: "Fashion photography showcasing style and elegance."
    }
  },
  {
    id: 12,
    src: "/images/work-album-cover.jpg",
    alt: "Gallery Photo 12",
    title: "Sports",
    description: "Dynamic moments from the world of sports.",
    photoCount: 13,
    createdAt: "2024-03-04",
    galleryInfo: {
      title: "Sports Gallery",
      description: "Dynamic moments from the world of sports."
    }
  }
]

interface GalleryContentProps {
  category: string;
  info: {
    title: string;
    description: string;
  };
}

// 定义布局类型
type LayoutType = 'three' | 'mixed' | 'twoEqual' | 'twoUnequal';

// 定义每个布局类型需要的照片数量
const LAYOUT_PHOTO_COUNTS: Record<LayoutType, number> = {
  three: 3,
  mixed: 3, // 1个主图 + 2个侧边图
  twoEqual: 2,
  twoUnequal: 2
};

export default function GalleryContent({ category, info }: GalleryContentProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedPhotoPosition, setSelectedPhotoPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [currentGalleryInfo, setCurrentGalleryInfo] = useState(info)

  // 生成随机布局
  const layouts = useMemo(() => {
    const availableLayouts: LayoutType[] = ['three', 'mixed', 'twoEqual', 'twoUnequal'];
    const result: LayoutType[] = [];
    let remainingPhotos = photos.length - 2; // 减去第一行的两张照片

    while (remainingPhotos > 0) {
      // 过滤出当前可用的布局类型
      const possibleLayouts = availableLayouts.filter(layout => 
        LAYOUT_PHOTO_COUNTS[layout] <= remainingPhotos
      );

      if (possibleLayouts.length === 0) break;

      // 随机选择一个布局
      const randomLayout = possibleLayouts[Math.floor(Math.random() * possibleLayouts.length)];
      result.push(randomLayout);
      remainingPhotos -= LAYOUT_PHOTO_COUNTS[randomLayout];
    }

    return result;
  }, []);

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

  // 计算每个布局的起始索引
  const getLayoutStartIndex = (layoutIndex: number) => {
    let startIndex = 2; // 从第三张照片开始（前两张用于第一行）
    for (let i = 0; i < layoutIndex; i++) {
      startIndex += LAYOUT_PHOTO_COUNTS[layouts[i]];
    }
    return startIndex;
  };

  return (
    <div className={`min-h-screen pt-40 pb-12 ${cormorant.variable} font-cormorant`}>
      {/* Content Layer */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Photo Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* First row - Always Two columns */}
            <TwoColumnRow 
              photos={photos.slice(0, 2)} 
              onPhotoClick={handlePhotoClick}
              info={info}
              hideFirstPhotoLabels={true}
            />

            {/* Random layouts for remaining photos */}
            {layouts.map((layout, index) => {
              const startIndex = getLayoutStartIndex(index);
              
              switch (layout) {
                case 'three':
                  return (
                    <ThreeColumnRow 
                      key={`three-${index}`}
                      photos={photos.slice(startIndex, startIndex + 3)} 
                      onPhotoClick={handlePhotoClick}
                    />
                  );
                case 'mixed':
                  return (
                    <MixedRow 
                      key={`mixed-${index}`}
                      mainPhoto={photos[startIndex]}
                      sidePhotos={photos.slice(startIndex + 1, startIndex + 3)}
                      onPhotoClick={handlePhotoClick}
                    />
                  );
                case 'twoEqual':
                  return (
                    <TwoEqualRow 
                      key={`twoEqual-${index}`}
                      photos={photos.slice(startIndex, startIndex + 2)} 
                      onPhotoClick={handlePhotoClick}
                    />
                  );
                case 'twoUnequal':
                  return (
                    <TwoUnequalRow 
                      key={`twoUnequal-${index}`}
                      photos={photos.slice(startIndex, startIndex + 2)} 
                      onPhotoClick={handlePhotoClick}
                    />
                  );
              }
            })}
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