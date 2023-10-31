import { FilmGuard } from './film.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { FilmsComponent } from './films/films.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFilmComponent } from './add-film/add-film.component';
import { UpdateFilmComponent } from './update-film/update-film.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';

const routes: Routes = [
  {path:"films",component:FilmsComponent},
  {path:"addFilm",component:AddFilmComponent, canActivate:[FilmGuard]},
  {path: "rechercheParCategorie", component : RechercheParGenreComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path:"updateFilm/:id",component:UpdateFilmComponent},
  {path: "listeCategories", component : ListeCategoriesComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'login', component: LoginComponent},

  { path: "", redirectTo: "films", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
