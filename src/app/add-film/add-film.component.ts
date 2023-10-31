import { Categorie } from './../Model/categorie.model';
import { Film } from './../Model/film.model';
import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../Model/image.model';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
})
export class AddFilmComponent implements OnInit {
  newFilm = new Film();
  msg: string = '';

  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  uploadedImage!: File;
  imagePath: any;

  constructor(private filmService: FilmService, private router: Router) {}

  ngOnInit(): void {
    this.filmService.listeCategories().subscribe((categories) => {
      console.log(categories);
      this.categories = categories._embedded.categories;
    });
  }

  addFilm() {
    this.filmService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newFilm.image = img;
        this.newFilm.categorie = this.categories.find(
          (categorie) => categorie.idCat == this.newIdCat
        )!;
        this.filmService.ajouterFilm(this.newFilm).subscribe(() => {
          this.router.navigate(['films']);
        });
      });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}
