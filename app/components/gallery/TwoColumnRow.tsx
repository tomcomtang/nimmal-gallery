import { Photo } from '@/app/types/gallery'

interface TwoColumnRowProps {
  photos: Photo[]
  onPhotoClick: (photo: Photo, e: React.MouseEvent) => void
  info?: {
    title: string
    description: string
  }
}

export default function TwoColumnRow({ photos, onPhotoClick, info }: TwoColumnRowProps) {
  return (
    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8">
      {photos.map((photo, index) => (
        <div 
          key={photo.id}
          className={`md:col-span-${index === 0 ? '7' : '5'} group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${index === 1 ? 'cursor-pointer' : ''}`}
          onClick={index === 1 ? (e) => onPhotoClick(photo, e) : undefined}
        >
          <div className="w-full h-[300px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="w-full h-full overflow-hidden rounded-lg">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Photo count label */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-700">
                    {photo.photoCount} Photos
                  </span>
                </div>
              </div>
            </div>
            {index === 0 && info && (
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
      ))}
    </div>
  )
} 