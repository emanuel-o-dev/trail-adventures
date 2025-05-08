// fecth data from mock api and return the data
import { useCallback, useEffect, useState } from "react";

import { trailsMock } from "../mocks/trailFull";
import { ITrailFull } from "../interfaces/ITrailFull.interface";

export function useFetchTrailDetails(id: string) {
  const [trail, setTrail] = useState<ITrailFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrailDetails = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate a network request
      const response = await new Promise<ITrailFull>((resolve, reject) => {
        setTimeout(() => {
          const trailDetails = trailsMock.find((trail) => trail.id === id);
          if (trailDetails) {
            resolve(trailDetails as ITrailFull);
          } else {
            reject(new Error("Trail not found"));
          }
        }, 1000);
      });
      setTrail(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTrailDetails();
  }, [fetchTrailDetails]);

  return { trail, loading, error };
}
