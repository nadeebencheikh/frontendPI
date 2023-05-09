import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PotComponent } from './pages/pot/pot.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EventComponent } from './pages/event/event.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { PotGridComponent } from './pages/pot-grid/pot-grid.component';
import { PotDetailsComponent } from './pages/pot-details/pot-details.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetmailComponent } from './pages/reset/resetmail/resetmail.component';
import { ClaimComponent } from './pages/claim/claim.component';

const routes: Routes = [

  { path:'login',  component: LoginComponent },
  { path:'reset',  component: ResetmailComponent },
  { path:'signup',  component: SignupComponent },
  { path:'',  component: HomeComponent },
  { path:'home',  component: HomeComponent },
  { path:'about',  component: AboutComponent },
  { path:'contact',  component: ContactComponent },
  { path:'pot',  component: PotComponent },
  { path:'potgrid',  component: PotGridComponent },
  { path:'potdetail/:idPot',  component: PotDetailsComponent},
  { path:'event',  component: EventComponent },
  { path:'eventdetail',  component: EventDetailComponent},
  { path:'product',  component: ProductsComponent },
  { path:'productdetail',  component: ProductsDetailsComponent },
  { path:'claim',  component: ClaimComponent},
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
