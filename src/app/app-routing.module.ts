import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateStoreComponent} from './create-store/create-store.component'
import {HomeComponent} from './home/home.component'
import {LoginComponent} from './login/login.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {ViewOrderComponent } from './view-order/view-order.component'

const routes: Routes = [
  {path:'store/create', component:CreateStoreComponent},
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'order', component:ViewOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
