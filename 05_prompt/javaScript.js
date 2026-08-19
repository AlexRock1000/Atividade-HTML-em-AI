/* ========================================
   ESTADO GLOBAL: DADOS ARMAZENADOS
   ======================================== */

/* POR QUE: array global. Aqui vivem todos os currículos. A tela sempre é redesenhada a partir daqui. */
let curriculos = [];

/* POR QUE: contadores para gerar IDs únicos nos campos dinâmicos de experiência e formação. */
let idExperiencia = 0;
let idFormacao = 0;


/* ========================================
   REFERÊNCIAS AOS ELEMENTOS DO DOM
   ======================================== */

/* POR QUE: pegar referências antes evita procurar toda vez que preiso. */
const formulario = document.querySelector("#formulario-curriculo");
const containerExperiencias = document.querySelector("#container-experiencias");
const containerFormacoes = document.querySelector("#container-formacoes");
const botaoAdicionarExperiencia = document.querySelector("#botao-adicionar-experiencia");
const botaoAdicionarFormacao = document.querySelector("#botao-adicionar-formacao");
const botaoEnviar = document.querySelector("#botao-enviar");
const listaCurriculos = document.querySelector("#lista-curriculos");

/* POR QUE: inputs dos dados pessoais. Vou ler .value quando enviar. */
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputTelefone = document.querySelector("#telefone");
const inputNivelExperiencia = document.querySelector("#nivel-experiencia");


/* ========================================
   FUNÇÃO: ADICIONAR CAMPO DE EXPERIÊNCIA
   ======================================== */

function adicionarCampoExperiencia() {
    /* POR QUE: criar um div para agrupar os campos da experiência. */
    const blocoExperiencia = document.createElement("div");
    blocoExperiencia.className = "bloco-dinamico";
    blocoExperiencia.id = "exp-" + idExperiencia;

    /* POR QUE: criar campo para empresa. */
    const grupoEmpresa = document.createElement("div");
    grupoEmpresa.className = "grupo-form";
    
    const labelEmpresa = document.createElement("label");
    labelEmpresa.htmlFor = "empresa-" + idExperiencia;
    labelEmpresa.textContent = "Empresa";
    
    const inputEmpresa = document.createElement("input");
    inputEmpresa.type = "text";
    inputEmpresa.id = "empresa-" + idExperiencia;
    inputEmpresa.placeholder = "Nome da empresa";
    
    grupoEmpresa.appendChild(labelEmpresa);
    grupoEmpresa.appendChild(inputEmpresa);

    /* POR QUE: criar campo para cargo. */
    const grupoCargo = document.createElement("div");
    grupoCargo.className = "grupo-form";
    
    const labelCargo = document.createElement("label");
    labelCargo.htmlFor = "cargo-" + idExperiencia;
    labelCargo.textContent = "Cargo";
    
    const inputCargo = document.createElement("input");
    inputCargo.type = "text";
    inputCargo.id = "cargo-" + idExperiencia;
    inputCargo.placeholder = "Seu cargo";
    
    grupoCargo.appendChild(labelCargo);
    grupoCargo.appendChild(inputCargo);

    /* POR QUE: criar campo para tempo de trabalho. */
    const grupoTempo = document.createElement("div");
    grupoTempo.className = "grupo-form";
    
    const labelTempo = document.createElement("label");
    labelTempo.htmlFor = "tempo-" + idExperiencia;
    labelTempo.textContent = "Tempo de Trabalho";
    
    const inputTempo = document.createElement("input");
    inputTempo.type = "text";
    inputTempo.id = "tempo-" + idExperiencia;
    inputTempo.placeholder = "Ex: 2 anos 6 meses";
    
    grupoTempo.appendChild(labelTempo);
    grupoTempo.appendChild(inputTempo);

    /* POR QUE: botão remover este campo específico. */
    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "botao-remover-campo";
    botaoRemover.textContent = "Remover";
    
    const idExp = idExperiencia;
    botaoRemover.addEventListener("click", function() {
        removerCampoExperiencia(idExp);
    });

    /* POR QUE: appendChild coloca tudo dentro do bloco. */
    blocoExperiencia.appendChild(grupoEmpresa);
    blocoExperiencia.appendChild(grupoCargo);
    blocoExperiencia.appendChild(grupoTempo);
    blocoExperiencia.appendChild(botaoRemover);

    /* POR QUE: appendChild coloca o bloco no container. */
    containerExperiencias.appendChild(blocoExperiencia);

    /* POR QUE: incrementar o ID para o próximo campo ser único. */
    idExperiencia++;
}


