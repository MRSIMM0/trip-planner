import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useQuerryFeatures = (coordinates: {
  lat: number;
  lng: number;
}) => {
  const querryFeatures = useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const formData = new URLSearchParams();

      const { lat, lng } = coordinates;

      formData.append(
        "data",
        `
          [out:json][timeout:25];
          (
            // Query for all nodes around the coordinates
            node(around:15, ${lat}, ${lng});
            // Query for all ways around the coordinates
            way(around:15, ${lat}, ${lng});
            // Query for all relations around the coordinates
            relation(around:15, ${lat}, ${lng});
          );
          // gather results
          out body;
          // print results
          >;
          out skel qt;

        `
      );

      const res = await fetch("https://overpass-api.de/api/interpreter", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;",
        },
        method: "POST",
        body: formData,
      });
      
      return res.json();
    },
  });

  return { querryFeatures };
};
