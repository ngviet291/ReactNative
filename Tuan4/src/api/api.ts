export const api = {
    posts: 'https://jsonplaceholder.typicode.com/posts',
    users:(id:string)=>`https://jsonplaceholder.typicode.com/users/${id}`,
    products: (keyword: string, limit: number) =>
    `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`,
}