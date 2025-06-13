import galleryConfig from '../config/gallery.json'
import homeConfig from '../config/home.json'
import type { GalleryConfig, Category, Album, Photo, HomeConfig } from '../types/config'

const config = galleryConfig as GalleryConfig
const home = homeConfig as HomeConfig

export function getCategoryInfo(category: string): Category | undefined {
  return config.categories[category]
}

export function getAlbumsByCategory(category: string): Album[] {
  return config.categories[category]?.albums || []
}

export function getPhotosByAlbum(albumId: string): Photo[] {
  return config.photos[albumId] || []
}

export function getAllCategories(): string[] {
  return Object.keys(config.categories)
}

export function getHomeConfig(): HomeConfig {
  return home
} 