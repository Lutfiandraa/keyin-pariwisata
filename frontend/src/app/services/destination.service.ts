import { Injectable } from '@angular/core';

export interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
  article: string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private destinations: Destination[] = [
    {
      id: 1,
      name: 'Mecca',
      image: 'assets/kabah.png',
      description: 'The holiest city in Islam, home to the Kaaba and the annual Hajj pilgrimage.',
      article: 'Mecca, officially Makkah al-Mukarramah, is a city in Saudi Arabia and the holiest city in Islam. It is the birthplace of the Prophet Muhammad and the site of the Kaaba, the most sacred site in Islam. Every year, millions of Muslims from around the world perform the Hajj pilgrimage to Mecca. The city is home to the Grand Mosque (Masjid al-Haram), which surrounds the Kaaba. Mecca has been a center of Islamic worship for over 1,400 years and continues to be a symbol of unity for Muslims worldwide.'
    },
    {
      id: 2,
      name: 'Georgia',
      image: 'assets/georgia.png',
      description: 'A country at the intersection of Europe and Asia, known for its stunning mountain landscapes and ancient history.',
      article: 'Georgia is a transcontinental country located at the intersection of Eastern Europe and Western Asia. It is known for its diverse landscapes, from the snow-capped peaks of the Greater Caucasus Mountains to the subtropical Black Sea coast. The country boasts a rich cultural heritage with ancient churches, monasteries, and fortresses. Tbilisi, the capital, is famous for its diverse architecture and sulfur baths. Georgia is also renowned for its wine-making tradition, which dates back over 8,000 years, making it one of the oldest wine-producing regions in the world.'
    },
    {
      id: 3,
      name: 'Russia',
      image: 'assets/rusia.png',
      description: 'The largest country in the world, spanning Eastern Europe and Northern Asia with rich cultural heritage.',
      article: 'Russia is the largest country in the world, covering more than one-eighth of Earth\'s inhabited land area. It spans Eastern Europe and Northern Asia, with diverse landscapes ranging from tundra and forests to steppes and mountains. Moscow, the capital, is home to iconic landmarks like the Kremlin and Red Square. Saint Petersburg, known as the "Venice of the North," features magnificent palaces and the Hermitage Museum. Russia\'s rich cultural heritage includes world-renowned literature, ballet, classical music, and architecture, with influences from both European and Asian traditions.'
    },
    {
      id: 4,
      name: 'Spain',
      image: 'assets/Spain.png',
      description: 'A vibrant country in southwestern Europe, famous for its art, architecture, and rich cultural traditions.',
      article: 'Spain is a country in southwestern Europe, known for its diverse culture, stunning architecture, and beautiful coastlines. Barcelona is famous for Antoni Gaudí\'s architectural masterpieces, including the Sagrada Família. Madrid, the capital, houses world-class museums like the Prado. Spain\'s rich history is evident in its Moorish palaces, Gothic cathedrals, and Roman ruins. The country is also renowned for its cuisine, flamenco dancing, and festivals like La Tomatina and Running of the Bulls. Spain\'s Mediterranean beaches and vibrant nightlife make it a popular tourist destination.'
    },
    {
      id: 5,
      name: 'Swiss',
      image: 'assets/swiss.png',
      description: 'A landlocked country in Central Europe, famous for its mountains, chocolate, and precision timepieces.',
      article: 'Switzerland, officially the Swiss Confederation, is a landlocked country in Central Europe. It is renowned for its stunning Alpine landscapes, pristine lakes, and charming cities. The country is famous for its neutrality, banking sector, and high quality of life. Swiss cities like Zurich, Geneva, and Bern offer a perfect blend of medieval architecture and modern amenities. Switzerland is also known for its world-class ski resorts, chocolate, cheese, and precision timepieces. The Swiss Alps provide breathtaking scenery and opportunities for hiking, skiing, and mountaineering.'
    },
    {
      id: 6,
      name: 'Turkey',
      image: 'assets/tukery.png',
      description: 'A transcontinental country bridging Europe and Asia, with a rich history and diverse cultural heritage.',
      article: 'Turkey is a transcontinental country located mainly on the Anatolian Peninsula in Western Asia, with a smaller portion on the Balkan Peninsula in Southeast Europe. Istanbul, the largest city, straddles the Bosphorus Strait, connecting Europe and Asia. The country is home to ancient ruins like Ephesus and Troy, as well as stunning natural wonders like Cappadocia\'s fairy chimneys and Pamukkale\'s travertine terraces. Turkish cuisine is world-renowned, featuring dishes like kebabs, baklava, and Turkish delight. The country\'s rich history spans the Byzantine and Ottoman empires, leaving behind magnificent mosques, palaces, and bazaars.'
    },
    {
      id: 7,
      name: 'Cotswold',
      image: 'assets/cotswold.jpg',
      description: 'A picturesque region in England known for its rolling hills, charming villages, and honey-colored stone cottages.',
      article: 'The Cotswolds is an area of outstanding natural beauty in south-central England, covering parts of six counties. It is famous for its rolling hills, picturesque villages, and distinctive honey-colored limestone buildings. The region is dotted with charming market towns like Stow-on-the-Wold, Bourton-on-the-Water, and Chipping Campden. The Cotswolds offers scenic walking trails, historic gardens, and traditional English pubs. The area\'s rich history dates back to the Roman era, and many villages have preserved their medieval character. The Cotswolds is a popular destination for those seeking quintessential English countryside charm.'
    },
    {
      id: 8,
      name: 'Denmark',
      image: 'assets/denmark.jpg',
      description: 'A Scandinavian country known for its design, hygge culture, and the happiest people in the world.',
      article: 'Denmark is a Nordic country in Northern Europe, known for its high quality of life, innovative design, and the concept of "hygge" (coziness). Copenhagen, the capital, is famous for its colorful Nyhavn harbor, the Little Mermaid statue, and Tivoli Gardens. Denmark is renowned for its bicycle culture, sustainable living, and world-class cuisine, including the New Nordic food movement. The country boasts beautiful castles, Viking heritage, and stunning coastlines. Denmark consistently ranks as one of the happiest countries in the world, known for its social welfare system, work-life balance, and emphasis on happiness and well-being.'
    },
    {
      id: 9,
      name: 'Al - Ula',
      image: 'assets/al-ula.png',
      description: 'An ancient oasis city in Saudi Arabia, home to spectacular rock formations and archaeological wonders.',
      article: 'Al-Ula is a region in northwestern Saudi Arabia, home to one of the country\'s most spectacular archaeological sites. The area features stunning rock formations, ancient tombs carved into mountains, and the UNESCO World Heritage site of Hegra (Mada\'in Saleh). Al-Ula was once a crucial stop on the incense trade route and is home to well-preserved Nabatean ruins similar to Petra in Jordan. The region\'s dramatic landscapes include sandstone canyons, palm groves, and desert vistas. Recent developments have transformed Al-Ula into a major cultural destination, hosting art installations, music festivals, and luxury resorts while preserving its ancient heritage.'
    },
    {
      id: 10,
      name: 'Palestine',
      image: 'assets/palestine.png',
      description: 'A region with deep historical and religious significance, home to sacred sites and rich cultural heritage.',
      article: 'Palestine is a region in the Middle East with profound historical, religious, and cultural significance. It is home to sacred sites for Judaism, Christianity, and Islam, including Jerusalem\'s Old City, the Church of the Holy Sepulchre, the Western Wall, and the Al-Aqsa Mosque. The region has been a crossroads of civilizations for thousands of years, with archaeological sites dating back to ancient times. Palestine\'s cultural heritage includes traditional crafts, cuisine, music, and dance. The region\'s diverse landscapes range from the Mediterranean coast to the Jordan Valley and the Judean Desert, offering visitors a rich tapestry of history, spirituality, and natural beauty.'
    },
    {
      id: 11,
      name: 'Palm Jumeirah',
      image: 'assets/palmjumeira.png',
      description: 'An iconic man-made island in Dubai, shaped like a palm tree and home to luxury resorts and residences.',
      article: 'Palm Jumeirah is an artificial archipelago in Dubai, United Arab Emirates, created using land reclamation. It is shaped like a palm tree and is one of the most iconic engineering marvels in the world. The island is home to luxury hotels, including the famous Atlantis, The Palm, as well as upscale residential properties, restaurants, and entertainment venues. Palm Jumeirah offers stunning views of the Arabian Gulf and the Dubai skyline. The island features pristine beaches, world-class spas, and water sports activities. It represents Dubai\'s ambition and innovation in creating unique tourist destinations and luxury living experiences.'
    },
    {
      id: 12,
      name: 'Egypt',
      image: 'assets/egypt.png',
      description: 'An ancient civilization along the Nile River, home to pyramids, pharaohs, and millennia of history.',
      article: 'Egypt is a transcontinental country spanning the northeast corner of Africa and southwest corner of Asia. It is home to one of the world\'s oldest civilizations, with a history spanning over 5,000 years. The country is famous for its ancient monuments, including the Great Pyramids of Giza, the Sphinx, and the Valley of the Kings. Cairo, the capital, is a bustling metropolis where ancient and modern coexist. The Nile River, the longest river in the world, has been the lifeblood of Egyptian civilization. Egypt\'s rich cultural heritage includes hieroglyphics, mummies, pharaonic temples, and Islamic architecture. The country continues to be a major tourist destination, attracting millions of visitors annually.'
    },
    {
      id: 13,
      name: 'Monaco',
      image: 'assets/monaco.png',
      description: 'A tiny principality on the French Riviera, known for luxury, Formula 1, and glamorous lifestyle.',
      article: 'Monaco is a sovereign city-state and microstate on the French Riviera in Western Europe. Despite being the second-smallest country in the world, Monaco is renowned for its wealth, luxury, and glamour. The principality is famous for the Monte Carlo Casino, the Formula 1 Monaco Grand Prix, and its yacht-filled harbor. Monaco\'s stunning Mediterranean coastline, mild climate, and tax advantages have made it a haven for the wealthy and famous. The country features beautiful gardens, the Prince\'s Palace, and world-class museums. Monaco\'s compact size means everything is within walking distance, making it a unique and exclusive destination for luxury travelers.'
    },
    {
      id: 14,
      name: 'Manhattan Penthouse',
      image: 'assets/manhattan.png',
      description: 'Luxury living in the heart of New York City, offering stunning skyline views and world-class amenities.',
      article: 'Manhattan is the most densely populated borough of New York City and the economic and cultural heart of the city. A Manhattan penthouse represents the pinnacle of luxury urban living, offering breathtaking views of the iconic skyline, Central Park, and the surrounding cityscape. These exclusive residences feature high-end finishes, private terraces, and world-class amenities. Manhattan is home to world-renowned landmarks like Times Square, Central Park, the Empire State Building, and Broadway. The borough offers unparalleled access to fine dining, shopping, entertainment, and cultural institutions like the Metropolitan Museum of Art and the Museum of Modern Art. Living in a Manhattan penthouse means being at the center of one of the world\'s most vibrant and dynamic cities.'
    }
  ];

  getAllDestinations(): Destination[] {
    return this.destinations;
  }

  getDestinationByName(name: string): Destination | undefined {
    return this.destinations.find(dest => 
      dest.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(dest.name.toLowerCase())
    );
  }

  searchDestinations(query: string): Destination[] {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return this.destinations.filter(dest =>
      dest.name.toLowerCase().includes(lowerQuery) ||
      dest.description.toLowerCase().includes(lowerQuery)
    );
  }
}

