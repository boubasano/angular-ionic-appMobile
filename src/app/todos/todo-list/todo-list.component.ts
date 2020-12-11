import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public todoList: Todo[];
  public error: Boolean;
  public btnDisabled: Boolean;
  


  constructor(private todoService: TodoService) {
    this.reload();
  }

  reload(): void {
    this.btnDisabled = false;
    this.todoService.get().subscribe(
      (todoList: Todo[]) => {
        
        this.error = false;
        this.todoList = todoList;
      },

      () => {
        this.error = true;

      }
    )
  }
  /**
   * Permits to delete data by name using model from "shared"
   *
    */
  delete(todo: Todo) {
    if (!this.error) {
      this.todoService.delete(todo).subscribe(
        () => {
          this.btnDisabled = true;
        },
        () => {}
      );
    }
  }

}


