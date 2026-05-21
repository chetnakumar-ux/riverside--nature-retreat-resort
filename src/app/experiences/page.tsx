import type { Metadata } from 'next'
import { ExperiencesPageContent } from './ExperiencesPageContent'

export const metadata: Metadata = {
  title: 'Experiences | Riverside Nature Retreat — Bhedaghat Adventures',
  description:
    'Explore curated experiences near Riverside Nature Retreat — Marble Rocks boat rides, Dhuandhar Falls, Ropeway, Chaunsath Yogini Temple, nature walks, and more.',
}

export default function ExperiencesPage() {
  return <ExperiencesPageContent />
}
