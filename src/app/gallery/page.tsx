import type { Metadata } from 'next'
import { GalleryPageContent } from './GalleryPageContent'

export const metadata: Metadata = {
  title: 'Gallery | Riverside Nature Retreat — Visual Journey',
  description:
    'Browse our gallery of luxury cottages, scenic surroundings, dining, weddings, and the natural beauty of Bhedaghat and Dhuandhar Falls.',
}

export default function GalleryPage() {
  return <GalleryPageContent />
}
