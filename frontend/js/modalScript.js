// Personalizando modal para exluir task
const modal       = document.getElementById("deleteModal");
const task_id     = document.getElementById("task_id");
const excluirBtn  = document.querySelector("#excluirBtn");
const btnClose    = document.querySelector(".btn-close");
const btnCancelar = document.querySelector(".btn-cancelar");
const bgUnfocus   = document.querySelector("#bg-unfocus");

btnClose.addEventListener("click", () => hideModal());
btnCancelar.addEventListener("click", () => hideModal());

const openModal = (id) => {
	task_id.value = id;
	modal.classList.add("show");
	modal.classList.add("fade-in");
	modal.classList.add("wiggle");
	modal.style.display     = "block";
	bgUnfocus.style.display = "block";
	modal.setAttribute("role", "dialog");
};

const hideModal = () => {
    bgUnfocus.style.display = "none";
	modal.style.display     = "none";
};

// Fechar o modal qnd o usuário clica fora
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

excluirBtn.addEventListener("click", () => {
	taskDelete(task_id.value);
	hideModal();
});
