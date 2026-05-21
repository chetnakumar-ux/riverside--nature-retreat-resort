export const RESORT_INFO = {
  name: 'Vrindavan Gopala Resort',
  tagline: 'Where the Narmada Whispers Luxury',
  description:
    'A premium nature resort nestled at the edge of the majestic Dhuandhar Falls, offering an unparalleled retreat amidst the ancient marble cliffs and sacred waters of the Narmada.',
address: 'Riverside Nature Retreat, Central India',
phone: ['+91-90000-00000', '+91-91111-11111'],
email: 'contact@demo-resort.com',
  hours: '07:00 - 22:00, All Days',
whatsapp: '+91-91111-11111',
googleMapsEmbed:
  'https://www.google.com/maps?q=India&output=embed',
virtualTour: 'https://example.com/virtual-tour',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Stay', href: '/stay' },
  { label: 'Dining', href: '/dining' },
  { label: 'Weddings & Events', href: '/weddings' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const

export const ROOMS = [
  {
    id: 'ac-deluxe',
    name: 'AC Deluxe Cottage',
    slug: 'ac-deluxe-cottage',
    shortDesc: 'Refined comfort with modern amenities and lush garden views.',
    description:
      'Step into a world of refined comfort in our AC Deluxe Cottages. Each thoughtfully designed cottage offers air-conditioned tranquility, plush bedding, and private views of the resort\'s verdant gardens. Wake to the distant sound of the Narmada, and fall asleep under a canopy of stars.',
    features: [
      'Air Conditioning',
      'King-size Bed',
      'Rainfall Shower',
      'Garden View',
      'Complimentary Toiletries',
      'Mini Refrigerator',
      'Room Service',
      'Free Wi-Fi',
    ],
    capacity: '2 Adults',
    size: '320 sq ft',
    image: '/images/room-deluxe.jpg',
  },
  {
    id: 'family-suite',
    name: 'Family Suite Cottage',
    slug: 'family-suite-cottage',
    shortDesc: 'Spacious retreats designed for families seeking a memorable escape.',
    description:
      'Our Family Suite Cottages offer generous living spaces where families can gather, unwind, and create lasting memories. With separate sleeping areas, a comfortable living space, and views that stretch across the Narmada landscape, every moment becomes a cherished experience.',
    features: [
      'Air Conditioning',
      'Multiple Bedrooms',
      'Living Area',
      'Rainfall Shower',
      'Panoramic Views',
      'Mini Refrigerator',
      'Room Service',
      'Free Wi-Fi',
      'Daily Housekeeping',
    ],
    capacity: '4 Adults + 2 Children',
    size: '580 sq ft',
    image: '/images/room-family.jpg',
  },
  {
    id: 'premium-cottage',
    name: 'Premium River View Cottage',
    slug: 'premium-river-view',
    shortDesc: 'Elevated luxury with sweeping views of the Narmada valley.',
    description:
      'Our most distinguished accommodation, the Premium River View Cottage, places you at the very edge of natural splendor. Floor-to-ceiling windows frame the marble cliffs and the winding Narmada below. Every detail — from the handpicked furnishings to the curated minibar — speaks of understated luxury.',
    features: [
      'Air Conditioning',
      'King-size Bed',
      'Private Balcony',
      'Narmada River View',
      'Rainfall Shower',
      'Curated Minibar',
      'Premium Toiletries',
      'Room Service',
      'Free Wi-Fi',
      'Lounge Seating',
    ],
    capacity: '2 Adults',
    size: '420 sq ft',
    image: '/images/room-premium.jpg',
  },
] as const

export const EXPERIENCES = [
  {
    title: 'Marble Rocks Boat Ride',
    description:
      'Glide through the ancient marble gorge on the Narmada. Under moonlight, the white cliffs glow — a sight ranked among the world\'s three great marble gorges.',
    icon: 'boat',
    image: '/images/exp-boat.jpg',
  },
  {
    title: 'Dhuandhar Falls at Sunrise',
    description:
      'Witness the thundering cascade of the Narmada as the first light paints the mist in gold. Just steps from our resort, this spectacle is your morning ritual.',
    icon: 'waterfall',
    image: '/images/exp-falls.jpg',
  },
  {
    title: 'Ropeway Over the Gorge',
    description:
      'Soar above the marble cliffs on the Bhedaghat Ropeway. An aerial perspective of the falls and the river valley that will leave you breathless.',
    icon: 'ropeway',
    image: '/images/exp-ropeway.jpg',
  },
  {
    title: 'Chaunsath Yogini Temple',
    description:
      'Explore the 10th-century circular temple perched on a hilltop, dedicated to 64 Yoginis. A place of deep spiritual resonance overlooking the Narmada.',
    icon: 'temple',
    image: '/images/exp-temple.jpg',
  },
  {
    title: 'Nature Walks & Birding',
    description:
      'Wander through the resort\'s lush gardens and into the surrounding forests. The Narmada valley teems with indigenous birdlife and seasonal blooms.',
    icon: 'nature',
    image: '/images/exp-nature.jpg',
  },
  {
    title: 'Cultural Evenings',
    description:
      'Experience the living traditions of Madhya Pradesh through folk music, local art, and curated cultural evenings arranged exclusively for our guests.',
    icon: 'culture',
    image: '/images/exp-culture.jpg',
  },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'The location is simply breathtaking. Waking up to the sound of the Narmada and the view of marble cliffs — it felt like a dream we didn\'t want to end.',
    author: 'Priya & Ankit Sharma',
    context: 'Anniversary Stay',
    rating: 5,
  },
  {
    quote:
      'We celebrated our daughter\'s wedding here and the team made it absolutely magical. The green lawns, the falls in the background, delicious food — everything was perfect.',
    author: 'Rajesh Tiwari',
    context: 'Destination Wedding',
    rating: 5,
  },
  {
    quote:
      'A beautiful property with courteous staff. The cottage was well-maintained and the restaurant served some of the best local cuisine we\'ve had. Highly recommended for families.',
    author: 'Meera Joshi',
    context: 'Family Vacation',
    rating: 4,
  },
  {
    quote:
      'The boat ride through Marble Rocks and the aerial ropeway — all accessible within minutes. This resort is the perfect base to explore Bhedaghat\'s wonders.',
    author: 'Sanjay Verma',
    context: 'Weekend Getaway',
    rating: 5,
  },
] as const
