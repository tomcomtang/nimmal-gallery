export interface Photo {
  id: number
  src: string
  alt: string
  title: string
  description: string
  galleryInfo: {
    title: string
    description: string
  }
  photoCount: number
  useGrid?: boolean
  coverImages?: string[]
  createdAt: string
} 