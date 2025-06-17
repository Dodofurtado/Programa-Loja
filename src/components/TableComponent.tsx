import type { Guest, TableGroup } from '../types';

interface TableComponentProps {
  tableGroup: TableGroup;
  onGuestClick: (guest: Guest) => void;
}

export const TableComponent = ({ tableGroup, onGuestClick }: TableComponentProps) => {  const totalGuests = tableGroup.guests.length;
  const presentGuests = tableGroup.guests.filter(g => g.status === 'present').length;
  const notComingGuests = tableGroup.guests.filter(g => g.status === 'notcoming').length;

  return (
    <div className="table-group">
      <h2 className="table-title">
        Mesa {tableGroup.table} - {totalGuests} Pessoas{' '}
        {presentGuests > 0 && <span className="status-count present">✅ {presentGuests}</span>}
        {notComingGuests > 0 && <span className="status-count notcoming">❌ {notComingGuests}</span>}
      </h2>
      <ul className="guest-list">
        {tableGroup.guests.map((guest) => (
          <li
            key={guest.name}
            className={`guest-item ${guest.status}`}
            onClick={() => onGuestClick(guest)}
          >
            {guest.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
