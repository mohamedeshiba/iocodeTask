import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlockComponent } from './components/block/block.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // default route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    UserItemComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    BlockComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule ,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
