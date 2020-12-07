import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoComponent } from './todos/todo/todo.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path:"todo",
    loadChildren: () => import('./todos/todos.module').then(t => t.TodosModule)
  },
  {
    path: "**",
    redirectTo: "todo"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
