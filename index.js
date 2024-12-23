// CONFIGURAÇÕES começo
const seed = 0.5
const pessoas = [
    "alexandre",
    "leo",
    "felipe",
    "leonardo",
    "livia",
    "andrea",
    "duda",
]

const pessoasAtributos = {
    "alexandre": {nome: "Alexandre", presentes: null},
    "leo": {nome: "Léo Amaro", presentes: null},
    "felipe": {nome: "Felipe", presentes: null},
    "leonardo": {nome: "Leonardo", presentes: null},
    "livia": {nome: "Lívia", presentes: null},
    "andrea": {nome: "Andréa", presentes: ["Camisa"]},
    "duda": {nome: "Duda", presentes: null},
}

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

console.log(pessoas)
const pessoasEmbaralhadas = embaralhar(pessoas)


function obterAmigoSecreto(nome) {
    const indexNome = pessoasEmbaralhadas.indexOf(nome)
    if (indexNome == pessoasEmbaralhadas.length - 1) {
        return pessoasEmbaralhadas[0]
    }
    return pessoasEmbaralhadas[indexNome + 1]
}


function onClickEnviar() {

    console.log({pessoasEmbaralhadas})

    const divTelaInicial = document.getElementById("telainicial")
    const divTelaRoleta = document.getElementById("telaroleta")
    const divPessoaSorteada = document.getElementById("pessoasorteada")
    
    // troca de tela começo 
    divTelaInicial.style.display = 'none'
    divTelaRoleta.style.display = 'block'
    // troca de tela fim

    // pegar nome do fomulário começo
    const formInput = document.getElementById("idnome")
    const nomeLogin = formInput.value // todo: como garantir que a pessoa digitará o nome corretamente?
    const sorteado = obterAmigoSecreto(nomeLogin)
    // pegar nome do fomulário fim

    // OBTER OS NOMES RESTANTES

    let pessoasQueParticiparaoDoSorteio = pessoas.filter(nome => nome != nomeLogin)

    if (pessoasQueParticiparaoDoSorteio[5] != sorteado) {
        const indexSorteado = pessoasQueParticiparaoDoSorteio.indexOf(sorteado)
        pessoasQueParticiparaoDoSorteio[indexSorteado] = pessoasQueParticiparaoDoSorteio[5]
        pessoasQueParticiparaoDoSorteio[5] = sorteado
    }

    // COLOCAR OS NOMES NA DIVS
    for (let i = 0; i < 6; i++) {
        const divPremio = document.querySelector('.premio' + (i+1))
        const pessoa = pessoasQueParticiparaoDoSorteio[i]
        console.log(pessoa)
        divPremio.innerText = pessoasAtributos[pessoa].nome
    }

    // COLOCAR O SORTEADO NA FATIA QUE É SORTEADA

    divPessoaSorteada.innerText = pessoasAtributos[sorteado].nome
    function exibirResultado(){
        const divResultadoSorteio = document.getElementById("resultadosorteio")
        divResultadoSorteio.style.display = "block"
    }

    setTimeout(exibirResultado, 3000)
}

function playOnClick() {

    const divRoleta = document.getElementById("roleta")

    divRoleta.style.animation = "roleta 2s cubic-bezier(0.25, 1, 0.5, 1) forwards";

}


