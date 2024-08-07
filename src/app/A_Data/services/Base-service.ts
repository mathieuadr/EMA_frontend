import { Observable, catchError, map, of } from "rxjs";
import { environment } from "../../A_Environment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Base service providing common functionalities for services interacting with APIs.
 * For example, it includes the base URL of the API and a method for handling HTTP errors.
 */
@Injectable()
export default abstract class BaseService<ENTITY, ENTITY_CREATE_INPUT> {

  /**
   * The base URL of the API, including the version prefix and ending with a trailing slash.
   * It is derived from the environment configuration.
   * No need to add extra slashes when using it for API endpoints.
   */
  protected baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  abstract getEndpointUrl(): string;

  /**
   * Handles HTTP errors.
   * Logs the error to the console and allows the application to continue running.
   * @param operation - The name of the operation that failed.
   * @param result - An optional value to return as the observable result.
   * @returns A function to handle the error and return the specified result.
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: A better way is to send the error to remote logging infrastructure or save it in a log file
      console.error(`${operation} failed: ${error.message}`, error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Fetches all categories from the server.
   * @returns An Observable emitting an array of objects.
   */
  getAll(): Observable<ENTITY[]> {
    return this.http.get<ENTITY[]>(`${this.getEndpointUrl()}/getall`)
      .pipe(
        catchError(this.handleError<ENTITY[]>('getAll', []))
      );
  }

  /**
   * Fetches a single entity by its ID.
   * @param id - The ID of the entity to fetch.
   * @returns An Observable emitting a single entity object.
   */
  getById(id: string): Observable<ENTITY> {
    return this.http.get<ENTITY>(`${this.getEndpointUrl()}/${id}`)
      .pipe(
        catchError(this.handleError<ENTITY>('getById', undefined))
      );
  }

  /**
   * Updates an existing entity.
   * @param entity - The updated entity object.
   * @returns An Observable emitting the updated Entity object.
   */
  update(entity: ENTITY): Observable<ENTITY> {
    return this.http.put<ENTITY>(this.getEndpointUrl()+"/update", entity)
      .pipe(
        catchError(this.handleError<ENTITY>('update', entity))
      );
  }

  /**
   * Deletes a entity.
   * @param entity - The Entity object to delete.
   * @returns An Observable emitting a boolean value indicating whether the deletion was successful.
   */
  delete( id: String ): Observable<boolean> {
    return this.http.delete<boolean>(`${this.getEndpointUrl()}/delete/${id}`)
      .pipe(
        catchError(this.handleError<boolean>('delete', false))
      );
  }

  /**
   * Creates a new entity.
   * @param entity - The Entity Create Input object containing the data for the new entity.
   * @returns An Observable emitting the created entity object.
   */
  create(entity: ENTITY_CREATE_INPUT): Observable<ENTITY> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<ENTITY>(this.getEndpointUrl()+'/create', entity,{ headers, observe: 'response' })
    .pipe(
      map(response => {
        if (response.status === 200) {
          
          return response.body as unknown as ENTITY; // Extraction du corps de la réponse si le statut est 200
        }
        else {
          throw new Error('An error occurred. Please try again later.');
        }
      })
    )
  }
}