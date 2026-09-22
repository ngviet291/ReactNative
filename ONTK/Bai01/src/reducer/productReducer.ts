import { Product } from "../types";

/* ==================== STATE ==================== */
export interface ProductState {
  products: Product[];
  loading: boolean; // lần tải đầu
  refreshing: boolean; // kéo xuống làm mới
  loadingMore: boolean; // tải thêm trang
  error: string | null;
  page: number;
  total: number;
}

export const initialProductState: ProductState = {
  products: [],
  loading: true,
  refreshing: false,
  loadingMore: false,
  error: null,
  page: 1,
  total: 0,
};

/* ==================== ACTION — discriminated union ==================== */
export type ProductAction =
  | { type: "FETCH_START"; payload: { mode: "first" | "refresh" | "more" } }
  | {
      type: "FETCH_SUCCESS";
      payload: { products: Product[]; total: number; page: number };
    }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "DELETE"; payload: number };

/* ==================== REDUCER — HÀM THUẦN ==================== */
export function productReducer(
  state: ProductState,
  action: ProductAction,
): ProductState {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: action.payload.mode === "first",
        refreshing: action.payload.mode === "refresh",
        loadingMore: action.payload.mode === "more",
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        refreshing: false,
        loadingMore: false,
        // trang 1 -> thay mới; trang sau -> NỐI THÊM
        products:
          action.payload.page === 1
            ? action.payload.products
            : [...state.products, ...action.payload.products],
        total: action.payload.total,
        page: action.payload.page,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        refreshing: false,
        loadingMore: false,
        error: action.payload,
      };

    case "DELETE":
      // .filter() trả MẢNG MỚI, loại đúng 1 phần tử theo id
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
        total: Math.max(0, state.total - 1),
      };

    default:
      return state; // BẮT BUỘC
  }
}