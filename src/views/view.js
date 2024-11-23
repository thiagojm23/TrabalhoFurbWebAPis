import Model from "../models/model.js";

class View {
  constructor() {
    this.tbody = document.querySelector("tbody");
    this.botaoBuscar = document.querySelector("#requisicaoGet");
    this.idRequisicao = document.querySelector("#idRequisicaoGet");
  }

  carregarTabela(data) {
    const novaLinha = `
        <tr>
          <td>${data.id}</td>
          <td>${data.nome}</td>
          <td>${data.departamento}</td>
          <td>${data.endereco}</td>
          <td>${data.email}</td>
        </tr>
      `;

    this.tbody.insertAdjacentHTML("beforeend", novaLinha);
  }

  obterIdRequisicao() {
    return this.idRequisicao.value;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const view = new View();
  const model = new Model();

  view.botaoBuscar.addEventListener("click", async () => {
    const id = view.obterIdRequisicao();
    try {
      const data = await model.buscarDados(id);
      view.carregarTabela(data);
    } catch (error) {}
  });
});
