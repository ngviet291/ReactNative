export const api = {
  posts: "https://jsonplaceholder.typicode.com/posts",
  users: (id: string) => `https://jsonplaceholder.typicode.com/users/${id}`,
  productsSearch: (keyword: string, limit: number) =>
    `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`,
  brokenApi: "https://dummyjson-typo.com/product",
  products: "https://dummyjson.com/products?limit=0",
  productsPaged: (page: number, limit: number) =>
    `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`,
};
