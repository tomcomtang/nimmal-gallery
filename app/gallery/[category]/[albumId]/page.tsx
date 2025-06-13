'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

// 布局模板定义
const layoutTemplates = [
  // 模板1：交错布局
  {
    id: 1,
    name: 'Staggered',
    layout: [
      { size: 'medium', position: 'left' },
      { size: 'large', position: 'center' },
      { size: 'small', position: 'right-top' },
      { size: 'small', position: 'right-bottom' }
    ]
  },
  // 模板2：大图居中，两侧小图
  {
    id: 2,
    name: 'Center Focus',
    layout: [
      { size: 'small', position: 'top-left' },
      { size: 'large', position: 'center' },
      { size: 'small', position: 'top-right' },
      { size: 'medium', position: 'bottom-left' },
      { size: 'medium', position: 'bottom-right' }
    ]
  },
  // 模板3：对称布局
  {
    id: 3,
    name: 'Symmetric',
    layout: [
      { size: 'large', position: 'left' },
      { size: 'medium', position: 'right-top' },
      { size: 'medium', position: 'right-bottom' }
    ]
  }
]

// 示例相册数据
const albumData = {
  id: 'urban-geometry',
  title: 'Urban Geometry',
  description: 'Discover the hidden patterns of city life.',
  photos: [
    {
      id: 'ug1',
      src: '/images/gallery-cover-work.jpg',
      alt: 'Urban Geometry 1',
      title: 'City Patterns',
      description: 'Urban Geometry 1',
      size: 'large'
    },
    {
      id: 'ug2',
      src: '/images/work-album-cover.jpg',
      alt: 'Urban Geometry 2',
      title: 'Urban Geometry 2',
      description: 'Urban Geometry 2',
      size: 'medium'
    },
    {
      id: 'ug3',
      src: '/images/gallery-cover-work.jpg',
      alt: 'Urban Geometry 3',
      title: 'Urban Geometry 3',
      description: 'Urban Geometry 3',
      size: 'medium'
    },
    {
      id: 'ug4',
      src: '/images/work-album-cover.jpg',
      alt: 'Urban Geometry 4',
      title: 'Urban Geometry 4',
      description: 'Urban Geometry 4',
      size: 'small'
    },
    {
      id: 'ug5',
      src: '/images/gallery-cover-work.jpg',
      alt: 'Urban Geometry 5',
      title: 'Urban Geometry 5',
      description: 'Urban Geometry 5',
      size: 'small'
    },
    {
      id: 'ug6',
      src: '/images/work-album-cover.jpg',
      alt: 'Urban Geometry 6',
      title: 'Urban Geometry 6',
      description: 'Urban Geometry 6',
      size: 'small'
    },
    {
      id: 'ug7',
      src: '/images/gallery-cover-work.jpg',
      alt: 'Urban Geometry 7',
      title: 'Urban Geometry 7',
      description: 'Urban Geometry 7',
      size: 'small'
    },
    {
      id: 'ug8',
      src: '/images/work-album-cover.jpg',
      alt: 'Urban Geometry 8',
      title: 'Urban Geometry 8',
      description: 'Urban Geometry 8',
      size: 'small'
    }
  ]
}

interface PageProps {
  params: {
    category: string
    albumId: string
  }
}

export default function AlbumDetail({ params }: PageProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [currentLayout, setCurrentLayout] = useState(0)

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(index)
  }

  const handleClose = () => {
    setSelectedPhoto(null)
  }

  const handlePrevious = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + albumData.photos.length) % albumData.photos.length)
    }
  }

  const handleNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % albumData.photos.length)
    }
  }

  const handleLayoutChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentLayout((prev) => (prev - 1 + layoutTemplates.length) % layoutTemplates.length)
    } else {
      setCurrentLayout((prev) => (prev + 1) % layoutTemplates.length)
    }
  }

  // 获取照片尺寸的类名
  const getPhotoSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2'
      case 'medium':
        return 'col-span-1 row-span-2'
      case 'small':
        return 'col-span-1 row-span-1'
      default:
        return 'col-span-1 row-span-1'
    }
  }

  // 获取当前布局的照片
  const getCurrentLayoutPhotos = () => {
    const template = layoutTemplates[currentLayout]
    return template.layout.map((item, index) => ({
      ...albumData.photos[index % albumData.photos.length],
      size: item.size
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <Navbar />

      {/* 主要内容区域 */}
      <main className="flex-grow pt-40 pb-4">
        {/* 背景层 */}
        <div className="fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50" />
        
        {/* 内容层 */}
        <div className="container mx-auto px-4 relative z-10">
          {/* 返回按钮 */}
          <div className="max-w-6xl mx-auto mb-2">
            <Link 
              href={`/gallery/${params.category}`}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} className="mr-2" />
              Back to Gallery
            </Link>
          </div>

          {/* 相册信息区域 */}
          <div className="max-w-6xl mx-auto mb-2">
            <div className="text-center">
              <h1 className="text-2xl font-light text-gray-900">{albumData.title}</h1>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl mx-auto">{albumData.description}</p>
            </div>
          </div>

          {/* 照片网格 */}
          <div className="max-w-6xl mx-auto h-[550px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLayout}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full"
              >
                {getCurrentLayoutPhotos().map((photo, index) => (
                  <motion.div
                    key={`${currentLayout}-${photo.id}`}
                    className={`relative group cursor-pointer ${getPhotoSizeClass(photo.size)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handlePhotoClick(index)}
                  >
                    <div className="w-full h-full overflow-hidden rounded-lg">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 翻页控件 */}
          <div className="max-w-6xl mx-auto mt-2 flex justify-center items-center gap-4">
            <button
              onClick={() => handleLayoutChange('prev')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={currentLayout === 0}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-gray-600">
              {currentLayout + 1} / {layoutTemplates.length}
            </span>
            <button
              onClick={() => handleLayoutChange('next')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={currentLayout === layoutTemplates.length - 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <Footer />

      {/* 照片预览浮层 */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={getCurrentLayoutPhotos()[selectedPhoto].src}
                alt={getCurrentLayoutPhotos()[selectedPhoto].alt}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 