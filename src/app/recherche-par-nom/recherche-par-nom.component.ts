import { Film } from './../Model/film.model';
import { FilmService } from './../services/film.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {

  constructor(private filmService: FilmService) { }
  films!: Film[];
  nomFilm!:string;


  allFilms! : Film[];
searchTerm!: string;
ngOnInit(): void {
this.filmService.listeFilm().subscribe(prods => {
console.log(prods);
this.films = prods;
});
}
onKeyUp(filterText : string){
  this.films = this.allFilms.filter(item =>
  item.nomFilm.toLowerCase().includes(filterText));
  }
  



  rechercherProds(){
    this.filmService.rechercherParNom(this.nomFilm).
    subscribe(prods => {
    this.films = prods;
    console.log(prods)});
    }

    supprimerFilm(film:Film){

    }

}
