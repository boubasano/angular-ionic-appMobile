import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoList: Todo[] = [];
  public alertCtrl: AlertController;
  /**
   * permits to get data and put in array todoList
   * @param http 
   */
  constructor(private http: HttpClient) { }
/**
 * typage de type Observable
 */
  get(): Observable<Todo[]>{
    const options = {
      headers: new HttpHeaders({
        "secret-key": environment.jsonbin.key,
      })
    };
    const url = environment.jsonbin.url;
    return this.http.get<Todo[]>(url, options);
  }

  /**
   * permits to delete and update it
   * @param todo 
   */
  delete(todo: Todo): Todo {
    const todoDeleted = [];
    this.todoList.forEach(element => {
      if(element != todo){
          todoDeleted.push(element);
      }
    });
    this.put(todoDeleted).subscribe(
      () => {
      const index: number = this.todoList.indexOf(todo);
    if (index !== -1) {
      this.todoList.splice(index, 1);
      this.put(this.todoList);
    }
      },
      () => {}
    )
    return todo;
  }

  /**
   * permits to read data and update it 
   * @param todo 
   */
  post(todo: Todo): Todo {
    // const alert = this.alertCtrl.create({
    //   title: 'New Friend!',
    //   subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
    //   buttons: ['OK']
    // });

    const created = [];
    this.todoList.forEach(element => {
        created.push(element)
    })
    created.push(todo);
    this.put(created).subscribe(
      () => {this.todoList.push(todo);
              alert("votre tache est ajoutée");},
      () => {}
    );
    return todo;
  }

  /**
   * permits to update
   * @param todoList 
   */
  put(todoList: Todo[]): Observable<Todo[]> {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "secret-key": environment.jsonbin.key,
        "versioning": "false"
      })
    };
    const url = environment.jsonbin.url;
    return this.http.put<Todo[]>(url,todoList, options)
  }

}