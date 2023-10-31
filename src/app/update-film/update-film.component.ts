import { Categorie } from './../Model/categorie.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from './../Model/film.model';
import { FilmService } from './../services/film.service';
import { Image } from '../Model/image.model';
@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
  styles: [],
})
export class UpdateFilmComponent implements OnInit {
  currentFilm = new Film();
  categories!: Categorie[];
  updatedCatId!: number;
  myImage!: string;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmService: FilmService
  ) {}

  // ngOnInit(): void {
  //   this.filmService.listeCategories().subscribe((cats) => {
  //     this.categories = cats._embedded.categories;
  //   });
  //   this.filmService
  //     .consulterFilm(this.activatedRoute.snapshot.params['id'])

  //     .subscribe((film) => {
  //       this.currentFilm = film;
  //       this.updatedCatId = film.categorie.idCat;
  //     });
  // }

  ngOnInit(): void {
    this.filmService.listeCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });

    this.filmService
      .consulterFilm(this.activatedRoute.snapshot.params['id'])

      .subscribe((film) => {
        this.currentFilm = film;

        this.updatedCatId = this.currentFilm.categorie.idCat;

        this.filmService
          .loadImage(this.currentFilm.idFilm)
          .subscribe((img: Image) => {
            this.myImage = 'data:' + img.type + ';base64,' + img.image;
            console.log('test info', this.myImage);
          });
      });
  }

  updateFilm() {
    this.currentFilm.categorie = this.categories.find(
      (cat) => cat.idCat == this.updatedCatId
    )!;
    this.filmService.updateFilm(this.currentFilm).subscribe((film) => {
      this.router.navigate(['films']);
    });
  }

  // updateFilm() {
  //   this.currentFilm.categorie = this.categories.find(
  //     (cat) => cat.idCat == this.updatedCatId
  //   )!;
  //   if (this.isImageUpdated) {
  //     this.filmService
  //       .uploadImage(this.uploadedImage, this.uploadedImage.name)
  //       .subscribe((img: Image) => {
  //         this.currentFilm.image = img;
  //         this.filmService.updateFilm(this.currentFilm).subscribe((film) => {
  //           this.router.navigate(['films']);
  //         });
  //       });
  //   } else {
  //     this.filmService.updateFilm(this.currentFilm).subscribe((film) => {
  //       this.router.navigate(['films']);
  //     });
  //   }
  // }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);

      reader.onload = () => {
        this.myImage = reader.result as string;
        // console.log('The image url', this.myImage);
      };
    }
  }

  onAddImageFilm() {
    this.filmService
      .uploadImageFilm(
        this.uploadedImage,
        this.uploadedImage.name,
        this.currentFilm.idFilm
      )
      .subscribe((img: Image) => {
        this.currentFilm.images.push(img);
      });
  }

  supprimerImage(img: Image) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.filmService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentFilm.images.indexOf(img, 0);
        if (index > -1) {
          this.currentFilm.images.splice(index, 1);
        }
      });
  }
}
