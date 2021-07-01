import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponseModel} from "../models/response/data-response.model";
import {SingleDataResponseModel} from "../models/response/single-data-response.model";
import {ResponseModel} from "../models/response/response.model";
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = "http://localhost:8010/api/";

  constructor(private httpClient: HttpClient) {
  }

  getTodos(): Observable<DataResponseModel<Todo>> {
    let newUrl = this.apiUrl + "todos";
    return this.httpClient.get<DataResponseModel<Todo>>(newUrl);
  }

  getTodo(todo: Todo): Observable<SingleDataResponseModel<Todo>> {
    let newUrl = this.apiUrl + "todos/"+ todo.id;
    return this.httpClient.get<SingleDataResponseModel<Todo>>(newUrl);
  }

  addTodo(todo: Todo): Observable<SingleDataResponseModel<Todo>>{
    console.log(todo)
    return this.httpClient.post<SingleDataResponseModel<Todo>>(this.apiUrl + "todo", todo);
  }

  updateTodo(todo: Todo): Observable<SingleDataResponseModel<Todo>>{
    return this.httpClient.put<SingleDataResponseModel<Todo>>(this.apiUrl + "todos/" + todo.id, todo);
  }

  deleteTodo(todo: Todo): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "todos/" + todo.id);
  }

}
