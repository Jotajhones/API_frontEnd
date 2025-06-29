function atualizarTabelaPessoas() {
    const tabela = document.getElementById("resultados");
    tabela.innerHTML = "";

    fetch('http://localhost:8080/pessoas')
        .then(res => res.json())
        .then(res => {

            res.forEach(item => {

                tabela.innerHTML += `
                    <div class="tabela_linha" onclick="selecionarPessoas(${item.id_pessoa}, '${item.nome}', ${item.cpf}, ${item.telefone}, '${item.email}', '${item.situacao}' )">
                        <span>${item.id_pessoa}</span>
                        <span>${item.nome}</span>
                        <span>${item.cpf}</span>
                        <span>${item.telefone}</span>
                        <span>${item.email}</span>
                        <span>${item.situacao}</span>
                    </div>
                `
            })
        }).catch(() => {

        })
}

function selecionarPessoas(id, nome, cpf, telefone, email, situacao) {

    document.querySelector("#input_id").value = id;
    document.querySelector("#input_nome").value = nome;
    document.querySelector("#input_cpf").value = cpf;
    document.querySelector("#input_telefone").value = telefone
    document.querySelector("#input_email").value = email
    document.querySelector("#input_situacao").value = situacao
}

function postPessoas() {

    const inputId = document.querySelector("#input_id").value;
    const inputNome = document.querySelector("#input_nome").value;
    const inputCpf = document.querySelector("#input_cpf").value;
    const inputTelefone = document.querySelector("#input_telefone").value;
    const inputEmail = document.querySelector("#input_email").value;
    const inputSituacao = document.querySelector("#input_situacao").value;

    if (!inputNome) {
        alert("Preencha nome")
    } else if (!inputCpf) {
        alert("Preencha cpf")
    } else if (!inputTelefone) {
        alert("Preencha telefone")
    } else if (!inputEmail) {
        alert("Preencha email")
    } else {

        fetch('http://localhost:8080/pessoas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "nome": inputNome,
                "cpf": inputCpf,
                "telefone": inputTelefone,
                "email": inputEmail
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res)
                    return;
            })
            .catch((err) => {
                console.log(err)
            })
        alert('Concluido')
        atualizarTabelaPessoas();
    }

}

function putPessoas() {

    const inputId = document.querySelector("#input_id").value;
    const inputNome = document.querySelector("#input_nome").value;
    const inputCpf = document.querySelector("#input_cpf").value;
    const inputTelefone = document.querySelector("#input_telefone").value;
    const inputEmail = document.querySelector("#input_email").value;
    const inputSituacao = document.querySelector("#input_situacao").value;

    if (!inputId) {
        alert("Primeiro selecione algum cadastro existente na tabela!")
    } else if (!inputNome) {
        alert("Preencha nome")
    } else if (!inputCpf) {
        alert("Preencha cpf")
    } else if (!inputTelefone) {
        alert("Preencha telefone")
    } else if (!inputEmail) {
        alert("Preencha email")
    } else if (!inputSituacao) {
        alert("Selecione a situacao")
    } else {

        fetch('http://localhost:8080/pessoas', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_pessoa": inputId,
                "nome": inputNome,
                "cpf": inputCpf,
                "telefone": inputTelefone,
                "email": inputEmail,
                "situacao": inputSituacao,
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res)
                    return
            })
            .catch((err) => {
                console.error(err)
            })
        alert("concluido")
        atualizarTabelaPessoas();
    }
}

function deletePessoas() {
    const inputId = document.querySelector("#input_id").value;

    if (!inputId) {
        alert("selecione uma pessoa na tabela ao lado!")
    } else {
        fetch('http://localhost:8080/pessoas', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id_pessoa": inputId
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res)
                    return
            })
            .catch((err) => {
                console.error(err);
            })
        alert("Deletado")
    }
    atualizarTabelaPessoas();
}

window.addEventListener('load', atualizarTabelaPessoas());
