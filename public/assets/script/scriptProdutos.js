import { request } from './apiService.js';

const inputId = document.querySelector("#input_id");
const inputProduto = document.querySelector("#input_produto");
const inputQuantidade = document.querySelector("#input_quantidade");
const inputPreco = document.querySelector("#input_preco");
const inputSituacao = document.querySelector("#input_situacao");

const inputs = [inputProduto, inputQuantidade, inputPreco];

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== "") {
            input.classList.remove("input-erro");
        }
    });
});

function validarInput(input) {
    if (input.value.trim() === "") {
        input.classList.add("input-erro");
        return false;
    }
    input.classList.remove("input-erro");
    return true;
}

function validarFormulario() {
    let valido = true;
    inputs.forEach(input => {
        if (!validarInput(input)) valido = false;
    });
    
    if (!valido) {
        alert("Por favor, preencha todos os campos!");
    }
    return valido;
}

function limparFormulario() {
    inputId.value = "";
    inputProduto.value = "";
    inputQuantidade.value = "";
    inputPreco.value = "";
    inputSituacao.value = "";
    
    inputs.forEach(input => input.classList.remove("input-erro"));
}

async function atualizarTabelaProduto() {
    const dados = await request('/produtos');
    document.getElementById("resultados").innerHTML = dados.map(item => `
        <div class="tabela_linha_produtos" onclick="window.selecionarProdutos(${item.id_produto}, '${item.produto}', ${item.preco}, ${item.quantidade}, '${item.situacao}')">
            <span>${item.id_produto}</span>
            <span>${item.produto}</span>
            <span>R$ ${item.preco}</span>
            <span>${item.quantidade}</span>
            <span>${item.situacao}</span>
        </div>
    `).join('');
}

window.selecionarProdutos = (id, produto, preco, quantidade, situacao) => {
    inputId.value = id;
    inputProduto.value = produto;
    inputPreco.value = preco;
    inputQuantidade.value = quantidade;
    inputSituacao.value = situacao;
    
    inputs.forEach(input => input.classList.remove("input-erro"));
};

export async function postProdutos() {
    if (!validarFormulario()) return;

    const body = {
        produto: inputProduto.value,
        quantidade: inputQuantidade.value,
        preco: inputPreco.value
    };
    await request('/produtos', 'POST', body);
    alert("Produto cadastrado com sucesso!");
    limparFormulario();
    await atualizarTabelaProduto();
}

export async function putProdutos() {
    if (!validarFormulario()) return;

    const body = {
        id_produto: inputId.value,
        produto: inputProduto.value,
        quantidade: inputQuantidade.value,
        preco: inputPreco.value,
        situacao: inputSituacao.value
    };
    await request('/produtos', 'PUT', body);
    alert("Produto atualizado com sucesso!");
    limparFormulario();
    await atualizarTabelaProduto();
}

export async function deleteProdutos() {
    const id = inputId.value;
    if (!id) {
        alert("Selecione um produto na tabela para deletar!");
        return;
    }
    await request('/produtos', 'DELETE', { id_produto: id });
    alert("Produto removido com sucesso!");
    limparFormulario();
    await atualizarTabelaProduto();
}

document.getElementById('btn-adicionar').addEventListener('click', postProdutos);
document.getElementById('btn-atualizar').addEventListener('click', putProdutos);
document.getElementById('btn-deletar').addEventListener('click', deleteProdutos);

window.addEventListener('load', atualizarTabelaProduto);