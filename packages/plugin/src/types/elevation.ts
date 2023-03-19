export type ElevationDistance = number | `${number}px`;

export type Elevation = {
  level0: ElevationDistance;
  level1: ElevationDistance;
  level2: ElevationDistance;
  level3: ElevationDistance;
  level4: ElevationDistance;
  level5: ElevationDistance;
} & Record<`level${number}`, ElevationDistance>;
