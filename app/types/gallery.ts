export interface Photo {
  id: string
  src: string
  alt: string
  title: string
  description: string
  galleryInfo?: {
    title: string
    description: string
    photoCount: number
    createdAt: string
  }
  photoCount?: number
  useGrid?: boolean
  coverImages?: string[]
  createdAt?: string
}

export interface TwoColumnRowProps {
  photos: Photo[]
}

export interface ThreeColumnRowProps {
  photos: Photo[]
}

export interface MixedRowProps {
  photos: Photo[]
}

export interface TwoEqualRowProps {
  photos: Photo[]
}

export interface TwoUnequalRowProps {
  photos: Photo[]
} 