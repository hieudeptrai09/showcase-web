import { useState, useEffect } from "react";

interface UseAdminPageProps<T> {
  fetchItems: () => Promise<T[]>;
  createItem: (token: string, data: any) => Promise<any>;
  updateItem: (token: string, id: number, data: any) => Promise<any>;
  deleteItem: (token: string, id: number) => Promise<any>;
  deleteConfirmMessage?: string;
}

export function useAdminPage<T extends { id: number }>({
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  deleteConfirmMessage = "Are you sure you want to delete this item?",
}: UseAdminPageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken") || "";
    setToken(adminToken);
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const data = await fetchItems();
    setItems(data);
    setLoading(false);
  };

  const handleCreate = async (data: any) => {
    try {
      await createItem(token, data);
      await loadItems();
      closeModal();
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  };

  const handleUpdate = async (id: number, data: any) => {
    try {
      await updateItem(token, id, data);
      await loadItems();
      closeModal();
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(deleteConfirmMessage)) return;

    try {
      const result = await deleteItem(token, id);
      if (result && result.success === false) {
        alert(result.message || "Failed to delete item");
      } else {
        await loadItems();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const openModal = (item?: T) => {
    setEditingItem(item || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return {
    items,
    loading,
    isModalOpen,
    editingItem,
    token,
    handleCreate,
    handleUpdate,
    handleDelete,
    openModal,
    closeModal,
    loadItems,
  };
}
