import type { Metadata } from 'next'
import { WeddingsPageContent } from './WeddingsPageContent'

export const metadata: Metadata = {
  title: 'Weddings & Events | Riverside Nature Retreat — Destination Celebrations',
  description:
    'Host your dream destination wedding or corporate event at Riverside Nature Retreat. Green marriage lawns, conference halls, and bespoke planning services.',
}

export default function WeddingsPage() {
  return <WeddingsPageContent />
}
