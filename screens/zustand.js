import create from "zustand";

export const Store = create((set) => ({
    page: 1,
    setPage: (page) => set({ page }),
    search: '',
    setSearch: (search) => set({ search }),
}))