import axios from "axios";

const API = "https://6acc3473ef37b15040785e03.mockapi.io/users";

export const authService = {
  async login(email: string, password: string) {
    const res = await axios.get(API);
    const user = res.data.find(
      (u: any) => u.email === email && u.password === password
    );
    if (!user) throw new Error("Invalid email or password");
    return { token: "token-" + user.id, user };
  },

  async register(email: string, password: string) {
    const res = await axios.post(API, { email, password, name: email });
    return { token: "token-" + res.data.id, user: res.data };
  },
};