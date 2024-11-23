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
}

export default Model;