/* ========================================
   FUNÇÃO: REMOVER CAMPO DE EXPERIÊNCIA
   ======================================== */

function removerCampoExperiencia(id) {
    /* POR QUE: procurar o elemento com esse ID e remover do DOM. */
    const bloco = document.querySelector("#exp-" + id);
    if (bloco) {
        bloco.remove();
    }
}


/* ========================================
   FUNÇÃO: ADICIONAR CAMPO DE FORMAÇÃO
   ======================================== */

function adicionarCampoFormacao() {
    /* POR QUE: criar um div para agrupar os campos da formação. */
    const blocoFormacao = document.createElement("div");
    blocoFormacao.className = "bloco-dinamico";
    blocoFormacao.id = "form-" + idFormacao;

    /* POR QUE: criar campo para instituição. */
    const grupoInstituicao = document.createElement("div");
    grupoInstituicao.className = "grupo-form";
    
    const labelInstituicao = document.createElement("label");
    labelInstituicao.htmlFor = "instituicao-" + idFormacao;
    labelInstituicao.textContent = "Instituição";
    
    const inputInstituicao = document.createElement("input");
    inputInstituicao.type = "text";
    inputInstituicao.id = "instituicao-" + idFormacao;
    inputInstituicao.placeholder = "Nome da escola/universidade";
    
    grupoInstituicao.appendChild(labelInstituicao);
    grupoInstituicao.appendChild(inputInstituicao);

    /* POR QUE: criar campo para curso. */
    const grupoCurso = document.createElement("div");
    grupoCurso.className = "grupo-form";
    
    const labelCurso = document.createElement("label");
    labelCurso.htmlFor = "curso-" + idFormacao;
    labelCurso.textContent = "Curso";
    
    const inputCurso = document.createElement("input");
    inputCurso.type = "text";
    inputCurso.id = "curso-" + idFormacao;
    inputCurso.placeholder = "Ex: Engenharia de Software";
    
    grupoCurso.appendChild(labelCurso);
    grupoCurso.appendChild(inputCurso);

    /* POR QUE: criar campo para nível de formação. */
    const grupoNivel = document.createElement("div");
    grupoNivel.className = "grupo-form";
    
    const labelNivel = document.createElement("label");
    labelNivel.htmlFor = "nivel-" + idFormacao;
    labelNivel.textContent = "Nível";
    
    const selectNivel = document.createElement("select");
    selectNivel.id = "nivel-" + idFormacao;
    
    const optPadrao = document.createElement("option");
    optPadrao.value = "";
    optPadrao.textContent = "-- Selecione --";
    
    const optEnsinioMedio = document.createElement("option");
    optEnsinioMedio.value = "ensino-medio";
    optEnsinioMedio.textContent = "Ensino Médio";
    
    const optGraduacao = document.createElement("option");
    optGraduacao.value = "graduacao";
    optGraduacao.textContent = "Graduação";
    
    const optPosGraduacao = document.createElement("option");
    optPosGraduacao.value = "pos-graduacao";
    optPosGraduacao.textContent = "Pós-Graduação";
    
    selectNivel.appendChild(optPadrao);
    selectNivel.appendChild(optEnsinioMedio);
    selectNivel.appendChild(optGraduacao);
    selectNivel.appendChild(optPosGraduacao);
    
    grupoNivel.appendChild(labelNivel);
    grupoNivel.appendChild(selectNivel);

    /* POR QUE: criar campo para ano de conclusão. */
    const grupoAno = document.createElement("div");
    grupoAno.className = "grupo-form";
    
    const labelAno = document.createElement("label");
    labelAno.htmlFor = "ano-" + idFormacao;
    labelAno.textContent = "Ano de Conclusão";
    
    const inputAno = document.createElement("input");
    inputAno.type = "number";
    inputAno.id = "ano-" + idFormacao;
    inputAno.placeholder = "2023";
    inputAno.min = "1990";
    inputAno.max = "2030";
    
    grupoAno.appendChild(labelAno);
    grupoAno.appendChild(inputAno);

    /* POR QUE: botão remover este campo específico. */
    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "botao-remover-campo";
    botaoRemover.textContent = "Remover";
    
    const idForm = idFormacao;
    botaoRemover.addEventListener("click", function() {
        removerCampoFormacao(idForm);
    });

    /* POR QUE: appendChild coloca tudo dentro do bloco. */
    blocoFormacao.appendChild(grupoInstituicao);
    blocoFormacao.appendChild(grupoCurso);
    blocoFormacao.appendChild(grupoNivel);
    blocoFormacao.appendChild(grupoAno);
    blocoFormacao.appendChild(botaoRemover);

    /* POR QUE: appendChild coloca o bloco no container. */
    containerFormacoes.appendChild(blocoFormacao);

    /* POR QUE: incrementar o ID para o próximo campo ser único. */
    idFormacao++;
}


