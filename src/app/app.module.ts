import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PotComponent } from './pages/pot/pot.component';
import { EventComponent } from './pages/event/event.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PotDetailsComponent } from './pages/pot-details/pot-details.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { ClaimComponent } from './pages/claim/claim.component';
import { PotGridComponent } from './pages/pot-grid/pot-grid.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    PotComponent,
    EventComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent,
    PotDetailsComponent,
    ProductsDetailsComponent,
    ClaimComponent,
    PotGridComponent,
    EventDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
