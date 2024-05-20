import { ProductionCompany } from "./movieType";

export interface MovieAdditionalInfoProps {
  trailerKey: string, 
  movieDescription: string, 
  productionCompanys: Array<ProductionCompany>, 
  logoSize: string
}