// import { useEffect } from "react";
// import TrailRepository from "../src/database/TrailRepository";
// import { ITrailFull } from "../interfaces/ITrailFull.interface";
// import { trailsMock } from "../mocks/trailFull";

// export const useSQLitePopulate = () => {
//   const trailRepository = new TrailRepository();

//   useEffect(() => {
//     const fetchTrails = async (trails: ITrailFull[]) => {
//       trails.forEach((trail: ITrailFull) => {
//         trail.name,
//           trail.description,
//           trail.location,
//           trail.difficulty,
//           trail.distance,
//           trail.time,
//           trail.image,
//           trail.createdAt || new Date().toISOString(),
//           trail.updatedAt || new Date().toISOString();

//         trailRepository.create(trail);
//       });
//     };
//     fetchTrails(trailsMock);
//   });
// };
