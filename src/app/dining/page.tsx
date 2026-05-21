import type { Metadata } from 'next'
import { DiningPageContent } from './DiningPageContent'

export const metadata: Metadata = {
  title: 'Dining | Riverside Nature Retreat, Central India — Culinary Experiences in Bhedaghat',
  description:
    'Savour multi-cuisine dining at Riverside Nature Retreat. From local Bundeli cuisine to continental fare, experience flavours rooted in the Narmada valley.',
}

export default function DiningPage() {
  return <DiningPageContent />
}
