import { Article } from './article';

export interface ArticleQuantite {
  article: Article;
  quantite: number;
}

export interface Balle {
  id: number;
  numero: string;
  emplacement: string;
  etage: string;
  quantite: number;
  dateCreation: Date;
  articles: ArticleQuantite[];
}