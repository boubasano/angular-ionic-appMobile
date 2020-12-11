import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { from, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { tap} from 'rxjs/operators'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoList: Todo[] = [];
  public alertCtrl: AlertController;
  public disabled: Boolean;
  /**
   * permits to get data and put in array todoList
   * @param http 
   */
  constructor(private http: HttpClient) { }
/**
 * typage de type Observable
 */
  get(): Observable<Todo[]>{
    const url = environment.api.url;
    return this.http.get<Todo[]>(url).pipe(
      tap(
        (todoList: Todo[])=>{this.todoList = todoList},
        ()=>{}
      )
    );
  }

  /**
   * permits to delete and update it
   * @param todo 
   */
  delete(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(environment.api.url+todo.id).pipe(
      tap(
        () => {
          const index = this.todoList.indexOf(todo);
          if (index !== -1) {
            this.todoList.splice(index, 1);
            this.put(this.todoList);
          }
        },
        () => {}
      )
    )
 
  }

  /**
   * permits to read data and update it 
   * @param todo 
   */
  post(todo: Todo): Observable<Todo[]> {
   
   return this.http.post<Todo[]>(environment.api.url, todo).pipe(
      tap(
        () => {
          this.todoList.push(todo);
        },
        () => {}
      )
    );
  }

  /**
   * permits to update
   * @param todoList 
   */
  put(todoList: Todo[]): Observable<Todo[]> {
    const url = environment.api.url;
    return this.http.put<Todo[]>(url,todoList)
  }

}