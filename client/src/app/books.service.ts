import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookModel } from '../app/component/book-list/book.model';
import {AuthService} from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
   private book:BookModel;


  constructor(private http:HttpClient, private authService:AuthService) { }
  getBooks(){
    return this.http.get("http://localhost:3000/books");
  }
  newBook(item){
    return this.http.post("http://localhost:3000/insert",{"book":item})
    .subscribe(data=>{console.log(data)})
  }
  editBook(item)
  {
    return this.http.post("http://localhost:3000/edit",{"book":item})
    .subscribe(data=>{console.log(data)})

  }

  setter(book){
    console.log("settercalled")

    this.book=book;
    console.log(book);
  }
  hi(){
    return this.book;
  }

  delete(book){
    console.log("delete clicked")
    return this.http.post("http://localhost:3000/delete",{"book":book})
    .subscribe(data=>{console.log(data)})
   
  }
}

