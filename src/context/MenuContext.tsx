"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Allergen = "gluten" | "lacteos" | "huevo" | "soja" | "frutos_secos" | "pescado" | "sesamo";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  allergens?: Allergen[];
  options?: MenuOptionGroup[];
}

export interface MenuOptionGroup {
  id: string;
  name: string;
  maxSelections?: number;
  options: MenuOption[];
}

export interface MenuOption {
  id: string;
  name: string;
  priceDelta?: string;
  allergens?: Allergen[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface MenuContextProps {
  categories: MenuCategory[];
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  addCategory: (category: MenuCategory) => void;
  updateCategory: (id: string, category: MenuCategory) => void;
  deleteCategory: (id: string) => void;
  addItem: (categoryId: string, item: MenuItem) => void;
  updateItem: (categoryId: string, itemId: string, item: MenuItem) => void;
  deleteItem: (categoryId: string, itemId: string) => void;
  resetMenu: () => void;
}

const initialData: MenuCategory[] = [
  {
    id: "cat-cafe",
    name: "CAFÉ",
    items: [
      { id: "c-1", name: "ESPRESSO", description: "Espresso simple", price: "1.50€" },
      { id: "c-2", name: "DOBLE ESPRESSO", description: "Doble carga de café espresso", price: "1.90€" },
      { id: "c-3", name: "CORTADO", description: "Espresso simple con un toque de leche emulsionada", price: "1.60€", allergens: ["lacteos"] },
      { id: "c-4", name: "FLAT WHITE", description: "Espresso doble combinado con leche emulsionada", price: "2.50€", allergens: ["lacteos"] },
      { id: "c-5", name: "CAFÉ BOMBÓN", description: "Espresso simple acompañado de leche condensada", price: "2.00€", allergens: ["lacteos"] },
      { id: "c-6", name: "AMERICANO", description: "Espresso doble estirado con agua caliente", price: "1.50€" },
      { id: "c-7", name: "LATTE", description: "Espresso simple con abundante leche emulsionada sedosa", price: "2.40€", allergens: ["lacteos"] },
      { id: "c-8", name: "LATTE MACCHIATO", description: "Leche suave emulsionada, manchada con un espresso", price: "2.40€", allergens: ["lacteos"] },
      { id: "c-9", name: "CAFÉ CON LECHE", description: "Espresso simple combinado con leche emulsionada", price: "1.80€", allergens: ["lacteos"] },
      { id: "c-10", name: "CAPUCHINO", description: "Espresso simple infusionado con cacao y leche emulsionada cremosa", price: "2.40€", allergens: ["lacteos"] },
    ],
  },
  {
    id: "cat-frios",
    name: "CAFÉS FRÍOS",
    items: [
      { id: "f-1", name: "ICED LATTE", description: "Espresso doble sobre leche fría y hielo", price: "3.50€", allergens: ["lacteos"] },
      { id: "f-2", name: "COLD BREW", description: "Café extraído en frío durante 12 horas", price: "3.50€" },
      { id: "f-3", name: "MATCHA LATTE", description: "Matcha premium con leche vegetal", price: "4.00€", allergens: ["lacteos"] },
      { id: "f-4", name: "ICED AMERICANO", description: "Espresso doble estirado con agua fría y hielo", price: "2.50€" },
    ],
  },
  {
    id: "cat-infusiones",
    name: "INFUSIONES",
    items: [
      { id: "i-1", name: "TÉ NEGRO", description: "Clásico té negro en hoja", price: "2.00€" },
      { id: "i-2", name: "TÉ VERDE", description: "Té verde delicado y aromático", price: "2.00€" },
      { id: "i-3", name: "MANZANILLA", description: "Infusión de manzanilla natural", price: "2.00€" },
      { id: "i-4", name: "MENTA POLEO", description: "Infusión refrescante de menta", price: "2.00€" },
    ],
  },
  {
    id: "cat-pasteleria",
    name: "PASTELERÍA",
    items: [
      { id: "p-1", name: "CROISSANT", price: "2.00€", allergens: ["gluten", "lacteos", "huevo"] },
      { id: "p-2", name: "CROISSANT CHOCOLATE", price: "2.60€", allergens: ["gluten", "lacteos", "huevo", "soja"] },
      { id: "p-3", name: "CROISSANT LOTUS", price: "2.60€", allergens: ["gluten", "lacteos", "huevo", "soja"] },
      { id: "p-4", name: "CROISSANT PISTACHO", price: "2.70€", allergens: ["gluten", "lacteos", "huevo", "frutos_secos"] },
      { id: "p-5", name: "CINNAMON ROLL", price: "2.70€", allergens: ["gluten", "lacteos", "huevo"] },
      { id: "p-6", name: "NAPOLITANA CHOCOLATE", price: "2.20€", allergens: ["gluten", "lacteos", "huevo", "soja"] },
      { id: "p-7", name: "NAPOLITANA CREMA", price: "2.20€", allergens: ["gluten", "lacteos", "huevo"] },
      { id: "p-8", name: "BRETZEL CHOCOLATE", price: "2.90€", allergens: ["gluten", "lacteos", "soja", "sesamo"] },
      { id: "p-9", name: "BRETZEL CREMA", price: "2.90€", allergens: ["gluten", "lacteos", "sesamo"] },
      { id: "p-10", name: "TARTA DE MANZANA", price: "3.20€", allergens: ["gluten", "lacteos", "huevo"] },
      { id: "p-11", name: "BROWNIE CON NUECES", price: "5.00€", allergens: ["gluten", "lacteos", "huevo", "frutos_secos"] },
      { id: "p-12", name: "COOKIE PISTACHO", price: "4.50€", allergens: ["gluten", "lacteos", "huevo", "frutos_secos"] },
      { id: "p-13", name: "COOKIE NUTELLA", price: "4.50€", allergens: ["gluten", "lacteos", "huevo", "frutos_secos"] },
    ],
  },
  {
    id: "cat-tostadas",
    name: "TOSTADAS",
    items: [
      {
        id: "t-1",
        name: "ARMA TU TOSTADA",
        description: "Elige tu pan y hasta 2 bases desde 1.30€. Personalízala sumando tus extras.",
        price: "desde 1.30€",
        options: [
          {
            id: "opt-pan",
            name: "TIPO DE PAN",
            options: [
              { id: "pan-1", name: "Pan blanco clásico", allergens: ["gluten"] },
              { id: "pan-2", name: "Pan integral", allergens: ["gluten"] },
              { id: "pan-3", name: "Pan de semillas y cereales", allergens: ["gluten", "sesamo"] },
              { id: "pan-4", name: "Pan sin gluten" },
            ],
          },
          {
            id: "opt-base",
            name: "BASES (HASTA 2)",
            maxSelections: 2,
            options: [
              { id: "base-1", name: "Tomate rallado" },
              { id: "base-2", name: "AOVE" },
              { id: "base-3", name: "Mermelada (fresa o melocotón)", priceDelta: "+0.20€" },
              { id: "base-4", name: "Mantequilla (x2)", priceDelta: "+0.40€", allergens: ["lacteos"] },
            ],
          },
          {
            id: "opt-extras",
            name: "EXTRAS",
            options: [
              { id: "ext-1", name: "Jamón serrano", priceDelta: "+1.50€" },
              { id: "ext-2", name: "Jamón york", priceDelta: "+1.00€" },
              { id: "ext-3", name: "Salmón", priceDelta: "+2.40€", allergens: ["pescado"] },
              { id: "ext-4", name: "Anchoas", priceDelta: "+2.40€", allergens: ["pescado"] },
              { id: "ext-5", name: "Atún", priceDelta: "+1.50€", allergens: ["pescado"] },
              { id: "ext-6", name: "Queso fresco", priceDelta: "+1.00€", allergens: ["lacteos"] },
            ],
          },
        ],
      },
    ],
  },
];

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<MenuCategory[]>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("la_serafina_menu_data");
      if (saved) {
        setCategories(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("la_serafina_menu_data", JSON.stringify(categories));
    } catch (e) {
      console.error("Error writing to localStorage:", e);
    }
  }, [categories, isLoaded]);

  // Sync across tabs/windows in real time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "la_serafina_menu_data" && e.newValue) {
        try {
          setCategories(JSON.parse(e.newValue));
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addCategory = (category: MenuCategory) =>
    setCategories((prev) => [...prev, category]);

  const updateCategory = (id: string, updatedCategory: MenuCategory) =>
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? updatedCategory : cat))
    );

  const deleteCategory = (id: string) =>
    setCategories((prev) => prev.filter((cat) => cat.id !== id));

  const addItem = (categoryId: string, item: MenuItem) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return { ...cat, items: [...cat.items, item] };
        }
        return cat;
      })
    );
  };

  const updateItem = (categoryId: string, itemId: string, updatedItem: MenuItem) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.map((item) =>
              item.id === itemId ? updatedItem : item
            ),
          };
        }
        return cat;
      })
    );
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.filter((item) => item.id !== itemId),
          };
        }
        return cat;
      })
    );
  };

  const resetMenu = () => {
    setCategories(initialData);
    try {
      localStorage.setItem("la_serafina_menu_data", JSON.stringify(initialData));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        categories,
        setCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        addItem,
        updateItem,
        deleteItem,
        resetMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
