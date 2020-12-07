import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todos.component';

const routes: Routes = [
  {
    path: "",
    component: TodosComponent,
    children:[
      {
        path: "create",
        component:TodoComponent,
      },
      {
        path: "list",
        component: TodoListComponent,
      },
      {
        path: "",
        component: HomeComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
