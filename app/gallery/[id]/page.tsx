import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery Detail - MOA Garden Rooms',
  description: 'View our gallery of garden rooms and studios',
}

export default function GalleryDetail({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Gallery Detail</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gallery items will be added here */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>Gallery ID: {params.id}</p>
          </div>
        </div>
      </div>
    </main>
  )
} 