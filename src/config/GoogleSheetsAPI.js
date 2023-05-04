import axios from 'axios';

const API_KEY = 'AIzaSyCmCvOn0SBBQOB-VgXNpqwHlQnd1AANkSY';
const SPREADSHEET_ID = '1Zcbvi-LcRz6XnTodPNnh_HeYWlRTcrFiCc5bBJk6FSs';
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;

export const getSheetData = async sheetName => {
  try {
    const response = await axios.get(
      `${BASE_URL}/values/${sheetName}?key=${API_KEY}`,
    );
    const data = response.data.values;
    
    return data.slice(0);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
  }
};


