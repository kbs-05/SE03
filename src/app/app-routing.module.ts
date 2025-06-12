import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ENREGISTREComponent } from './enregistre/enregistre.component';
import { AFFICHEComponent } from './affiche/affiche.component';
import { LISTEComponent } from './liste/liste.component';




const routes: Routes = [
  { path:'', component:ENREGISTREComponent},
  { path:'enregistre', component:ENREGISTREComponent},
  { path:'affiche/:id', component:AFFICHEComponent},
  { path:'liste', component:LISTEComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
