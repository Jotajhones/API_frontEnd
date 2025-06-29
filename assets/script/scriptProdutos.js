function inputValues() {
    const id = document.querySelector("#input_id").value
    const produto = document.querySelector("#input_produto").value
    const preco = document.querySelector("#input_preco").value
    const quantidade = document.querySelector("#input_quantidade").value
    const situacao = document.querySelector("#input_situacao").value

    const variaveis = {
        "id": id ?? null,
        "produto": produto ?? null,
        "quantidade": quantidade ?? null,
        "preco": preco ?? null,
        "situacao": situacao ?? null
    }

    return variaveis
}

function limparForms() {
    document.querySelector("#input_id").value = "";
    document.querySelector("#input_produto").value = "";
    document.querySelector("#input_preco").value = "";
    document.querySelector("#input_quantidade").value = "";
    document.querySelector("#input_situacao").value = "Selecione";
}

function atualizarTabelaProduto() {
    const tabela = document.getElementById("resultados");
    tabela.innerHTML = "";

    fetch('http://localhost:8080/produtos')
        .then(res => res.json())
        .then(res => {

            res.forEach(item => {

                const id = item.id_produto;
                const produto = item.produto;
                const quantidade = item.quantidade;
                const preco = item.preco;
                const situacao = item.situacao;

                tabela.innerHTML += `
                    <div class="tabela_linha_produtos" onclick="selecionarProdutos(${id}, '${produto}', ${preco}, ${quantidade}, '${situacao}')">
                        <div>
                            <span>${id} - ${produto}</span>
                            <span>R$ ${preco}</span>
                        </div>
                        <div>
                            <span>Estoque: ${quantidade}</span>
                            <span>Situação: ${situacao}</span>
                        </div>
                    </div>
            `;
            });
        })
}


function selecionarProdutos(id, produto, preco, quantidade, situacao) {

    document.querySelector("#input_id").value = id;
    document.querySelector("#input_produto").value = produto;
    document.querySelector("#input_preco").value = preco;
    document.querySelector("#input_quantidade").value = quantidade;
    document.querySelector("#input_situacao").value = situacao;
}

function postProdutos() {

    const produto = inputValues();
    produto.id = null;
    produto.situacao = null;

    if (!produto.produto) {
        alert("Para cadastra um novo produto é preciso informar o nome do produto no campo produto.");
    } else if (!produto.quantidade) {
        alert("Para cadastra um novo produto é preciso informar a quantidade.");
    } else if (!produto.preco) {
        alert("Para cadastra um novo produto é preciso informar o preço.");
    } else {

        fetch('http://localhost:8080/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                produto
            )
        })
            .then(res => res.json())
            .then(res => {
                if (!res)
                    return
            })
            .catch((err) => {
                console.log(err);
            })
        alert("Post realizado com sucesso!");
        atualizarTabelaProduto();
        limparForms();
    }
}

function putProdutos() {

    const produto = inputValues();

    if (!produto.id) {
        alert("Selecione um produto para atualizar");
    } else if (!produto.produto) {
        alert("O campo produto não pode ficar em branco!");
    } else if (!produto.quantidade) {
        alert("O campo quantidade não pode ficar em branco!");
    } else if (!produto.preco) {
        alert("O campo preco não pode ficar em branco!");
    } else if (!produto.situacao) {
        alert("O campo situacao não pode ficar em branco!")
    } else {

        fetch('http://localhost:8080/produtos', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_produto": produto.id,
                "produto": produto.produto,
                "quantidade": produto.quantidade,
                "preco": produto.preco,
                "situacao": produto.situacao
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res)
                    return
            })
            .catch((err) => {
                console.log(err)
            })
        alert('Cadastro atualizado com sucesso.')
        atualizarTabelaProduto();
        limparForms();
    }
}

function deleteProdutos() {

    const produto = inputValues();

    if (!produto.id) {
        alert("Selecione um produto para deletar");
    } else {

        fetch('http://localhost:8080/produtos', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_produto": produto.id
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res)
                    return
            })
            .catch((err) => {
                console.log(err)
            })
            alert('Produto deletado com sucesso.')
            atualizarTabelaProduto();
            limparForms();
    }
}

window.addEventListener('load', atualizarTabelaProduto());
