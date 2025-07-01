import { TrailFullSchema } from "../schemas/TrailFull";

export const trailsMock: TrailFullSchema[] = [
  {
    id: 1,
    name: "Trilha do Parque do Lago",
    difficulty: "medium",
    duration: "2h",
    terrain: "Asfalto e terra batida",
    distance: "5 km",
    coordinates: {
      latitude: -25.3901,
      longitude: -51.4657,
    },
    image:
      "https://images.pexels.com/photos/18724059/pexels-photo-18724059.jpeg",
    description:
      "Trilha tranquila ao redor do Parque do Lago, ideal para caminhadas em família.",
    location: "Guarapuava - PR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Trilha da Cachoeira das Laranjeiras",
    difficulty: "easy",
    duration: "1h30",
    terrain: "Terra batida e pedras",
    distance: "3 km",
    coordinates: {
      latitude: -25.3755,
      longitude: -51.4792,
    },
    image:
      "https://cafeviagem.com/wp-content/uploads/2019/06/trilha-segura-Rio-Pedra-Bonita-9.jpg.webp",
    description:
      "Caminho até uma pequena cachoeira escondida na zona rural de Guarapuava.",
    location: "Guarapuava - PR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Trilha da Serra da Esperança",
    difficulty: "hard",
    duration: "4h",
    terrain: "Subida íngreme e rochas",
    distance: "7 km",
    coordinates: {
      latitude: -25.3629,
      longitude: -51.4551,
    },
    image: "https://images.pexels.com/photos/6992223/pexels-photo-6992223.jpeg",
    description: "Trilha desafiadora com bela vista do alto da serra.",
    location: "Guarapuava - PR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Trilha do Parque das Araucárias",
    difficulty: "easy",
    duration: "1h",
    terrain: "Plano e arborizado",
    distance: "2,5 km",
    coordinates: {
      latitude: -25.3708,
      longitude: -51.4661,
    },
    image:
      "https://images.pexels.com/photos/30849961/pexels-photo-30849961.jpeg",
    description:
      "Caminhada leve entre araucárias e vegetação típica da região.",
    location: "Guarapuava - PR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Trilha do Vale do Jordão",
    difficulty: "medium",
    duration: "3h",
    terrain: "Mistura de estrada de terra e mata",
    distance: "6 km",
    coordinates: {
      latitude: -25.3804,
      longitude: -51.4713,
    },
    image: "https://images.pexels.com/photos/1508449/pexels-photo-1508449.jpeg",
    description:
      "Trilha pelas paisagens do Vale do Jordão, com trechos de sombra e descidas suaves.",
    location: "Guarapuava - PR",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
