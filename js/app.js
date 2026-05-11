import {
    getProducts,
    deleteProduct,
    updateQuantity
} from "./api.js";

import { renderProducts } from "./render.js";

let currentDeleteId = null;
let modalOpen = false;

// cache DOM
const modalContainer = document.getElementById("modal-container");

/* ===== CARREGAR PRODUTOS ===== */
async function loadProducts() {
    const products = await getProducts();
    renderProducts(products);
}

/* ===== MODAL NOVO PRODUTO ===== */
async function openNewProductModal() {
    if (modalOpen) return;
    modalOpen = true;

    const response = await fetch("../pages/add-product.html");
    const modalHtml = await response.text();

    modalContainer.innerHTML = modalHtml;
}

/* ===== MODAL EDITAR ===== */
async function openEditModal(id) {
    if (modalOpen) return;
    modalOpen = true;

    const response = await fetch("../pages/edit-product.html");
    const modalHtml = await response.text();

    modalContainer.innerHTML = modalHtml;

    // aqui você pode preencher dados do produto
}

/* ===== MODAL EXCLUIR ===== */
async function openDeleteModal(id) {
    if (modalOpen) return;
    modalOpen = true;

    currentDeleteId = id;

    const response = await fetch("../pages/warning-message.html");
    const modalHtml = await response.text();

    modalContainer.innerHTML = modalHtml;
}

/* ===== FECHAR MODAL ===== */
function closeModal() {
    modalContainer.innerHTML = "";
    currentDeleteId = null;
    modalOpen = false;
}

/* ===== EVENTOS CENTRALIZADOS ===== */
document.addEventListener("click", async (event) => {

    /* ===== AUMENTAR ===== */
    const increaseBtn = event.target.closest(".increase-btn");

    if (increaseBtn) {
        const id = Number(increaseBtn.dataset.id);
        await updateQuantity(id, 1);
        loadProducts();
        return;
    }

    /* ===== DIMINUIR ===== */
    const decreaseBtn = event.target.closest(".decrease-btn");

    if (decreaseBtn) {
        const id = Number(decreaseBtn.dataset.id);
        await updateQuantity(id, -1);
        loadProducts();
        return;
    }

    /* ===== NOVO ITEM ===== */
    const newItemBtn = event.target.closest("#add-new-product-type");

    if (newItemBtn) {
        await openNewProductModal();
        return;
    }

    /* ===== EXCLUIR (ABRE MODAL) ===== */
    const deleteBtn = event.target.closest(".delete-btn");

    if (deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        await openDeleteModal(id);
        return;
    }

    /* ===== EDITAR ===== */
    const editBtn = event.target.closest(".edit-btn");

    if (editBtn) {
        const id = Number(editBtn.dataset.id);
        await openEditModal(id);
        return;
    }

    /* ===== CONFIRMAR EXCLUSÃO ===== */
    if (event.target.closest("#confirm-button")) {

        if (typeof currentDeleteId === "number") {
            await deleteProduct(currentDeleteId);
            await loadProducts();
        }

        closeModal();
        return;
    }

    /* ===== FECHAR MODAL ===== */
    if (
        event.target.id === "modal-overlay" ||
        event.target.closest("#cancel-button") ||
        event.target.closest("#close-modal")
    ) {
        closeModal();
    }
});

/* ===== INICIAL ===== */
loadProducts();