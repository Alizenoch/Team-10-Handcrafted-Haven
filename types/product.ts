export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string | null;
};

export type CreateProductInput = Omit<Product, "id">;