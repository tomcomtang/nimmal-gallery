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
import Link from 'next/link'
import { getAlbumsByCategory } from '@/app/utils/config'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant'
})

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

// 获取对应类别的图片
const getCategoryPhotos = (category: string): Photo[] => {
  const photos: Photo[] = []
  const basePath = `/images/gallery/${category}`
  
  // 为每个类别生成20张图片的数据
  for (let i = 1; i <= 20; i++) {
    photos.push({
      id: i,
      src: `${basePath}/${category}_${i}.jpg`,
      alt: `${category} photo ${i}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Collection ${i}`,
      description: `A beautiful collection of ${category} photographs showcasing the wonders of ${category}.`,
      photoCount: Math.floor(Math.random() * 20) + 10, // 随机生成10-30之间的照片数
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 随机生成30天内的日期
      galleryInfo: {
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Collection ${i}`,
        description: `A beautiful collection of ${category} photographs showcasing the wonders of ${category}.`
      }
    })
  }
  
  return photos
}

export default function GalleryContent({ category, info }: GalleryContentProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedPhotoPosition, setSelectedPhotoPosition] = useState<DOMRect | null>(null)
  const [currentGalleryInfo, setCurrentGalleryInfo] = useState<{ title: string; description: string }>({
    title: '',
    description: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentLayout, setCurrentLayout] = useState<'staggered' | 'center' | 'symmetric'>('staggered')
  
  // 从配置中获取相册数据
  const photos = useMemo(() => {
    const albums = getAlbumsByCategory(category)
    return albums.map(album => ({
      id: album.id,
      src: album.coverImage,
      alt: album.title,
      title: album.title,
      description: album.description,
      photoCount: album.photoCount,
      createdAt: album.createdAt,
      galleryInfo: {
        title: album.title,
        description: album.description,
        photoCount: album.photoCount,
        createdAt: album.createdAt
      }
    }))
  }, [category])

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
    setSelectedPhotoPosition(rect)
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
    <div className={`flex flex-col min-h-screen ${cormorant.variable} font-cormorant`}>
      {/* Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50" />
      
      {/* Content Layer */}
      <div className="flex-1 pt-40 relative z-10">
        <div className="container mx-auto px-4">
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
      </div>

      {/* Footer */}
      <Footer />

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
                  x: selectedPhotoPosition.left - window.innerWidth / 2 + selectedPhotoPosition.width / 2,
                  y: selectedPhotoPosition.top - window.innerHeight / 2 + selectedPhotoPosition.height / 2,
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
                  x: selectedPhotoPosition.left - window.innerWidth / 2 + selectedPhotoPosition.width / 2,
                  y: selectedPhotoPosition.top - window.innerHeight / 2 + selectedPhotoPosition.height / 2,
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
                        onClick={() => window.location.href = `/gallery/${category}/${selectedPhoto.id}`}
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
    </div>
  )
} 