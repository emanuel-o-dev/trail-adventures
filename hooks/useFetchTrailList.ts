import { useState, useEffect } from "react";
import { ITrailShort } from "../interfaces/ITrailShort.interface";
import TrailRepository from "../src/database/TrailRepository";

export const useFetchTrailList = () => {
  const [trailList, setTrailList] = useState<ITrailShort[]>([]);

  const trailRepository = new TrailRepository();

  useEffect(() => {
    const fetchTrails = async () => {
      const trails = await trailRepository.all();
      console.log(trails);
      setTrailList(trails);
    };
    fetchTrails();
  }, [trailRepository]);

  return { trailList };
};
