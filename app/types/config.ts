export interface Category {
  title: string
  description: string
  albums: Album[]
}

export interface Album {
  id: string
  title: string
  description: string
  photoCount: number
  createdAt: string
  coverImage: string
}

export interface Photo {
  id: string
  src: string
  alt: string
  title: string
  description: string
}

export interface GalleryConfig {
  categories: {
    [key: string]: Category
  }
  albums: {
    [key: string]: Album[]
  }
  photos: {
    [key: string]: Photo[]
  }
}

export interface HeroSection {
  title: string
  subtitle: string
  description: string
  backgroundImage: string
  ctaText: string
  ctaLink: string
}

export interface FeaturedCollection {
  id: string
  title: string
  description: string
  image: string
  link: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  id: string
  content: string
  author: string
  role: string
}

export interface HomeConfig {
  hero: HeroSection
  featured: {
    title: string
    description: string
    collections: FeaturedCollection[]
  }
  services: {
    title: string
    description: string
    items: Service[]
  }
  testimonials: {
    title: string
    description: string
    items: Testimonial[]
  }
} 