export type GalleryCategory = "Events" | "Devices" | "Lab" | "Workshops";

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  images?: string[];
  category: GalleryCategory;
  description: string;
  videoEmbed?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Stroke Camp 2017",
    image: "/gallery/stroke-camp-2017-1.jpg",
    images: [
      "/gallery/stroke-camp-2017-1.jpg",
      "/gallery/stroke-camp-2017-2.jpg",
      "/gallery/stroke-camp-2017-3.jpg",
      "/gallery/stroke-camp-2017-4.jpg",
    ],
    category: "Events",
    description: "Stroke Camp organized by CCSRR on 7th October 2017 to help stroke survivors lead a healthy life.",
  },
  {
    id: "g2",
    title: "MIPCON 2017 Stroke Workshop with Prof. Coralie English",
    image: "/gallery/mipcon-2017-1.jpg",
    images: [
      "/gallery/mipcon-2017-1.jpg",
      "/gallery/mipcon-2017-2.jpg",
      "/gallery/mipcon-2017-3.jpg",
      "/gallery/mipcon-2017-4.jpg",
    ],
    category: "Workshops",
    description: "Stroke workshop conducted by Prof. Coralie English at MIPCON 2017.",
  },
  {
    id: "g3",
    title: "Prof. Coralie English Visit to CCSRR 2017",
    image: "/gallery/coralie-visit-1.jpg",
    images: [
      "/gallery/coralie-visit-1.jpg",
      "/gallery/coralie-visit-2.jpg",
    ],
    category: "Events",
    description: "Prof. Coralie English visiting the CCSRR research team led by A/Prof. John Solomon.",
  },
  {
    id: "g4",
    title: "Rendezvous with Dr. Fabiano Santos, Senior Program Officer, IDRC, Canada 2017",
    image: "/gallery/fabiano-santos-1.jpg",
    images: [
      "/gallery/fabiano-santos-1.jpg",
      "/gallery/fabiano-santos-2.jpg",
    ],
    category: "Events",
    description: "Meeting with Dr. Fabiano Santos, Senior Program Officer, IDRC, Canada.",
  },
  {
    id: "g5",
    title: "Celebrating World Stroke Day 2017",
    image: "/gallery/world-stroke-day-1.jpg",
    images: [
      "/gallery/world-stroke-day-1.jpg",
      "/gallery/world-stroke-day-2.jpg",
      "/gallery/world-stroke-day-3.jpg",
      "/gallery/world-stroke-day-4.jpg",
    ],
    category: "Events",
    description: "World Stroke Day celebration by CCSRR.",
  },
  {
    id: "g6",
    title: "Participated in MAHE Research Day 2024",
    image: "/gallery/mahe-research-day-2024.png",
    images: [
      "/gallery/mahe-research-day-2024.png",
      "/gallery/CCSRR1.jpg",
      "/gallery/CCSRR2.jpg",
      "/gallery/CCSRR3.jpg",
      "/gallery/CCSRR4.jpg",
      "/gallery/CCSRR5.jpg",
      "/gallery/CCSRR6.jpg",
    ],
    category: "Events",
    description: "CCSRR participation in MAHE Research Day 2024.",
  },
  {
    id: "g12",
    title: "MAHE Research Day 2023",
    image: "/gallery/mahe-research-day-2023-1.jpg",
    images: [
      "/gallery/mahe-research-day-2023-1.jpg",
      "/gallery/mahe-research-day-2023-2.jpg",
      "/gallery/mahe-research-day-2023-3.jpg",
      "/gallery/mahe-research-day-2023-4.jpg",
      "/gallery/mahe-research-day-2023-5.jpg",
    ],
    category: "Events",
    description: "CCSRR participation in MAHE Research Day 2023.",
  },
  {
    id: "g7",
    title: "Advancing Stroke Recovery: National Workshop on Motor Rehabilitation 2025",
    image: "/gallery/motor-rehab-workshop-2026.png",
    category: "Workshops",
    description: "National Workshop on Motor Rehabilitation held on 30th and 31st October 2026.",
  },
  {
    id: "g8",
    title: "Guest Lecture by Dr. Kanika Bansal (University of Mount Union) 2025",
    image: "/gallery/kanika-bansal-lecture.png",
    category: "Workshops",
    description: "Sessions on community ambulation post-stroke and wearable technology for real-world walking performance, conducted on 15th and 16th December 2025.",
  },
  {
    id: "g9",
    title: "Lecture Series on Movement Analysis in Neurorehabilitation 2025",
    image: "/gallery/movement-analysis-lecture.png",
    category: "Workshops",
    description: "Lecture series by Dr. Sivakumar Balasubramanian, Professor and Head, Department of Bioengineering, CMC, Vellore, held from 15th to 18th December 2025.",
  },
  {
    id: "g10",
    title: "Guest Lecture on Brain Stimulation and Neuroplasticity by Dr. Anna Kuppuswamy (University of Leeds) 2025",
    image: "/gallery/anna-kuppuswamy-lecture.png",
    category: "Workshops",
    description: "Guest lecture by Dr. Anna Kuppuswamy, Director of NeuTraF Laboratory, University of Leeds, UK, held on 17th December 2025.",
  },
  {
    id: "g11",
    title: "HOMER Investigator Meet 2026",
    image: "/gallery/homer-investigator-meet.png",
    category: "Events",
    description: "HOMER investigator meet held from 2nd to 5th February 2026.",
  },
  {
    id: "g18",
    title: "Patient Education Talk on Udayavani by Dr. Apoorva M Shankaranarayana 2025",
    image: "/gallery/apoorva-udayavani-talk.png",
    category: "Events",
    description: "Patient education talk featured on Udayavani by Dr. Apoorva M Shankaranarayana.",
    videoEmbed: "https://youtu.be/PDOmMDnY7io",
  },
  {
    id: "g13",
    title: "Dr. John Solomon M Elected to WSO Board of Directors 2026",
    image: "/gallery/wso-board-election-2026.jpg",
    category: "Events",
    description: "Dr. John Solomon M has been elected to the Board of Directors of the World Stroke Organization, representing the Asia/Oceania Region for the term 2026-2030.",
  },
  {
    id: "g14",
    title: "Stroke Rehabilitation Camp 2024",
    image: "/gallery/stroke-camp-2024/PHOTO-2026-07-01-16-17-49 2.jpg",
    images: [
      "/gallery/stroke-camp-2024/PHOTO-2026-07-01-16-17-49 2.jpg",
      "/gallery/stroke-camp-2024/PHOTO-2026-07-01-16-17-49 3.jpg",
      "/gallery/stroke-camp-2024/PHOTO-2026-07-01-16-17-49 4.jpg",
      "/gallery/stroke-camp-2024/PHOTO-2026-07-01-16-17-49 8.jpg",
      "/gallery/stroke-camp-2024/PHOTO-2026-07-01-16-17-49 13.jpg",
      "/gallery/stroke-camp-2024/PHOTO-2026-07-01-16-17-49 14.jpg",
      "/gallery/stroke-camp-2024/PHOTO-2026-07-01-16-17-49 20.jpg",
    ],
    category: "Events",
    description: "A stroke rehabilitation camp organized by CCSRR, MAHE, Manipal, in collaboration with the Departments of Physiotherapy, Occupational Therapy, and Speech and Hearing, held on 23 March 2024 at Dr. TMA Pai Hospital, Udupi.",
  },
  {
    id: "g15",
    title: "Stroke Rehabilitation Camp in Udupi 2024",
    image: "/gallery/stroke-camp-udupi/1000061467.JPG",
    images: [
      "/gallery/stroke-camp-udupi/1000061467.JPG",
      "/gallery/stroke-camp-udupi/1000061476.JPG",
      "/gallery/stroke-camp-udupi/PHOTO-2026-07-01-16-10-47.jpg",
    ],
    category: "Events",
    description: "Stroke rehabilitation camp held at Udupi.",
  },
  {
    id: "g16",
    title: "Talk on Physiotherapy treatment after Stroke by Dr John Solomon M in 2020",
    image: "/gallery/john-talk-udayavani-2020.jpg",
    category: "Events",
    description: "Patient education talk on Udayavani by Dr. John Solomon M.",
    videoEmbed: "https://youtu.be/sfWTRwIW9Ec",
  },
  {
    id: "g17",
    title: "Awareness video on stroke prevention and recovery 2020",
    image: "/gallery/stroke-awareness-2020.png",
    category: "Events",
    description: "Awareness video on stroke prevention and recovery by Dr. John Solomon M.",
    videoEmbed: "https://youtu.be/-az-I8sNoj8",
  },
];

export const galleryCategories: GalleryCategory[] = ["Events", "Workshops"];
