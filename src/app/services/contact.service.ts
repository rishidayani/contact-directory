import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
// import { IContact } from '../models/IContact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl: string = `http://localhost:3000`; //Backend Url
  apiUrl = 'https://people.googleapis.com/v1/people/me/connections';
  personFields = 'names,emailAddresses';

  constructor(private httpClient: HttpClient) {}

  public getAllContacts() {
    const options: any = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get(dataURL, options);
  }

  // public getAllContacts(): Observable<IContact[]> {
  //   let dataURL: string = `${this.serverUrl}/contacts`
  //   return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError))
  // }

  public getContact(contactId: string) {
    const options: any = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get(dataURL, options);
  }

  // public getContact(contactId: string): Observable<IContact> {
  //   let dataURL: string = `${this.serverUrl}/contacts/${contactId}`
  //   return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError))
  // }

  public createContact(contact: any) {
    const options: any = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    let dataURL: string = `${this.serverUrl}/contacts/add`;
    return this.httpClient.post(dataURL, contact, options);
  }

  // public createContact(contact:IContact): Observable<IContact> {
  //   let dataURL: string = `${this.serverUrl}/contacts`
  //   // return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError))
  //   return this.httpClient.post<IContact>(dataURL, contact).pipe()
  // }

  public updateContact(contact: any, contactId: any) {
    const options: any = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    let dataURL: string = `${this.serverUrl}/contacts/edit/${contactId}`;
    return this.httpClient.patch(dataURL, contact, options);
  }

  // public updateContact(contact:IContact, contactId:string): Observable<IContact> {
  //   let dataURL: string = `${this.serverUrl}/contacts/${contactId}`
  //   return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError))
  // }

  public deleteteContact(contactId: string): Observable<{}> {
    const options: any = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient
      .delete<{}>(dataURL, options)
      .pipe(catchError(this.handleError));
  }

  public findContact(name: string) {
    const options: any = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    let dataURL: string = `${this.serverUrl}/contacts/search/${name}`;
    return this.httpClient.get(dataURL, options);
  }

  public getGoogleContact() {
    const options: any = {
      headers: {
        Authorization: localStorage.getItem('gToken'),
      },
    };
    let dataURL: string = `${this.serverUrl}/api/people`;
    return this.httpClient.get(dataURL, options);
  }

  public search(name: string) {
    const options: any = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    let dataURL: string = `${this.serverUrl}/contacts/search`;
    return this.httpClient
      .post(dataURL, { payload: name }, options)
      .pipe
      // map(data=> data.payload)
      ();
    // return this.httpClient.get(dataURL)
  }

  public filterByDate(date: Date) {
    const options: any = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    let dataURL: string = `${this.serverUrl}/contacts/filter`;
    return this.httpClient.post(dataURL, { date }, options);
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error : ${error.error.message}`;
    } else {
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
