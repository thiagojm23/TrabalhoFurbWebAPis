import Model from "../models/model.js";

class View {
  constructor() {
    this.tbody = document.querySelector("tbody");
    this.botaoBuscar = document.querySelector("#requisicaoGet");
    this.idRequisicao = document.querySelector("#idRequisicaoGet");
    this.botaoExcluir = document.querySelector(".delete");
    this.mensagem = document.getElementById("mensagem");
    this.mensagemAlteracao = document.getElementById("mensagemAlteracao");
    this.nome = document.getElementById("nome");
    this.departamento = document.getElementById("departamento");
    this.endereco = document.getElementById("endereco");
    this.email = document.getElementById("email");
    this.botaoAlterarDados = document.getElementById("alterarDados");
  }

  carregarTabela(data) {
    const novaLinha = `
        <tr>
          <td>${data.id}</td>
          <td>${data.nome}</td>
          <td>${data.departamento}</td>
          <td>${data.endereco}</td>
          <td>${data.email}</td>
          <td><button class="delete" id="${data.id}">Exclusão</button></td>
        </tr>
      `;

    this.atribuirValores(data);

    this.tbody.insertAdjacentHTML("beforeend", novaLinha);
    this.adicionarEventoExcluir();
  }

  atribuirValores(data) {
    this.nome.value = data.nome;
    this.departamento.value = data.departamento;
    this.endereco.value = data.endereco;
    this.email.value = data.email;
  }

  exibirMensagensRequisicoes(json, ehMensagemAlteracao = false) {
    const mensagem = ehMensagemAlteracao
      ? this.mensagemAlteracao
      : this.mensagem;
    mensagem.classList.value = "";
    if (json.status === "Ok") {
      mensagem.textContent = json.mensagem;
      mensagem.classList.add("mensagemDeleteOk");
      return true;
    } else {
      mensagem.textContent = json.mensagem;
      mensagem.classList.add("mensagemDeleteErro");
      return false;
    }
  }

  adicionarEventoExcluir() {
    const model = new Model();
    const botoesExcluir = document.querySelectorAll(".delete");
    botoesExcluir.forEach((botao) => {
      if (botao._hasEventListener) return;
      botao._hasEventListener = true;
      botao.addEventListener("click", async (event) => {
        const id = event.target.id;
        try {
          const resposta = await model.removerDados(id);
          if (!this.exibirMensagensRequisicoes(resposta)) return;
          event.target.closest("tr").remove();
        } catch (error) {
          console.error("Erro ao excluir o dado:", error);
        }
      });
    });
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
    if (!id) return;
    try {
      const data = await model.buscarDados(id);
      view.carregarTabela(data);
    } catch (error) {}
  });

  view.botaoAlterarDados.addEventListener("click", async () => {
    const id = view.obterIdRequisicao();
    const data = {
      nome: view.nome.value,
      departamento: view.departamento.value,
      endereco: view.endereco.value,
      email: view.email.value,
    };
    try {
      const resposta = await model.atualizarDados(id, data);
      view.exibirMensagensRequisicoes(resposta, true);
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  });
});
