import { Component } from '@angular/core';
import Todo from './todos.model';
import { Http } from '@angular/http';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent {
    /**
     * @description All the todos
     */
    public todos?: Array<Todo>;
    /**
     * @description APi url for the todos
     */
    private readonly APIURL: string = 'http://localhost:3000/posts';

    constructor(private http: Http) {
        this.getTodos()
          .then(data => {
            this.todos = data
            console.log(this.todos)
          })
          .catch(console.error)
    }

    /**
     * @description Gets all the posts
     * @returns {Promise<Array<Todo>>}
     */
    private getTodos(): Promise<Array<Todo>> {
      return new Promise((resolve: (data: Array<Todo>) => void) => {
        this.http.get(this.APIURL)
          .subscribe((response) => resolve(response.json()))
      })
    }

    /**
     * @description Makes a todo done
     * @param todo
     */
    public makeDone(todo: Todo): void {
      todo.done = !todo.done
    }

    /**
     * @description Deletes a todo
     * @param todo
     */
    public delete(todo: Todo): void {
      this.todos = this.todos.filter(t => t !== todo)
    }

}
