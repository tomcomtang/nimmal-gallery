import { Metadata } from 'next'
import Link from 'next/link'

type Category = 'work' | 'life' | 'travel'

interface CategoryInfo {
  title: string
  description: string
}

interface Photo {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

interface Album {
  title: string
  description: string
  coverImage: string
  photos: Photo[]
}

interface Albums {
  [key: string]: {
    [key: string]: Album
  }
}

// 定义类别信息
const categoryInfo: Record<Category, CategoryInfo> = {
  work: {
    title: 'Work',
    description: 'Professional photography showcasing creative works and projects',
  },
  life: {
    title: 'Life',
    description: 'Capturing the beauty of everyday moments and personal stories',
  },
  travel: {
    title: 'Travel',
    description: 'Exploring the world through the lens of a photographer',
  },
}

// 示例相册数据
const albums: Albums = {
  work: {
    'commercial-2024': {
      title: 'Commercial 2024',
      description: 'Commercial photography projects from 2024',
      coverImage: "https://moa.ie/wp-content/uploads/2021/08/Hero_home_1-scaledV2-1.jpg",
      photos: [
        {
          id: 1,
          src: "https://moa.ie/wp-content/uploads/2021/08/Hero_home_1-scaledV2-1.jpg",
          alt: "Commercial Photo 1",
          title: "Product Showcase",
          description: "Professional product photography"
        },
        {
          id: 2,
          src: "https://moa.ie/wp-content/uploads/2021/04/MOA_14_1-scaled.jpg",
          alt: "Commercial Photo 2",
          title: "Brand Campaign",
          description: "Corporate brand photography"
        }
      ]
    }
  },
  life: {
    'daily-life': {
      title: 'Daily Life',
      description: 'Capturing the beauty of everyday moments',
      coverImage: "https://moa.ie/wp-content/uploads/2021/04/Moa_24_1-scaled-1.jpg",
      photos: [
        {
          id: 1,
          src: "https://moa.ie/wp-content/uploads/2021/04/Moa_24_1-scaled-1.jpg",
          alt: "Daily Life Photo 1",
          title: "Morning Coffee",
          description: "A quiet moment in the morning"
        }
      ]
    }
  },
  travel: {
    'europe-2024': {
      title: 'Europe 2024',
      description: 'Photography journey through Europe',
      coverImage: "https://moa.ie/wp-content/uploads/2021/04/MOA_plat_3-scaled.jpg",
      photos: [
        {
          id: 1,
          src: "https://moa.ie/wp-content/uploads/2021/04/MOA_plat_3-scaled.jpg",
          alt: "Europe Photo 1",
          title: "Paris Streets",
          description: "The charm of Parisian architecture"
        }
      ]
    }
  }
}

// 生成元数据
export async function generateMetadata({ params }: { params: { category: string; albumId: string } }): Promise<Metadata> {
  const category = params.category as Category
  const albumId = params.albumId
  const album = albums[category]?.[albumId]
  const info = categoryInfo[category]
  
  return {
    title: album ? `${album.title} - ${info.title}` : 'Album',
    description: album?.description || 'Photo Album',
  }
}

export default function AlbumPage({ params }: { params: { category: string; albumId: string } }) {
  const category = params.category as Category
  const albumId = params.albumId
  const album = albums[category]?.[albumId]
  const info = categoryInfo[category]

  if (!album) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl text-center">Album not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* 背景层 */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50" />
      
      {/* 内容层 */}
      <div className="container mx-auto px-4 relative z-10">
        {/* 返回按钮和标题 */}
        <div className="max-w-6xl mx-auto mb-12">
          <Link 
            href={`/gallery/${category}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {info.title}
          </Link>
          <h1 className="text-4xl font-light mb-4 text-gray-900">
            {album.title}
          </h1>
          <p className="text-lg text-gray-600">
            {album.description}
          </p>
        </div>

        {/* 照片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {album.photos.map((photo: Photo) => (
            <div 
              key={photo.id}
              className="group relative aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-medium mb-2">{photo.title}</h3>
                  <p className="text-sm text-gray-200">{photo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 