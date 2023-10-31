import { CategorieWrapper } from './../Model/CategorieWrapped';
import { Categorie } from './../Model/categorie.model';
import { Film } from './../Model/film.model';
import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles: [
  ]
})
export class RechercheParGenreComponent implements OnInit {

  constructor(private filmService: FilmService) { }
  films!: Film[];
  idCat!: number;
  categories!: Categorie[];

  ngOnInit(): void {
    this.filmService.listeCategories().subscribe(
      categories => {
        this.categories = categories._embedded.categories;
        console.log(categories);
      });
  }
  
  onChange(){
    this.filmService.rechercherParCategorie(this.idCat).
    subscribe(prods =>{this.films=prods});
  }
  supprimerFilm(f:Film){

  }

}
