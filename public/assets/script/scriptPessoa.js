import { request } from './apiService.js';
import { aplicarMascaraCPF, aplicarMascaraTelefone, formatarInput } from './masks.js';

const inputId = document.querySelector("#input_id");
const inputNome = document.querySelector("#input_nome");
const inputCpf = document.querySelector("#input_cpf");
const inputTelefone = document.querySelector("#input_telefone");
const inputEmail = document.querySelector("#input_email");

const inputs = [inputNome, inputCpf, inputTelefone, inputEmail];

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== "") {
            input.classList.remove("input-erro");
        }
    });
});

inputCpf.addEventListener('input', (e) => formatarInput(e, aplicarMascaraCPF));
inputTelefone.addEventListener('input', (e) => formatarInput(e, aplicarMascaraTelefone));

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
        alert("Por favor, preencha todos os campos destacados em vermelho!");
    }
    return valido;
}

function limparFormulario() {
    inputId.value = "";
    inputNome.value = "";
    inputCpf.value = "";
    inputTelefone.value = "";
    inputEmail.value = "";
    document.querySelector("#input_situacao").value = "";
    
    inputs.forEach(input => input.classList.remove("input-erro"));
}

async function atualizarTabelaPessoas() {
    const tabela = document.getElementById("resultados");
    const dados = await request('/pessoas');
    tabela.innerHTML = dados.map(item => `
        <div class="tabela_linha" onclick="window.selecionarPessoas(${item.id_pessoa}, '${item.nome}', '${item.cpf}', '${item.telefone}', '${item.email}', '${item.situacao}')">
            <span>${item.id_pessoa}</span>
            <span>${item.nome}</span>
            <span>${item.cpf}</span>
            <span>${item.telefone}</span>
            <span>${item.email}</span>
            <span>${item.situacao}</span>
        </div>
    `).join('');
}

window.selecionarPessoas = (id, nome, cpf, telefone, email, situacao) => {
    inputId.value = id;
    inputNome.value = nome;
    inputCpf.value = cpf;
    inputTelefone.value = telefone;
    inputEmail.value = email;
    document.querySelector("#input_situacao").value = situacao;    
    inputs.forEach(input => input.classList.remove("input-erro"));
};

export async function postPessoas() {
    if (!validarFormulario()) return;

    const body = {
        nome: inputNome.value,
        cpf: inputCpf.value.replace(/\D/g, ''),
        telefone: inputTelefone.value.replace(/\D/g, ''),
        email: inputEmail.value
    };
    await request('/pessoas', 'POST', body);
    alert("Cadastro realizado com sucesso!");
    limparFormulario();
    await atualizarTabelaPessoas();
}

export async function putPessoas() {
    if (!validarFormulario()) return;

    const body = {
        id_pessoa: inputId.value,
        nome: inputNome.value,
        cpf: inputCpf.value.replace(/\D/g, ''),
        telefone: inputTelefone.value.replace(/\D/g, ''),
        email: inputEmail.value,
        situacao: document.querySelector("#input_situacao").value
    };
    await request('/pessoas', 'PUT', body);
    alert("Cadastro atualizado com sucesso!");
    limparFormulario();
    await atualizarTabelaPessoas();
}

export async function deletePessoas() {
    const id = inputId.value;
    if (!id) {
        alert("Selecione um registro na tabela para deletar!");
        return;
    }
    await request('/pessoas', 'DELETE', { id_pessoa: id });
    alert("Cadastro removido com sucesso!");
    limparFormulario();
    await atualizarTabelaPessoas();
}

document.getElementById('btn-adicionar').addEventListener('click', postPessoas);
document.getElementById('btn-atualizar').addEventListener('click', putPessoas);
document.getElementById('btn-deletar').addEventListener('click', deletePessoas);

window.addEventListener('load', atualizarTabelaPessoas);