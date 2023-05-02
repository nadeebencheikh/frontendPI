import { NgModule, isDevMode } from '@angular/core';
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
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetmailComponent } from './pages/reset/resetmail/resetmail.component';
import { ResetpassComponent } from './pages/reset/resetpass/resetpass.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CookieService } from 'ngx-cookie-service';

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
    LoginComponent,
    SignupComponent,
    ResetmailComponent,
    ResetpassComponent,

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
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
