import { Metadata } from 'next'
import GalleryContent from './GalleryContent'

// 定义类别信息
const categoryInfo = {
  work: {
    title: 'Work',
    description: 'Showcasing professional projects and creative works',
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