// src/index.ts
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as Papa from 'papaparse';
import { processRetailerData } from './utils';

const spreadsheetLink = 'https://docs.google.com/spreadsheets/d/1K360w_cLcd13flLwNK-HRDVGEE9i9CF8';
const outputFilePath = path.join(__dirname, 'output.json');

async function readExcelAndGenerateJSON() {
  try {
    const csvContent = await downloadSpreadsheet(spreadsheetLink);
    const data = parseCsv(csvContent);
    const jsonLines = processRetailerData(data);

    fs.writeFileSync(outputFilePath, jsonLines.join('\n'));

    console.log(`Processed data has been written to ${outputFilePath}`);
  } catch (error: any) {
    console.error('Error:', (error as Error).message || error);
  }
}

async function downloadSpreadsheet(spreadsheetLink: string): Promise<string> {
  const response = await axios.get(spreadsheetLink);

  if (!response.data) {
    throw new Error('Failed to download the spreadsheet. Empty response.');
  }

  return response.data;
}

function parseCsv(csvContent: string): any[] {
  return Papa.parse(csvContent, { header: true }).data;
}

// Call the main function
readExcelAndGenerateJSON();
