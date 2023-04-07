import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
// import { IContact } from '../models/IContact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl: string = `http://localhost:3000`; //Backend Url

  constructor(private httpClient: HttpClient) {}

  public getAllContacts() {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get(dataURL);
  }

  // public getAllContacts(): Observable<IContact[]> {
  //   let dataURL: string = `${this.serverUrl}/contacts`
  //   return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError))
  // }

  public getContact(contactId: string) {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get(dataURL);
  }

  // public getContact(contactId: string): Observable<IContact> {
  //   let dataURL: string = `${this.serverUrl}/contacts/${contactId}`
  //   return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError))
  // }

  public createContact(contact: any) {
    let dataURL: string = `${this.serverUrl}/contacts/add`;
    return this.httpClient.post(dataURL, contact);
  }

  // public createContact(contact:IContact): Observable<IContact> {
  //   let dataURL: string = `${this.serverUrl}/contacts`
  //   // return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError))
  //   return this.httpClient.post<IContact>(dataURL, contact).pipe()
  // }

  public updateContact(contact: any, contactId: any) {
    let dataURL: string = `${this.serverUrl}/contacts/edit/${contactId}`;
    return this.httpClient.patch(dataURL, contact);
  }

  // public updateContact(contact:IContact, contactId:string): Observable<IContact> {
  //   let dataURL: string = `${this.serverUrl}/contacts/${contactId}`
  //   return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError))
  // }

  public deleteteContact(contactId: string): Observable<{}> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient
      .delete<{}>(dataURL)
      .pipe(catchError(this.handleError));
  }

  public search (name: string) {
    let dataURL: string = `${this.serverUrl}/contacts/search/${name}`
    return this.httpClient.get(dataURL)
  }

  public search2 (name: string) {
    let dataURL: string = `${this.serverUrl}/contacts/search2`
    return this.httpClient.post(dataURL,{payload: name}, {
      headers: new HttpHeaders({'content-type': 'application/json'})
    }).pipe(
      // map(data=> data.payload)
    )
    // return this.httpClient.get(dataURL)
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
