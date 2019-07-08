export interface IProducts {
  products?: IProduct[];
}

export interface IProduct {
  id?: number;
  sku?: number;
  title?: string;
  description?: string;
  availableSizes?: string[];
  price?: number;
  isFreeShipping?: boolean;
  count?: number;
}
