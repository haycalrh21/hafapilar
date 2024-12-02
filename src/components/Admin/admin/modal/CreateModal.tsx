import { useMutation } from "@tanstack/react-query";
import { UserLogin } from "@/app/types/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface ModalCreateProps {
  onClose: () => void;
  fetchdata: () => void; // fetchdata sekarang harus berupa fungsi
  isOpen: boolean;
}

export default function ModalCreate({
  onClose,
  fetchdata,
  isOpen,
}: ModalCreateProps) {
  const [payload, setPayload] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  // Definisi mutation untuk registrasi
  const mutation = useMutation({
    mutationFn: async (userData: UserLogin) => {
      const response = await fetch(`${api_url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      return response.json();
    },
    onSuccess: () => {
      fetchdata(); // Memanggil refetch data dari parent
      onClose(); // Menutup modal setelah sukses
      setLoading(false); // Pastikan set loading false setelah sukses
    },
    onError: (error: any) => {
      console.error("Error during registration:", error);
      setLoading(false); // Jangan lupa set loading false juga di error case
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading true saat mulai submit

    // Cek jika email dan password kosong
    if (payload.email === "" || payload.password === "") {
      return;
    }

    mutation.mutate(payload); // Memanggil mutation untuk registrasi
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-textpartner">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={payload.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={payload.password}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="bg-hijau text-textpartner rounded-2xl py-2 px-4 my-2 hover:bg-cardtesti"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
