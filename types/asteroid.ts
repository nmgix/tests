export type Asteroid = {
  links: {
    self: string;
  };
  id: number;
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
};
