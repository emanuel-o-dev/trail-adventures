import { TrailFullSchema } from "../schemas/TrailFull";

export const trailsMock: TrailFullSchema[] = [
  {
    id: 1,
    name: "Trilha da Chapada Diamantina",
    difficulty: "medium",
    duration: "4h",
    terrain: "Terra batida e pedras",
    distance: "8 km",
    coordinates: {
      latitude: -12.9991,
      longitude: -41.4693,
    },
    image:
      "https://images.pexels.com/photos/18724059/pexels-photo-18724059.jpeg",
    description:
      "Trilha que leva a formações rochosas icônicas na Chapada Diamantina, ideal para caminhadas moderadas com vistas panorâmicas.",
    location: "Palmeiras - BA",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Trilha do Morro da Urca",
    difficulty: "easy",
    duration: "1h",
    terrain: "Calçamento e terra",
    distance: "1,5 km",
    coordinates: {
      latitude: -22.9486,
      longitude: -43.1565,
    },
    image:
      "https://cafeviagem.com/wp-content/uploads/2019/06/trilha-segura-Rio-Pedra-Bonita-9.jpg.webp",
    description:
      "Trilha urbana no Rio de Janeiro que oferece uma vista incrível da Baía de Guanabara e do Pão de Açúcar.",
    location: "Rio de Janeiro - RJ",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Trilha da Floresta de Tapiraí",
    difficulty: "medium",
    duration: "2h30",
    terrain: "Solo úmido e vegetação densa",
    distance: "5 km",
    coordinates: {
      latitude: -23.9618,
      longitude: -47.5015,
    },
    image: "https://images.pexels.com/photos/6992223/pexels-photo-6992223.jpeg",
    description:
      "Caminhada por trilhas naturais na floresta atlântica de Tapiraí, com rica biodiversidade e paisagens exuberantes.",
    location: "Tapiraí - SP",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Trilha do Pico dos Pireneus",
    difficulty: "hard",
    duration: "5h",
    terrain: "Rocha e subida íngreme",
    distance: "10 km",
    coordinates: {
      latitude: -15.8222,
      longitude: -48.9511,
    },
    image:
      "https://images.pexels.com/photos/30849961/pexels-photo-30849961.jpeg",
    description:
      "Desafiadora trilha que leva ao ponto mais alto da Serra dos Pireneus, com vistas deslumbrantes do cerrado goiano.",
    location: "Pirenópolis - GO",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Trilha da Serra do Mar",
    difficulty: "medium",
    duration: "3h",
    terrain: "Terra batida e cascalho",
    distance: "6 km",
    coordinates: {
      latitude: -23.5316,
      longitude: -46.6358,
    },
    image: "https://images.pexels.com/photos/1508449/pexels-photo-1508449.jpeg",
    description:
      "Trilha que percorre a Serra do Mar, oferecendo contato direto com a Mata Atlântica e vistas para o litoral paulista.",
    location: "São Paulo - SP",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
