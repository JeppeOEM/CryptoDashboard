import { create } from "zustand";
import axios from "axios";


async function _login(email:string, password:string) {
    console.log(import.meta.env.VITE_API_URL + "user/login/", "fucking token");
    return axios
      .post(import.meta.env.VITE_API_URL + "user/login/", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          return true;
        }
        return false;
      })
      .catch(() => {
        return false;
      });
  }



interface AuthStore {
isAuthenticated: boolean;
login: (email: string, password: string) => Promise<boolean>;
logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem("user"), // !! converts value to a boolean
  login: async (email: string, password: string) => {
    const success = await _login(email, password);
    if (success) {
      set({ isAuthenticated: true });
    }
    return success;
  },
  logout: () => {
    console.log(localStorage.getItem('user'))
    localStorage.removeItem("user");
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;