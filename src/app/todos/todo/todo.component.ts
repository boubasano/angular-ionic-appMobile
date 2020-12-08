import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public btnDisabled: Boolean = false;
  public btnText = "Enregistrer";
  /**
   * 
   * @param formBuilder 
   * @param todoService 
   */
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService) {}

    ngOnInit():void {
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
save(name: string, description: string) {
  // console.log(this.formTodo.valid);
  // console.log(this.formTodo.get("nom").valid);
  // console.log(this.formTodo.get("description").valid);

  let todo = new Todo;
  todo.nom = name;
  todo.description =description;
  this.todoService.post(todo);    
}

buttonClick() {
  this.btnDisabled = true;
  setTimeout(() => {
    this.btnDisabled = false
  }, 5000);

}
}






