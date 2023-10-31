import { Categorie } from './categorie.model';
import { Image } from './image.model';
export class Film {
  idFilm!: number;

  nomFilm!: string;

  descFilm!: string;

  dateCreation!: Date;

  categorie!: Categorie;

  image!: Image;

  images!: Image[];

  imageStr!: string;
}
