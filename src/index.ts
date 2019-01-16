import {google} from 'googleapis';
import {from, Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';


export function jsonSheetRange(
    serviceEmail: string, accountKey: string, fqRange: string) {
  const sheets = google.sheets('v4');
  const auth = new google.auth.JWT(
      serviceEmail, undefined, accountKey,
      ['https://www.googleapis.com/auth/spreadsheets']);
  const [spreadsheetId, range] = fqRange.split('!!');

  return from(sheets.spreadsheets.values.get({auth, spreadsheetId, range}))
      .pipe(map(response => {
        const rows = response.data.values;
        return rows;
      }));
}