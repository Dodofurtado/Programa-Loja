import { useState, useCallback, useMemo } from 'react';
import type { Guest, TableGroup } from './types';
import { ExcelImport } from './components/ExcelImport';
import { TableComponent } from './components/TableComponent';
import './App.css';

function App() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGuestsImported = useCallback((importedGuests: Guest[]) => {
    const guestsWithStatus = importedGuests.map(guest => ({
      ...guest,
      status: 'pending' as const
    }));
    setGuests(guestsWithStatus);
  }, []);

  const handleGuestClick = useCallback((clickedGuest: Guest) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.name === clickedGuest.name && guest.table === clickedGuest.table
          ? { 
              ...guest, 
              status: guest.status === 'pending' 
                ? 'present' 
                : guest.status === 'present' 
                  ? 'notcoming' 
                  : 'pending'
            }
          : guest
      )
    );
  }, []);

  const tableGroups = useMemo<TableGroup[]>(() => {
    const tables = new Map<string | number, Guest[]>();
    
    guests.forEach(guest => {
      if (!tables.has(guest.table)) {
        tables.set(guest.table, []);
      }
      tables.get(guest.table)?.push(guest);
    });

    return Array.from(tables.entries())
      .map(([table, tableGuests]) => ({
        table,
        guests: tableGuests.sort((a, b) => a.name.localeCompare(b.name))
      }))
      .sort((a, b) => 
        typeof a.table === 'number' && typeof b.table === 'number' 
          ? a.table - b.table 
          : String(a.table).localeCompare(String(b.table))
      );
  }, [guests]);

  const totalGuests = guests.length;
  const presentGuests = guests.filter(guest => guest.isPresent).length;

  return (
    <div className="app">
      {guests.length === 0 ? (
        <div className="import-container">
          <h1>Sistema de Controle de Presença</h1>
          <ExcelImport onGuestsImported={handleGuestsImported} />
        </div>
      ) : (
        <>
          <header className="app-header">
            <h1>Controle de Presença</h1>
            <div className="stats">
              <span>Presentes: {presentGuests}</span>
              <span>Ausentes: {totalGuests - presentGuests}</span>
              <span>Total de Convidados: {totalGuests}</span>
            </div>
          </header>
          <div className="tables-container">
            {tableGroups.map(tableGroup => (
              <TableComponent
                key={tableGroup.table}
                tableGroup={tableGroup}
                onGuestClick={handleGuestClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
