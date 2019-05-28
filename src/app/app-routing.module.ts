import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateStoreComponent} from './create-store/create-store.component'
import {HomeComponent} from './home/home.component'
import {LoginComponent} from './login/login.component'
import {DashboardComponent} from './dashboard/dashboard.component'

const routes: Routes = [
  {path:'store/create', component:CreateStoreComponent},
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
