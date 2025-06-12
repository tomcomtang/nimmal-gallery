import { Metadata } from 'next'
import Footer from '@/app/components/Footer'

// 定义类别信息
const categoryInfo = {
  work: {
    title: '',
    description: '',
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

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category as keyof typeof categoryInfo
  const info = categoryInfo[category] || { title: 'Gallery', description: 'Photo Gallery' }

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* 内容层 */}
      <div className="container mx-auto px-4 relative z-10">
        {/* 页面标题和描述 */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-light mb-4 text-gray-900">
            {info.title}
          </h1>
          <p className="text-lg text-gray-600">
            {info.description}
          </p>
        </div>

        {/* 照片网格 */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {photos.map((photo, index) => (
              <div 
                key={photo.id}
                className={`group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                  index === 0 ? 'md:col-span-7' : index === 1 ? 'md:col-span-5' : 'md:col-span-4'
                }`}
              >
                <div className="h-[360px] w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {index === 0 && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/80" />
                        <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
                          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                            Welcome to My Gallery
                          </h2>
                          <p className="text-lg text-gray-700 mb-6 max-w-2xl">
                            Here you'll find a collection of my favorite moments and creative works. Each image tells a unique story, capturing the beauty of life through my lens.
                          </p>
                          <p className="text-base text-gray-600 max-w-2xl">
                            Photography has been my passion for over a decade. Through this gallery, I hope to share not just images, but the emotions and stories behind them. Every shot is a window into a moment that moved me, and I'm excited to share these moments with you.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {index !== 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-medium mb-2">{photo.title}</h3>
                      <p className="text-sm text-gray-200">{photo.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <Footer />
    </div>
  )
} 