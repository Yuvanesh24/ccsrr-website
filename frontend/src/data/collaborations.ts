export interface Collaboration {
  name: string;
  logo: string;
  lat: number;
  lng: number;
  country: string;
}

export const nationalCollaborations: Collaboration[] = [
  { name: "CMC Vellore", logo: "/logos/CMCV.jpg", lat: 12.9344, lng: 79.1359, country: "India" },
  { name: "CMC Ludhiana", logo: "/logos/CMCL.png", lat: 30.901, lng: 75.8573, country: "India" },
  { name: "SRMC Chennai", logo: "/logos/SRMC.png", lat: 13.0067, lng: 80.2206, country: "India" },
  { name: "KMCH", logo: "/logos/KMCH.png", lat: 11.0168, lng: 76.9558, country: "India" },
  { name: "IIT Hyderabad", logo: "/logos/IITH.png", lat: 17.5956, lng: 78.1231, country: "India" },
  { name: "ASSA", logo: "/logos/ASSA.png", lat: 8.85, lng: 77.45, country: "India" },
];

export const internationalCollaborations: Collaboration[] = [
  { name: "McGill University, Montreal", logo: "/logos/MCG.png", lat: 45.5017, lng: -73.5673, country: "Canada" },
  { name: "University of Ottawa", logo: "/logos/UO.png", lat: 45.4215, lng: -75.6972, country: "Canada" },
  { name: "UBC, Vancouver", logo: "/logos/UBC.png", lat: 49.2827, lng: -123.1207, country: "Canada" },
  { name: "UOT, Toronto", logo: "/logos/UOT.png", lat: 43.6532, lng: -79.3832, country: "Canada" },
  { name: "University of North Carolina", logo: "/logos/UNC.png", lat: 35.9132, lng: -79.0558, country: "USA" },
  { name: "University of Northern Florida", logo: "/logos/UNF.png", lat: 30.3322, lng: -81.6557, country: "USA" },
  { name: "University of Illinois Chicago", logo: "/logos/UIC.png", lat: 41.8781, lng: -87.6298, country: "USA" },
  { name: "UTHSC", logo: "/logos/UTHSC.png", lat: 29.4241, lng: -98.4936, country: "USA" },
  { name: "AU", logo: "/logos/AU.png", lat: 38.9072, lng: -77.0369, country: "USA" },
  { name: "Tel Aviv University", logo: "/logos/TAU.png", lat: 32.0853, lng: 34.7818, country: "Israel" },
  { name: "University of Southampton", logo: "/logos/UOS.png", lat: 50.9097, lng: -1.4044, country: "UK" },
  { name: "KCL, London", logo: "/logos/KCL.png", lat: 51.5074, lng: -0.1278, country: "UK" },
  { name: "DU", logo: "/logos/DU.png", lat: 53.3498, lng: -6.2603, country: "Ireland" },
  { name: "UOB", logo: "/logos/UOB.png", lat: 52.4862, lng: -1.8904, country: "UK" },
  { name: "UOG", logo: "/logos/UOG.png", lat: 55.8642, lng: -4.2518, country: "UK" },
  { name: "UOL", logo: "/logos/UOL.png", lat: 53.4084, lng: -2.9916, country: "UK" },
  { name: "UOM", logo: "/logos/UOM.png", lat: 53.4808, lng: -2.2426, country: "UK" },
  { name: "Tohoku Fukushi University", logo: "/logos/TFU.png", lat: 38.2682, lng: 140.8694, country: "Japan" },
];

export const partnerLogos = [
  { src: "/logos/E_PRINT_03.jpg", name: "Partner 1" },
  { src: "/logos/E_PRINT_04.jpg", name: "Partner 2" },
  { src: "/logos/E_PRINT_09.jpg", name: "Partner 3" },
  { src: "/logos/E_PRINT_17.jpg", name: "Partner 4" },
];
