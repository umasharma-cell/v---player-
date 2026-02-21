import type { VideoItem } from '../types';

// Sample MP4 videos from public sources
// Using Blender Foundation open movies and other CC-licensed content
const SAMPLE_VIDEOS = {
  // Big Buck Bunny - Blender Foundation (CC-BY)
  bigBuckBunny: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  // Elephant's Dream - Blender Foundation
  elephantsDream: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  // For Bigger Blazes
  forBiggerBlazes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  // For Bigger Escapes
  forBiggerEscapes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  // For Bigger Fun
  forBiggerFun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  // For Bigger Joyrides
  forBiggerJoyrides: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  // For Bigger Meltdowns
  forBiggerMeltdowns: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  // Sintel - Blender Foundation
  sintel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  // Subaru Outback
  subaruOutback: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  // Tears of Steel - Blender Foundation
  tearsOfSteel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  // Volkswagen GTI
  volkswagenGTI: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  // We Are Going On Bullrun
  bullrun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  // What Car Can You Get
  whatCar: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
};

// Thumbnail base URL (using video frame captures)
const getThumbnail = (videoKey: string): string => {
  // Google's sample videos have associated thumbnails
  const thumbnails: Record<string, string> = {
    bigBuckBunny: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    elephantsDream: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    forBiggerBlazes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    forBiggerEscapes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    forBiggerFun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
    forBiggerJoyrides: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    forBiggerMeltdowns: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    sintel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    subaruOutback: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
    tearsOfSteel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    volkswagenGTI: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg',
    bullrun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg',
    whatCar: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg',
  };
  return thumbnails[videoKey] || '';
};

// Video catalog with categories
export const videos: VideoItem[] = [
  // Action
  {
    id: 'action-1',
    title: 'Big Buck Bunny',
    thumbnail: getThumbnail('bigBuckBunny'),
    duration: 596,
    category: 'Action',
    videoUrl: SAMPLE_VIDEOS.bigBuckBunny,
    description: 'A large rabbit deals with three bullying rodents.',
  },
  {
    id: 'action-2',
    title: 'For Bigger Blazes',
    thumbnail: getThumbnail('forBiggerBlazes'),
    duration: 15,
    category: 'Action',
    videoUrl: SAMPLE_VIDEOS.forBiggerBlazes,
    description: 'An action-packed introduction.',
  },
  {
    id: 'action-3',
    title: 'For Bigger Escapes',
    thumbnail: getThumbnail('forBiggerEscapes'),
    duration: 15,
    category: 'Action',
    videoUrl: SAMPLE_VIDEOS.forBiggerEscapes,
    description: 'High-octane escape sequences.',
  },
  {
    id: 'action-4',
    title: 'Sintel',
    thumbnail: getThumbnail('sintel'),
    duration: 888,
    category: 'Action',
    videoUrl: SAMPLE_VIDEOS.sintel,
    description: 'A girl searches for her pet dragon.',
  },

  // Comedy
  {
    id: 'comedy-1',
    title: 'For Bigger Fun',
    thumbnail: getThumbnail('forBiggerFun'),
    duration: 60,
    category: 'Comedy',
    videoUrl: SAMPLE_VIDEOS.forBiggerFun,
    description: 'Fun moments compilation.',
  },
  {
    id: 'comedy-2',
    title: 'For Bigger Joyrides',
    thumbnail: getThumbnail('forBiggerJoyrides'),
    duration: 15,
    category: 'Comedy',
    videoUrl: SAMPLE_VIDEOS.forBiggerJoyrides,
    description: 'Joyful adventures on the road.',
  },
  {
    id: 'comedy-3',
    title: 'For Bigger Meltdowns',
    thumbnail: getThumbnail('forBiggerMeltdowns'),
    duration: 15,
    category: 'Comedy',
    videoUrl: SAMPLE_VIDEOS.forBiggerMeltdowns,
    description: 'When things go hilariously wrong.',
  },

  // Drama
  {
    id: 'drama-1',
    title: "Elephant's Dream",
    thumbnail: getThumbnail('elephantsDream'),
    duration: 653,
    category: 'Drama',
    videoUrl: SAMPLE_VIDEOS.elephantsDream,
    description: 'Two people explore a strange mechanical world.',
  },
  {
    id: 'drama-2',
    title: 'Tears of Steel',
    thumbnail: getThumbnail('tearsOfSteel'),
    duration: 734,
    category: 'Drama',
    videoUrl: SAMPLE_VIDEOS.tearsOfSteel,
    description: 'A sci-fi short film about robots and humanity.',
  },

  // Technology
  {
    id: 'tech-1',
    title: 'Volkswagen GTI Review',
    thumbnail: getThumbnail('volkswagenGTI'),
    duration: 120,
    category: 'Technology',
    videoUrl: SAMPLE_VIDEOS.volkswagenGTI,
    description: 'In-depth review of the Volkswagen GTI.',
  },
  {
    id: 'tech-2',
    title: 'What Car Can You Get For A Grand',
    thumbnail: getThumbnail('whatCar'),
    duration: 180,
    category: 'Technology',
    videoUrl: SAMPLE_VIDEOS.whatCar,
    description: 'Exploring budget car options.',
  },

  // Sports
  {
    id: 'sports-1',
    title: 'Subaru Outback On Street And Dirt',
    thumbnail: getThumbnail('subaruOutback'),
    duration: 150,
    category: 'Sports',
    videoUrl: SAMPLE_VIDEOS.subaruOutback,
    description: 'Testing the Subaru Outback on various terrains.',
  },
  {
    id: 'sports-2',
    title: 'We Are Going On Bullrun',
    thumbnail: getThumbnail('bullrun'),
    duration: 90,
    category: 'Sports',
    videoUrl: SAMPLE_VIDEOS.bullrun,
    description: 'An epic automotive adventure.',
  },
];

export default videos;
