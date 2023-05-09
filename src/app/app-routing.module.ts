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
import {AddProductComponent} from "./add-product/add-product.component";
import {PostComponent} from "./pages/post/post.component";
import {ForumComponent} from "./pages/forum/forum.component";

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetmailComponent } from './pages/reset/resetmail/resetmail.component';
import { ClaimComponent } from './pages/claim/claim.component';

import { ResetpassComponent } from './pages/reset/resetpass/resetpass.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './variables/auth.guard';



const routes: Routes = [

  { path:'login',  component: LoginComponent },
  { path:'profile',  component: ProfileComponent,  canActivate : [AuthGuard] },
  { path:'reset',  component: ResetmailComponent },
  { path:'change_password',  component: ResetpassComponent },
  { path:'signup',  component: SignupComponent },

 
  { path:'potdetail/:idPot',  component: PotDetailsComponent,  canActivate : [AuthGuard]},
 
  { path:'claim',  component: ClaimComponent},


  { path:'',  component: HomeComponent ,  canActivate : [AuthGuard]},
  { path:'home',  component: HomeComponent ,  canActivate : [AuthGuard]},
  { path:'about',  component: AboutComponent ,  canActivate : [AuthGuard]},
  { path:'contact',  component: ContactComponent ,  canActivate : [AuthGuard]},
  { path:'pot',  component: PotComponent ,  canActivate : [AuthGuard]},
  { path:'potgrid',  component: PotGridComponent,  canActivate : [AuthGuard] },
  { path:'event',  component: EventComponent,  canActivate : [AuthGuard] },
  { path:'eventdetail',  component: EventDetailComponent},

  { path:'product',  component: ProductsComponent ,  canActivate : [AuthGuard]},
     { path:'productdetail/:id',  component: ProductsDetailsComponent,  canActivate : [AuthGuard] },
  { path:'post',  component: PostComponent },
  { path:'forum',  component: ForumComponent },


  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
