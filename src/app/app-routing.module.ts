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

const routes: Routes = [

  { path:'',  component: HomeComponent },
  { path:'home',  component: HomeComponent },
  { path:'about',  component: AboutComponent },
  { path:'contact',  component: ContactComponent },
  { path:'pot',  component: PotComponent },
  { path:'potgrid',  component: PotGridComponent },
  { path:'potdetail',  component: PotDetailsComponent},
  { path:'event',  component: EventComponent },
  { path:'eventdetail',  component: EventDetailComponent},
  { path:'product',  component: ProductsComponent },
  { path:'productdetail',  component: ProductsDetailsComponent },
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
