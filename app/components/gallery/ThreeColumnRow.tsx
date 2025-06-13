import { Photo } from '@/app/types/gallery'

interface ThreeColumnRowProps {
  photos: Photo[]
  onPhotoClick: (photo: Photo, e: React.MouseEvent) => void
}

export default function ThreeColumnRow({ photos, onPhotoClick }: ThreeColumnRowProps) {
  return (
    <>
      {photos.map((photo, index) => (
        <div 
          key={photo.id}
          className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-4 cursor-pointer"
          onClick={(e) => onPhotoClick(photo, e)}
        >
          <div className="w-full relative h-[360px]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="w-full h-full overflow-hidden rounded-lg">
                {photo.useGrid ? (
                  <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                    {photo.coverImages?.map((imgSrc, imgIndex) => (
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
                {/* Photo count label - 只在非第一个相册显示照片数 */}
                {index !== 0 && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                    <span className="text-sm font-medium text-gray-700">
                      {photo.photoCount} Photos
                    </span>
                  </div>
                )}
                {/* 创建时间 - 所有相册都显示 */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(photo.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
} 