import type { Guest, TableGroup } from '../types';

interface TableComponentProps {
  tableGroup: TableGroup;
  onGuestClick: (guest: Guest) => void;
}

export const TableComponent = ({ tableGroup, onGuestClick }: TableComponentProps) => {  return (
    <div className="table-group">
      <h2 className="table-title">Mesa {tableGroup.table}</h2>
      <ul className="guest-list">
        {tableGroup.guests.map((guest) => (
          <li
            key={guest.name}
            className={`guest-item ${guest.isPresent ? 'present' : ''}`}
            onClick={() => onGuestClick(guest)}
          >
            {guest.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
