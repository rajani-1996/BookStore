import { Component, OnInit } from '@angular/core';
import{NgForm} from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';
import{ Books } from 'src/app/shared/books.model';

declare var M: any;
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookService]
})
export class BookComponent implements OnInit {

  constructor(public bookService:BookService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshBookList();
  }
    resetForm(form?:NgForm){
      if(form)
      form.reset();
      this.bookService.selectedBook={
        _id:"",
        name:"",
        code:null,
        author:"",
        count:null
      }
    }
 onSubmit(form:NgForm){
   this.bookService.postBook(form.value).subscribe((res)=>{
     this.resetForm(form);
     M.toast({ html: "save success" ,classes:'rounded'});
   });
 }
 refreshBookList(){
   this.bookService.getBookList().subscribe((res)=>{
     this.bookService.books=res as Books[];
    });
  }
}
