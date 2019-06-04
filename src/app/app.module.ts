import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule, MatDatepickerModule, MatDividerModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatNativeDateModule, MatStepperModule, MatRadioModule, MatTabsModule, MatTableModule, MatMenuModule
} from "@angular/material";
import { CreateStoreComponent } from './create-store/create-store.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewOrderComponent } from './view-order/view-order.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateStoreComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ViewOrderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatTabsModule,
        MatTableModule,
        MatMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
