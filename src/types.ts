export interface Guest {
  name: string;
  table: string | number;
  status: 'present' | 'notcoming' | 'pending';
}

export interface TableGroup {
  table: string | number;
  guests: Guest[];
}