/* ========================================
   FUNÇÃO: REMOVER CAMPO DE FORMAÇÃO
   ======================================== */

function removerCampoFormacao(id) {
    /* POR QUE: procurar o elemento com esse ID e remover do DOM. */
    const bloco = document.querySelector("#form-" + id);
    if (bloco) {
        bloco.remove();
    }
}


/* ========================================
   FUNÇÃO: COLETAR EXPERIÊNCIAS DO FORMULÁRIO
   ======================================== */

function coletarExperiencias() {
    /* POR QUE: array vazio para armazenar experiências preenchidas. */
    let experiencias = [];

    /* POR QUE: pegar todos os blocos de experiência que o usuário criou. */
    const blocosExp = containerExperiencias.querySelectorAll(".bloco-dinamico");

    /* POR QUE: percorrer cada bloco. Se não houver blocos, o array fica vazio. */
    for (let bloco of blocosExp) {
        /* POR QUE: dentro de cada bloco, pegar os inputs de empresa, cargo e tempo. */
        const inputsDoBloco = bloco.querySelectorAll("input");
        
        /* POR QUE: inputsDoBloco[0] é empresa, [1] é cargo, [2] é tempo. */
        const empresa = inputsDoBloco[0].value.trim();
        const cargo = inputsDoBloco[1].value.trim();
        const tempo = inputsDoBloco[2].value.trim();

        /* POR QUE: se pelo menos um campo foi preenchido, adicionar ao array. */
        if (empresa !== "" || cargo !== "" || tempo !== "") {
            experiencias.push({
                empresa: empresa,
                cargo: cargo,
                tempo: tempo
            });
        }
    }

    /* POR QUE: retornar o array de experiências preenchidas. */
    return experiencias;
}


/* ========================================
   FUNÇÃO: COLETAR FORMAÇÕES DO FORMULÁRIO
   ======================================== */

function coletarFormacoes() {
    /* POR QUE: array vazio para armazenar formações preenchidas. */
    let formacoes = [];

    /* POR QUE: pegar todos os blocos de formação que o usuário criou. */
    const blocosForm = containerFormacoes.querySelectorAll(".bloco-dinamico");

    /* POR QUE: percorrer cada bloco. Se não houver blocos, o array fica vazio. */
    for (let bloco of blocosForm) {
        /* POR QUE: dentro de cada bloco, pegar os inputs de instituição, curso, nível e ano. */
        const inputsDoBloco = bloco.querySelectorAll("input");
        const selectDoBloco = bloco.querySelector("select");
        
        /* POR QUE: inputsDoBloco[0] é instituição, [1] é curso, [2] é ano. selectDoBloco é nível. */
        const instituicao = inputsDoBloco[0].value.trim();
        const curso = inputsDoBloco[1].value.trim();
        const nivel = selectDoBloco.value;
        const ano = inputsDoBloco[2].value.trim();

        /* POR QUE: se pelo menos um campo foi preenchido, adicionar ao array. */
        if (instituicao !== "" || curso !== "" || nivel !== "" || ano !== "") {
            formacoes.push({
                instituicao: instituicao,
                curso: curso,
                nivel: nivel,
                ano: ano
            });
        }
    }

    /* POR QUE: retornar o array de formações preenchidas. */
    return formacoes;
}


