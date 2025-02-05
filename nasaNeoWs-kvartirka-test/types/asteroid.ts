export type AsteroidWeek = {
  link: {
    next: string;
    prev: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: { [date: string]: Asteroid[] };
};

export type Asteroid = {
  links: {
    self: string;
  };
  id: string;
  name: string;
  designation: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: {
    close_approach_date: string;
    close_approach_date_full: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
      lunar: string;
    };
    orbiting_body: string;
  }[];
  ordered: boolean;
};

export type AsteroidData = {
  asteroid: Asteroid;
};
