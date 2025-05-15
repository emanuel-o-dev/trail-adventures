import { ITrailFull } from "../../interfaces/ITrailFull.interface";
import TrailRepository from "./TrailRepository";
import { trailsMock } from "../../mocks/trailFull";

export class TrailPopulate {
  constructor() {
    this.populate(trailsMock);
  }

  public populate(trails: ITrailFull[]) {
    const trailRepository = new TrailRepository();
    trails.forEach((trail: ITrailFull) => {
      trail.name,
        trail.description,
        trail.location,
        trail.difficulty,
        trail.distance,
        trail.time,
        trail.image,
        trail.createdAt || new Date().toISOString(),
        trail.updatedAt || new Date().toISOString();

      trailRepository.create(trail);
    });
  }
}
