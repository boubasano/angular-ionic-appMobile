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
        const options = {
            headers: new HttpHeaders({
                "secret-key": environment.jsonbin.key,
            })
        };
        const url = environment.jsonbin.url;
        return this.http.get<Todo[]>(url, options).pipe(
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
    delete(todo: Todo): Observable<Todo[]> {
        const todoDeleted = [];
        this.todoList.forEach(element => {
            if(element != todo){
                todoDeleted.push(element);
            }
        });
        return this.put(todoDeleted).pipe(
            tap(
                () => {
                    const index: number = this.todoList.indexOf(todo);
                    if (index !== -1) {
                        this.todoList.splice(index, 1);
                        this.put(this.todoList);
                    }
                },
                () => {}
            )
        )

        // subscribe(
        //   () => {
        //   const index: number = this.todoList.indexOf(todo);
        // if (index !== -1) {
        //   this.todoList.splice(index, 1);
        //   this.put(this.todoList);
        // }
        //   },
        //   () => {}
        // )
    }

    /**
     * permits to read data and update it
     * @param todo
     */
    post(todo: Todo): Observable<Todo[]> {
        const created = [];
        this.todoList.forEach(element => {
            created.push(element)
        })
        created.push(todo);
        return this.put(created).pipe(
            tap(
                () => {
                    this.todoList.push(todo);
                    // alert("votre tache est ajoutée");
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








