import { Metadata } from 'next'
import Link from 'next/link'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'MOA Garden Rooms',
  description: 'We create innovative, design-focused Garden Rooms. With a focus on quality and sustainability, our studios are handcrafted with you in mind.',
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 背景层 */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50" />
      
      {/* 内容层 */}
      <div className="flex-1 pt-16 flex items-center relative z-10">
        <div className="container mx-auto px-4">
          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* 左侧图片区域 */}
            <div className="relative h-[600px] flex items-center">
              {/* 第一张图片 - 最底层 */}
              <div className="absolute right-0 top-0 w-[90%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-3 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src="https://moa.ie/wp-content/uploads/2021/08/Hero_home_1-scaledV2-1.jpg"
                    alt="MOA Garden Room 1"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* 第二张图片 */}
              <div className="absolute right-[15%] top-[10%] w-[90%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform rotate-2 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src="https://moa.ie/wp-content/uploads/2021/04/MOA_14_1-scaled.jpg"
                    alt="MOA Garden Room 2"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* 第三张图片 */}
              <div className="absolute right-[30%] top-[20%] w-[90%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-1 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src="https://moa.ie/wp-content/uploads/2021/04/Moa_20_1-scaled-1.jpg"
                    alt="MOA Garden Room 3"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* 第四张图片 */}
              <div className="absolute right-[5%] top-[30%] w-[85%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform rotate-3 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src="https://moa.ie/wp-content/uploads/2021/04/Moa_24_1-scaled-1.jpg"
                    alt="MOA Garden Room 4"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* 第五张图片 */}
              <div className="absolute right-[25%] top-[5%] w-[85%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-2 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src="https://moa.ie/wp-content/uploads/2021/04/Moa_Carbon_Front_Crop_2.jpg"
                    alt="MOA Garden Room 5"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* 第六张图片 */}
              <div className="absolute right-[40%] top-[15%] w-[85%] aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform rotate-1 hover:scale-[1.02] transition-transform duration-300 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src="https://moa.ie/wp-content/uploads/2021/04/MOA_plat_3-scaled.jpg"
                    alt="MOA Garden Room 6"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* 右侧介绍区域 */}
            <div className="flex flex-col justify-center relative z-20">
              <h2 className="text-3xl font-semibold mb-6 text-gray-900">Pioneering Garden Studios</h2>
              <p className="text-lg text-gray-800 mb-8">
                We create innovative, design-focused Garden Rooms. With a focus on quality and sustainability, 
                our studios are handcrafted with you in mind.
              </p>
              <div className="space-y-4">
                <p className="text-gray-700">
                  • Premium materials and craftsmanship
                </p>
                <p className="text-gray-700">
                  • Sustainable and eco-friendly design
                </p>
                <p className="text-gray-700">
                  • Custom solutions for your space
                </p>
              </div>
              <Link
                href="/gallery"
                className="mt-8 inline-block px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Our Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <Footer />
    </div>
  )
} 