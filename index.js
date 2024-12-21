// CONFIGURAÇÕES começo
const seed = 0.1
const pessoas = [
    "alexandre",
    "leo",
    "felipe",
    "leonardo",
    "livia",
    "andrea",
    "duda",
]

// CONFIGURAÇÕES fim

function createRandom() {
    [a, b, c, d] = [(0.25 * seed * 2 ** 32) >>> 0, (0.5 * seed * 2 ** 32) >>> 0, (0.75 * seed * 2 ** 32) >>> 0, (1 * seed * 2 ** 32) >>> 0]
    return function () {
        let t = b << 9, r = b * 5;
        r = (r << 7 | r >>> 25) * 9;
        c ^= a;
        d ^= b;
        b ^= c;
        a ^= d;
        c ^= t;
        d = d << 11 | d >>> 21;
        return (r >>> 0) / 4294967296;
    }
}
const random = createRandom();

function embaralhar(arr) {
    for (let i = arr.length - 1; i > 0; i = i - 1) {
        const j = Math.floor(random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const pessoasEmbaralhadas = embaralhar(pessoas)

console.log(pessoasEmbaralhadas)


function obterAmigoSecreto(nome) {

    const sorteio = {
        felipe: "alexandre",
        livia: "leo",
        leonardo: "felipe",

    }

    return sorteio[nome]

}


function onClickEnviar() {

    const divTelaInicial = document.getElementById("telainicial")
    const divTelaRoleta = document.getElementById("telaroleta")
    const divPessoaSorteada = document.getElementById("pessoasorteada")

    // troca de tela começo
    divTelaInicial.style.display = 'none'
    divTelaRoleta.style.display = 'block'
    // troca de tela fim

    // pegar nome do fomulário começo
    const formInput = document.getElementById("idnome").value
    const nome = formInput.value // todo: como garantir que a pessoa digitará o nome corretamente?
    // pegar nome do fomulário fim

    // const sorteado = obterAmigoSecreto(nome)

    // divPessoaSorteada.innerText = sorteado


}

function playOnClick() {

    const divRoleta = document.getElementById("roleta")

    divRoleta.style.animation = "roleta 2s cubic-bezier(0.25, 1, 0.5, 1) forwards";

}


