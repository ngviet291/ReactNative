import axios from "axios";

const API = "https://6acc3473ef37b15040785e03.mockapi.io";

export async function addReview(book: any, review: any) {
  const res = await axios.put(`${API}/books/${book.id}`, {
    reviews: [...(book.reviews ?? []), review],
  });
  return res.data;
}