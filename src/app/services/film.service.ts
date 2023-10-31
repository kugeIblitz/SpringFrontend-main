import { CategorieWrapper } from './../Model/CategorieWrapped';
import { Categorie } from '../Model/categorie.model';
import { Film } from './../Model/film.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { apiURL, apiURLCat } from '../config';
import { Image } from '../Model/image.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  Films!: Film[];
  categories!: Categorie[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  listeFilm(): Observable<Film[]> {
    return this.http.get<Film[]>(apiURL + '/all');
  }

  ajouterFilm(prod: Film): Observable<Film> {
    return this.http.post<Film>(apiURL + '/addFilm', prod, {});
  }

  supprimerFilm(id: number) {
    const url = `${apiURL}/delFilm/${id}`;

    return this.http.delete(url);
  }

  consulterFilm(id: number): Observable<Film> {
    console.log(id);

    const url = `${apiURL}/getbyid/${id}`;

    return this.http.get<Film>(url);
  }

  updateFilm(film: Film) {
    return this.http.put<Film>(apiURL + '/updateFilm', film);
  }

  trierFilms() {
    this.Films = this.Films?.sort((n1, n2) => {
      if (n1 && n2 && n1.idFilm && n2.idFilm) {
        if (n1.idFilm > n2.idFilm) {
          return 1;
        } else if (n1.idFilm < n2.idFilm) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });
  }

  listeCategories(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(apiURLCat);
  }

  consulterCategorie(id: number): Categorie {
    return this.categories.find((categorie) => categorie.idCat == id)!;
  }

  rechercherParCategorie(idCat: number): Observable<Film[]> {
    const url = `${apiURL}/filmscat/${idCat}`;
    return this.http.get<Film[]>(url);
  }

  rechercherParNom(nom: string): Observable<Film[]> {
    const url = `${apiURL}/filmsByName/${nom}`;
    return this.http.get<Film[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(apiURLCat, cat, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageFilm(
    file: File,
    filename: string,
    idFilm: number
  ): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}/${idFilm}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id: number) {
    const url = `${apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
