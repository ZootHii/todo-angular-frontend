import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/todo";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  //todoAdd: Todo = {what_todo : "added todo"};
  //todoUpdate: Todo = {id: 4, what_todo : "updated 1"};
  //todoDelete: Todo = {id: 3};
  //todoGet: Todo = {id: 1};

  todos: Todo[] = [];
  dataLoaded: boolean = false;
  todoForm: FormGroup;

  constructor(private todoService: TodoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getTodos()
    //this.getTodo(this.todoGet)
    this.createTodoForm()
    //this.addTodo(/*this.todoAdd*/)
    //this.updateTodo(this.todoUpdate)
    //this.deleteTodo(this.todoDelete)
    //this.addTodo2(this.todoAdd)

  }

  createTodoForm() {
    this.todoForm = this.formBuilder.group({
      id: [""],
      what_todo: [""],
      created_at: [""],
    })
  }

  getTodos() {
    this.todoService.getTodos().subscribe((response) => {
      if (response.success) {
        console.log(response)
        this.todos = response.data
        this.dataLoaded = true
      }
    });
  }

  getTodo(todo: Todo) {
    this.todoService.getTodo(todo).subscribe((response) => {
      if (response.success) {
        console.log(response)
      }
    });
  }

  addTodo() {
    this.todoForm.removeControl("id");
    this.todoForm.removeControl("created_at");
    let todo = Object.assign({}, this.todoForm.value);
    this.todoService.addTodo(todo).subscribe((response) => {
      if (response.success) {
        console.log(response)
        this.ngOnInit();
      }
    });
  }

/*  addTodo2(todo: Todo) {
    this.todoService.addTodo(todo).subscribe((response) => {
      if (response.success) {
        console.log(response)
      }
    });
  }*/

  updateTodo(todo: Todo) {
    let todoModel = Object.assign({}, this.todoForm.value);
    todo.what_todo = todoModel.what_todo
    this.todoService.updateTodo(todo).subscribe((response) => {
      if (response.success) {
        console.log(response)
        this.ngOnInit();
      }
    });
  }

  deleteTodo(todo: Todo) {

    if (this.todoForm.valid){
      //this.todoForm.removeControl("brandName");
      //let todoModel = Object.assign({}, this.todoForm.value);
      this.todoService.deleteTodo(todo).subscribe((response) => {
        if (response.success) {
          console.log(response)
          this.ngOnInit();
        }
      });
    }
  }
}
