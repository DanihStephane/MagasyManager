export interface Article {
  id: number;
  nom: string;
  prix: number;
  stock: number;
  categorie: string;
  image: string;
  reference?: string;
  couleur?: string;
  emplacement?: string;
}