export function aplicarMascaraCPF(valor) {
    return valor.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function aplicarMascaraTelefone(valor) {
    return valor.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

export function formatarInput(e, mascara) {
    e.target.value = mascara(e.target.value);
}