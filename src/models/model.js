class Model {
  async buscarDados(id) {
    try {
      const resposta = await fetch(
        `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`
      );
      return await resposta.json();
    } catch (error) {
      window.alert("Erro ao buscar dados");
      throw error;
    }
  }

  async atualizarDados(id, data) {
    try {
      const resposta = await fetch(
        `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      return await resposta.json();
    } catch (error) {
      window.alert("Erro ao atualizar dados");
      throw error;
    }
  }

  async removerDados(id) {
    try {
      const resposta = await fetch(
        `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`,
        {
          method: "DELETE",
        }
      );
      return await resposta.json();
    } catch (error) {
      window.alert("Erro ao remover dados");
      throw error;
    }
  }
}

export default Model;
