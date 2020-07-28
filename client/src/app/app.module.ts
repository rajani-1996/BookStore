import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BooksService } from './books.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

import { ContactComponent } from './component/contact/contact.component';

import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';

import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { CarouselComponent } from './component/home/carousel/carousel.component';
import { BookListComponent } from './component/book-list/book-list.component';
import { NewBookComponent } from './component/new-book/new-book.component';
import { EditBookComponent } from './component/edit-book/edit-book.component';
import { BookComponent } from './component/book/book.component';
import { BookService } from './shared/book.service';
import { AdminComponent } from './component/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    CarouselComponent,
    BookListComponent,
    NewBookComponent,
    EditBookComponent,
    BookComponent,
    AdminComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService,AdminGuard,AuthGuard,BooksService,BookService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
