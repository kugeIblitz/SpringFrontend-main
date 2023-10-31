import { AuthService } from './../services/auth.service';
import { Film } from './../Model/film.model';
import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Image } from '../Model/image.model';
@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
})
export class FilmsComponent implements OnInit {
  films!: Film[];

  constructor(
    private filmService: FilmService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chargerFilms();
  }

  chargerFilms() {
    this.filmService.listeFilm().subscribe((film) => {
      console.log(film);
      this.films = film;

      this.films.forEach((film) => {
        this.filmService.loadImage(film.idFilm).subscribe((img: Image) => {
          film.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
      });
    });
  }

  supprimerFilm(f: Film) {
    let conf = confirm('Are you sure?');
    if (conf && f.idFilm !== undefined)
      this.filmService.supprimerFilm(f.idFilm).subscribe(() => {
        console.log('Movie deleted');
        this.chargerFilms();
      });
  }
}
