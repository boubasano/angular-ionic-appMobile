import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodosRoutingModule } from './todos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [TodosComponent,
    TodoComponent,
    TodoListComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TodosRoutingModule,
    IonicModule,
  ],
  exports: [
    TodosComponent
  ]
})
export class TodosModule { }
