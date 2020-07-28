import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
// import { AdminGuard } from 'src/app/admin.guard';

import { ContactComponent } from './component/contact/contact.component';
import { EditBookComponent } from './component/edit-book/edit-book.component';
import { LoginComponent} from './component/login/login.component';
import{ RegisterComponent} from './component/register/register.component';
import { HomeComponent} from './component/home/home.component';
import { CarouselComponent} from './component/home/carousel/carousel.component';
import { BookListComponent } from './component/book-list/book-list.component';
import { NewBookComponent } from './component/new-book/new-book.component';
// import {ProductDetailsComponent} from './component/home/product-details/product-details.component';
// import { ProductComponent} from './component/product/product.component';
import{ BookComponent} from './component/book/book.component';
import { AdminComponent } from './component/admin/admin.component';
// import{ShoppingcartComponent} from './component/product/shoppingcart/shoppingcart.component'
const routes: Routes = [
  { path:'contact' ,component:ContactComponent},
  { path:'login' ,component:LoginComponent},
  { path:'register' ,component:RegisterComponent},
  { path:'home' ,component:HomeComponent},
  {path:'edit-book',component:EditBookComponent,canActivate: [AuthGuard]},
  { path:'' ,component:CarouselComponent},
  {path:'book-list',component:BookListComponent,canActivate: [AuthGuard]},
  {path:'add-book',component:NewBookComponent,canActivate: [AuthGuard]},
  {path:"admin",component:AdminComponent,canActivate: [AuthGuard]},
  // { path:'product-details' ,component:ProductDetailsComponent},
  {path:'buy',component:BookComponent},
  // { path:'shoppingcart' ,component:ShoppingcartComponent},
   // { path:'product' ,component:ProductComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
