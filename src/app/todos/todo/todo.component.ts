import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit{

  public formTodo: FormGroup;
  public todoList: Todo[];
  public btnDisabled: Boolean;
  public btnText = "Enregistrer";
  /**
   *
   * @param formBuilder
   * @param todoService
   */
  constructor(
      private formBuilder: FormBuilder,
      private todoService: TodoService,
      private route : Router) {}

  ngOnInit():void {
    this.btnDisabled = false;
    this.formTodo = this.formBuilder.group({
      nom: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
  /**
   *
   * @param name
   * @param description
   */
  save() {
    this.btnDisabled = true;
    this.todoService.post(
        {
          nom: this.formTodo.get('nom').value,
          description: this.formTodo.get('description').value
        }
    ).subscribe(
        () => {
          this.route.navigate(['/list']);
        },
        () => {}
    )
  }
}




















