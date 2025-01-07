import { create } from "zustand"; 

export const useProductStore = create((set) => ({
    products: [], 
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please fill in all fields."}
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json()

        set((state) => ({products: [...state.products, data.data] }));
        return {success: true, message: "Cake created successfully" };
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products"); 
        const data = await res.json();
        set({ products: data.data }); 
    }, 
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE", 
        }); 
        const data = await res.json(); 
        if (!data.success) return { success: false, message: data.message}; 
        
        // allows updating of ui to reflect changes made to backend w/o refresh
        set(state => ({ products: state.products.filter(product => product._id !== pid )}));
        return { success: true, message: data.message }; 
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT", 
            headers: {
                "Content-Type":"application/json", 
            }, 
            body: JSON.stringify(updatedProduct), 
        });
        const data = await res.json(); 
        if (!data.success) return { success: false, message: data.message}; 
        
        // this updates the state in the ui immediately so we can see the latest value
        set(state => ({
            products: state.products.map(product => product._id === pid ? data.data : product)
        })); 
    }
}));

