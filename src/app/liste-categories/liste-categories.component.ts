import { Categorie } from './../Model/categorie.model';
import { FilmService } from './../services/film.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: [
  ]
})
export class ListeCategoriesComponent implements OnInit {
  categories! : Categorie[];
  ajout:boolean=true;
  updatedCat:Categorie = {"idCat":0,"nomCat":""};




  constructor(private filmService : FilmService) { }


  ngOnInit(): void {
  this.filmService.listeCategories().
  subscribe(categories => {this.categories = categories._embedded.categories;
  console.log(categories);
  
  });
  
  }
  chargerCategories(){
    this.filmService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
    console.log(cats);
    });
    }

  categorieUpdated(cat:Categorie){
    console.log("Cat updated event",cat);
    this.filmService.ajouterCategorie(cat).
     subscribe( ()=> this.chargerCategories());
    }

   
    updateCat(cat:Categorie) {
      this.updatedCat=cat;
      this.ajout=false; 

      }
      

}
