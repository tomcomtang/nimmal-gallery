import { Metadata } from 'next'
import GalleryContent from './GalleryContent'

// 定义类别信息
const categoryInfo = {
  nature: {
    title: 'Nature',
    description: 'Capturing the beauty of natural landscapes and wildlife',
  },
  urban: {
    title: 'Urban',
    description: 'Exploring the dynamic life and architecture of cities',
  },
  travel: {
    title: 'Travel',
    description: 'Journeys and adventures from around the world',
  },
  architecture: {
    title: 'Architecture',
    description: 'Showcasing remarkable architectural designs and structures',
  },
}

// 生成元数据
export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category as keyof typeof categoryInfo
  const info = categoryInfo[category] || { title: 'Gallery', description: 'Photo Gallery' }
  
  return {
    title: `${info.title} - Gallery`,
    description: info.description,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category as keyof typeof categoryInfo
  const info = categoryInfo[category] || { title: 'Gallery', description: 'Photo Gallery' }

  return <GalleryContent category={category} info={info} />
} 