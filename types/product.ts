export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string | null;
};

export type CreateProductInput = Omit<Product, "id">;