/* ========================================
   FUNÇÃO: ENVIAR CURRÍCULO
   ======================================== */

function enviarCurriculo() {
    /* POR QUE: ler os valores dos dados pessoais. .value sempre vem como texto. */
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const telefone = inputTelefone.value.trim();
    const nivel = inputNivelExperiencia.value;

    /* POR QUE: validação. Se faltar dados pessoais, não deixa enviar. */
    if (nome === "" || email === "" || telefone === "" || nivel === "") {
        alert("Preencha todos os dados pessoais!");
        return;
    }

    /* POR QUE: coletar experiências e formações que o usuário adicionou. */
    const experiencias = coletarExperiencias();
    const formacoes = coletarFormacoes();

    /* POR QUE: criar o objeto currículo com todos os dados. */
    let novoCurriculo = {
        nome: nome,
        email: email,
        telefone: telefone,
        nivel: nivel,
        experiencias: experiencias,
        formacoes: formacoes
    };

    /* POR QUE: push adiciona o novo currículo ao array global. */
    curriculos.push(novoCurriculo);

    /* POR QUE: muda o dado PRIMEIRO. Só depois renderiza. Regra da Aula 11. */
    desenharListaCurriculos();

    /* POR QUE: limpar o formulário para o próximo cadastro. */
    formulario.reset();
    
    /* POR QUE: limpar os campos dinâmicos criados. */
    containerExperiencias.textContent = "";
    containerFormacoes.textContent = "";
    
    /* POR QUE: resetar os contadores de IDs. */
    idExperiencia = 0;
    idFormacao = 0;

    /* POR QUE: feedback visual: avisar que foi cadastrado com sucesso. */
    alert("Currículo cadastrado com sucesso!");
}


/* ========================================
   FUNÇÃO: DESENHAR A LISTA DE CURRÍCULOS
   ======================================== */

