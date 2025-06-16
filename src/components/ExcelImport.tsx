import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import type { Guest } from '../types';

interface ExcelImportProps {
  onGuestsImported: (guests: Guest[]) => void;
}

export const ExcelImport = ({ onGuestsImported }: ExcelImportProps) => {
  const handleFileUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as Array<{ [key: string]: string | number }>;

      const guests: Guest[] = jsonData.map(row => ({
        name: String(row['Nome'] || row['NOME'] || row['nome'] || row['A'] || ''),
        table: row['Mesa'] || row['MESA'] || row['mesa'] || row['B'] || '',
        isPresent: false
      }));

      onGuestsImported(guests);
    };

    reader.readAsArrayBuffer(file);
  }, [onGuestsImported]);

  return (
    <div className="excel-import">
      <label className="file-input-label">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="file-input"
        />
        <span>Selecione a Planilha de Convidados</span>
      </label>
    </div>
  );
};
