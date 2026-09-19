import { api } from "../../api/api";
import { ApiResponse } from "../types/ApiResponse";
import { Product } from "../types/Product";

const LIMIT = 10;
export async function fetchProductsPaged(
  page: number,
): Promise<ApiResponse<Product>> {
  const res = await fetch(api.productsPaged(page, LIMIT));
  const data = await res.json();
  const result: ApiResponse<Product> = {
    data: data.products as Product[],
    total: data.total,
    page: page,
  };
  return result;
}