function desenharListaCurriculos() {
    /* POR QUE: limpar conteúdo anterior para refazer do zero. Regra: renderizar é apagar tudo e refazer. */
    listaCurriculos.textContent = "";

    /* POR QUE: for...of percorre cada currículo. Se array estiver vazio, não entra no loop. */
    for (let curriculo of curriculos) {
        /* POR QUE: criar um li para cada currículo. É um item da lista. */
        const li = document.createElement("li");
        li.className = "item-curriculo";

        /* POR QUE: criar um div para as informações dos dados pessoais. */
        const divDados = document.createElement("div");
        divDados.className = "secao-curriculo";

        /* POR QUE: montar o texto com nome, email, telefone e nível. */
        const pNome = document.createElement("p");
        pNome.innerHTML = "<strong>Nome:</strong> " + curriculo.nome;
        
        const pEmail = document.createElement("p");
        pEmail.innerHTML = "<strong>E-mail:</strong> " + curriculo.email;
        
        const pTelefone = document.createElement("p");
        pTelefone.innerHTML = "<strong>Telefone:</strong> " + curriculo.telefone;
        
        const pNivel = document.createElement("p");
        pNivel.innerHTML = "<strong>Nível:</strong> " + curriculo.nivel;

        divDados.appendChild(pNome);
        divDados.appendChild(pEmail);
        divDados.appendChild(pTelefone);
        divDados.appendChild(pNivel);

        /* POR QUE: criar uma seção para experiências. */
        const divExperiencias = document.createElement("div");
        divExperiencias.className = "secao-curriculo";

        const h4Exp = document.createElement("h4");
        h4Exp.textContent = "Experiências Profissionais";
        divExperiencias.appendChild(h4Exp);

        /* POR QUE: se há experiências cadastradas, mostrar a lista. */
        if (curriculo.experiencias.length > 0) {
            const ulExp = document.createElement("ul");
            ulExp.style.listStyle = "none";
            ulExp.style.padding = "0";
            ulExp.style.margin = "0";

            /* POR QUE: for...of percorre cada experiência. */
            for (let exp of curriculo.experiencias) {
                const liExp = document.createElement("li");
                liExp.className = "subsecao-item";
                liExp.innerHTML = "<strong>" + exp.cargo + "</strong> em " + exp.empresa + 
                                " (" + exp.tempo + ")";
                ulExp.appendChild(liExp);
            }

            divExperiencias.appendChild(ulExp);
        } else {
            /* POR QUE: se não há experiências, mostrar mensagem. */
            const p = document.createElement("p");
            p.textContent = "Nenhuma experiência cadastrada.";
            p.style.fontSize = "13px";
            p.style.color = "#999";
            divExperiencias.appendChild(p);
        }

        /* POR QUE: criar uma seção para formações. */
        const divFormacoes = document.createElement("div");
        divFormacoes.className = "secao-curriculo";

        const h4Form = document.createElement("h4");
        h4Form.textContent = "Formação Acadêmica";
        divFormacoes.appendChild(h4Form);

        /* POR QUE: se há formações cadastradas, mostrar a lista. */
        if (curriculo.formacoes.length > 0) {
            const ulForm = document.createElement("ul");
            ulForm.style.listStyle = "none";
            ulForm.style.padding = "0";
            ulForm.style.margin = "0";

            /* POR QUE: for...of percorre cada formação. */
            for (let form of curriculo.formacoes) {
                const liForm = document.createElement("li");
                liForm.className = "subsecao-item";
                liForm.innerHTML = "<strong>" + form.curso + "</strong> (" + form.nivel + ") - " + 
                                 form.instituicao + " (" + form.ano + ")";
                ulForm.appendChild(liForm);
            }

            divFormacoes.appendChild(ulForm);
        } else {
            /* POR QUE: se não há formações, mostrar mensagem. */
            const p = document.createElement("p");
            p.textContent = "Nenhuma formação cadastrada.";
            p.style.fontSize = "13px";
            p.style.color = "#999";
            divFormacoes.appendChild(p);
        }

        /* POR QUE: botão remover este currículo específico. */
        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.className = "botao-remover-curriculo";
        botaoRemover.textContent = "Remover Currículo";

        const indiceCurriculo = curriculos.indexOf(curriculo);
        botaoRemover.addEventListener("click", function() {
            removerCurriculo(indiceCurriculo);
        });

        /* POR QUE: appendChild coloca as seções dentro da li. */
        li.appendChild(divDados);
        li.appendChild(divExperiencias);
        li.appendChild(divFormacoes);
        li.appendChild(botaoRemover);

        /* POR QUE: appendChild coloca a li dentro da ul. */
        listaCurriculos.appendChild(li);
    }
}


/* ========================================
   FUNÇÃO: REMOVER CURRÍCULO
   ======================================== */

function removerCurriculo(indice) {
    /* POR QUE: montar um array novo sem o currículo que vamos remover.
       Não pode usar .filter() porque ainda não aprendemos. Usar for com if. */
    let novaLista = [];

    /* POR QUE: for tradicional com índice i. Comparo i com o índice do que vou remover. */
    for (let i = 0; i < curriculos.length; i++) {
        /* POR QUE: if garante que só adiciona se não for o que está sendo removido. */
        if (i !== indice) {
            novaLista.push(curriculos[i]);
        }
    }

    /* POR QUE: substituir o array antigo pelo novo. */
    curriculos = novaLista;

    /* POR QUE: redesenhar. A tela agora mostra a lista atualizada. */
    desenharListaCurriculos();
}


/* ========================================
   EVENT LISTENERS
   ======================================== */

/* POR QUE: botões de adicionar ouvem clique e adicionam novos campos dinâmicos. */
botaoAdicionarExperiencia.addEventListener("click", adicionarCampoExperiencia);
botaoAdicionarFormacao.addEventListener("click", adicionarCampoFormacao);

/* POR QUE: botão enviar ouve clique e valida + adiciona currículo ao array. */
botaoEnviar.addEventListener("click", enviarCurriculo);

/* POR QUE: quando a página carrega, desenha a lista (vazia no início). */
desenharListaCurriculos();
