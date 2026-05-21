import type { Metadata } from 'next'
import { ContactPageContent } from './ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact & Book | Riverside Nature Retreat — Reserve Your Stay',
  description:
    'Contact Riverside Nature Retreat, Central India to book your stay, plan a wedding, or inquire about experiences. Located at Dhuandhar Falls, Bhedaghat, Jabalpur.',
}

export default function ContactPage() {
  return <ContactPageContent />
}
