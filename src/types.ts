export interface Guest {
  name: string;
  table: string | number;
  isPresent: boolean;
}

export interface TableGroup {
  table: string | number;
  guests: Guest[];
}
