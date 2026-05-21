import type { Metadata } from 'next'
import { StayPageContent } from './StayPageContent'

export const metadata: Metadata = {
  title: 'Stay | Riverside Nature Retreat — Luxury Cottages in Bhedaghat',
  description:
    'Explore our AC Deluxe Cottages, Family Suite Cottages, and Premium River View Cottages. Each room offers views of the Narmada valley and refined amenities.',
}

export default function StayPage() {
  return <StayPageContent />
}
