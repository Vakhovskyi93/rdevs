import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";

const routs: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutUsComponent},

  {path: '**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routs)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
