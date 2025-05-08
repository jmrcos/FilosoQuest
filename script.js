// Variáveis globais
let placar = 0;
let acertos = 0;
let acertosDaFase = 0;  // Novo contador para os acertos na fase atual
let erros = 0;
let tempo = 30; // Tempo para cada pergunta (em segundos)
let intervalo;
let indicePergunta = 0;
let tentativasErradas = 0;
let nomeJogador = "";
let faseAtual = 0;

const fases = [
  {
    nome: "Fase 1: O sentido da Filosofia da Educação",
    perguntas: [
      { pergunta: "Qual elemento, presente em situações de crise, é apontado como o motor para o surgimento da reflexão filosófica?", respostas: ["Um sentimento de desamparo que impede qualquer análise crítica.", "O espanto e o pasmo que despertam a necessidade de questionar a realidade.", "A aceitação imediata dos problemas sem prometer mudanças.", "A tentativa de solucionar as crises por meio de respostas técnicas e imediatas."], correta: 1 },
      { pergunta: "Qual é o fator imprescindível para que a prática educativa se torne mais coerente e transformadora?", respostas: ["A ausência de teorias consolidadas para evitar limitações na ação.", "O espontaneísmo irrestrito, sem mediação de saberes consolidados.", "A incorporação de uma fundamentação teórica atual, alinhada com o contexto social e político.", "A adoção exclusiva de métodos tradicionais, sem questionamento crítico."], correta: 2 },
      { pergunta: "Como se caracteriza a relação entre filosofia e pedagogia, conforme discutido no material?", respostas: ["São áreas que atuam de modo independente, sem diálogo entre si.", "A pedagogia utiliza a filosofia apenas para justificar práticas já estabelecidas.", "Há uma interdependência em que a reflexão filosófica enriquece a prática pedagógica, enquanto a prática inspira questionamentos filosóficos.", "A filosofia se torna irrelevante numa sociedade dominada pela técnica e pela tecnologia."], correta: 2 },
      { pergunta: "Qual das opções melhor resume o papel do filosofar na educação?", respostas: ["Apenas os educadores precisam desenvolver o ato de filosofar, dispensando essa prática aos educandos.", "O filosofar deve ser evitado para manter o foco exclusivo na prática técnica da educação.", "Tanto educadores quanto educandos devem cultivar uma atitude filosófica crítica, que permita compreender e transformar a realidade.", "A atividade de filosofar restringe-se à reprodução de discursos já consolidados, sem promover inovação."], correta: 2 },
      { pergunta: "Por que a filosofia é essencial na educação?", respostas: ["Para desenvolver o pensamento crítico", "Para memorizar conteúdos", "Para evitar debates", "Para seguir regras sem questionar"], correta: 0 },
      { pergunta: "Como a Filosofia se relaciona com a Pedagogia na fundamentação das práticas educativas?", respostas: ["Restrita à transmissão de conteúdos imutáveis.", "Isolada das práticas e dos contextos sociais", "Orienta e revisa os princípios das teorias pedagógicas por meio de uma análise crítica.", "Limitada à resgatar legados históricos sem influenciar a prática atual."], correta: 2 }
    ]
  },
  {
    nome: "Fase 2: A origem do pensamento ocidental e a preocupação com o conhecimento",
    perguntas: [
      { pergunta: "Qual característica conduziu à emergência do pensamento filosófico, diferindo do sistema explicativo mitológico?", respostas: ["A permanência das crenças inabaláveis.", "O afastamento dos ritos e encantamentos.", "A transição do sentimento para a prevalência da razão", "A adoção de respostas empíricas sem questionamentos."], correta: 2 },
      { pergunta: "Qual atitude essencial do ser humano é ressaltada para impulsionar a busca de conhecimento?", respostas: ["A aceitação inquestionada dos valores tradicionais.", "A recusa em se importar com as explicações da realidade.", "O contentamento em reproduzir saberes sem reflexão.", "A constante formulação de perguntas e a inquietude para compreender a existência."], correta: 3 },
      { pergunta: "A função pedagógica da mitologia, consiste principalmente em:", respostas: ["Incentivar a imaginação para a criação de novas verdades.", "Transmitir valores e crenças com o intuito de manter o controle e a ordem social.", "DEstimular o pensamento crítico e a autonomia do indivíduo.", "Desenvolver práticas educativas fundamentadas na razão pura."], correta: 1 },
      { pergunta: "Qual termo designa o princípio ou “substância primordial” que os pré-socráticos buscavam identificar como a origem de tudo?", respostas: ["Epistêmê", "Logos.", "Arché.", "Mythos."], correta: 2 },
      { pergunta: "Como os avanços econômicos, políticos e culturais contribuíram para a emergência de um novo modo de pensar?", respostas: ["Impedindo a circulação de ideias e reforçando tradições imutáveis.", "Criando um ambiente que possibilitou a reflexão crítica e o confronto com explicações mitológicas.", "Limitando a liberdade ao impor respostas baseadas na fé", "Consolidando os mitos como única forma de entendimento da realidade."], correta: 1 },
      { pergunta: "Qual abordagem a filosofia da educação defende para transformar o processo formativo?", respostas: ["Reproduzir conteúdos pré-estabelecidos sem estimular o questionamento.", "Incentivar a passividade e a aceitação do conhecimento sem crítica.", "Fomentar uma visão crítica que possibilita a transformação do indivíduo e, por consequência, da sociedade.", "Priorizar meramente os aspectos técnicos e práticos da aprendizagem."], correta: 2 }
    ]
  },
  {
    nome: "Fase 3: A contribuição de Sócrates e Platão para a Educação",
    perguntas: [
      { pergunta: "O que é a maiêutica?", respostas: ["Método socrático de perguntas", "Um sistema rígido de ensino", "Uma forma de imposição de conhecimento", "Uma técnica matemática"], correta: 0 },
      { pergunta: "O que Platão defendia sobre o conhecimento?", respostas: ["Que ele vem da razão", "Que ele é apenas experiência", "Que só pode ser aprendido pela memorização", "Que deve ser imposto sem questionamento"], correta: 0 },
      { pergunta: "Qual era a visão de Platão sobre a educação?", respostas: ["Transformar os indivíduos por meio do pensamento crítico", "Controlar as pessoas", "Evitar mudanças", "Fortalecer tradições sem reflexão"], correta: 0 },
      { pergunta: "Como Sócrates via o aprendizado?", respostas: ["Uma busca contínua pelo conhecimento", "Algo fechado e imutável", "Uma questão de repetição", "Um processo de aceitação sem reflexão"], correta: 0 },
      { pergunta: "Qual obra de Platão fala sobre o conhecimento?", respostas: ["O Mito da Caverna", "A Política", "A Ética a Nicômaco", "A República"], correta: 0 },
      { pergunta: "O que significa 'Só sei que nada sei'?", respostas: ["Reconhecimento da própria ignorância e busca pelo saber", "Que o conhecimento é inútil", "Que devemos seguir apenas ordens", "Que todos sabem de tudo"], correta: 0 }
    ]
  },
  {
    nome: "Fase 4: A questão do conhecimento para Aristóteles",
    perguntas: [
      { pergunta: "Qual é a base do pensamento de Aristóteles?", respostas: ["Lógica e observação", "Memorização", "Imposição de regras", "Dogmatismo"], correta: 0 },
      { pergunta: "O que Aristóteles considerava essencial para a aprendizagem?", respostas: ["Experiência e observação", "Repetição", "Aceitação sem questionar", "Submissão"], correta: 0 },
      { pergunta: "O que Aristóteles defendia como conhecimento verdadeiro?", respostas: ["A combinação entre razão e experiência", "Apenas experiência", "Apenas memorização", "Que não há verdade absoluta"], correta: 0 },
      { pergunta: "O que é lógica aristotélica?", respostas: ["Um método de raciocínio estruturado", "Uma forma de ensino autoritário", "Um método sem análise crítica", "Uma regra fixa"], correta: 0 },
      { pergunta: "Como Aristóteles via a educação?", respostas: ["Como um processo contínuo de aprendizado", "Algo fechado e sem mudanças", "Uma imposição", "Apenas uma tradição"], correta: 0 },
      { pergunta: "O que Aristóteles escreveu sobre ética?", respostas: ["A Ética a Nicômaco", "A República", "O Príncipe", "O Leviatã"], correta: 0 }
    ]
  },
  {
    nome: "ÚLTIMA FASE! PARABÉNS POR TER CHEGADO ATÉ AQUI!🤩 - Fase 5: Questões éticas, educação e formação de professores",
    perguntas: [
      { pergunta: "O que é ética na educação?", respostas: ["Princípios que guiam as práticas educacionais", "Um conjunto de regras fixas", "Uma imposição sem questionamento", "Algo descartável"], correta: 0 },
      { pergunta: "Qual é o papel do professor na ética?", respostas: ["Garantir reflexão e pensamento crítico", "Impor um único modelo", "Evitar discussões", "Controlar os alunos"], correta: 0 },
      { pergunta: "A ética na formação do professor é importante porque...", respostas: ["Promove responsabilidade e autonomia", "Impede mudanças", "Torna o ensino dogmático", "Controla ideologias"], correta: 0 },
      { pergunta: "O que é ensino democrático?", respostas: ["Respeito à diversidade e diálogo", "Imposição de regras", "Memorização como único caminho", "Eliminar debates"], correta: 0 },
      { pergunta: "O que significa liberdade de pensamento?", respostas: ["Capacidade de refletir sem imposições", "Seguir ordens sem questionar", "Evitar reflexões", "Rejeitar todo conhecimento"], correta: 0 },
      { pergunta: "Qual filósofo falou sobre autonomia na educação?", respostas: ["Paulo Freire", "Platão", "Aristóteles", "Descartes"], correta: 0 }
    ]
  }
];

// FUNÇÃO: Iniciar o Quiz
function iniciarQuiz() {
    // Obtém o valor do campo e remove espaços em branco nas extremidades
    let nomeInput = document.getElementById("nomeJogador").value.trim();
    
    // Verifica se o campo está vazio
    if (nomeInput === "") {
      // Exibe uma mensagem de erro (pode ser via alert ou atualizar algum elemento HTML)
      alert("Por favor, insira seu nome para iniciar o quiz!");
      document.getElementById("nomeJogador").focus();
      return; // Interrompe a execução para que o quiz não seja iniciado
    }
    
    // Atribui o nome à variável global
    nomeJogador = nomeInput;
    
    // Oculta a tela de introdução e exibe o container do quiz
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
  
    // Reset das variáveis de controle
    placar = 0;
    acertos = 0;
    acertosDaFase = 0;
    erros = 0;
    tentativasErradas = 0;
    faseAtual = 0;
    indicePergunta = 0;
    
    atualizarTentativas();
    iniciarTemporizador();
    mostrarPergunta();
  }
  

// FUNÇÃO: Iniciar o temporizador para cada pergunta
function iniciarTemporizador() {
  tempo = 30;
  document.getElementById("timer").innerText = "Tempo restante: " + tempo + "s";
  intervalo = setInterval(() => {
    tempo--;
    if (tempo === 7) document.getElementById("somAlerta").play();
    document.getElementById("timer").innerText = "Tempo restante: " + tempo + "s";
    if (tempo === 0) mostrarGameOver();
  }, 1000);
}

// FUNÇÃO: Exibir a pergunta atual e atualizar o título (neste caso, o nome da fase)
function mostrarPergunta() {
  const faseAtualObj = fases[faseAtual];
  // Atualiza o título para exibir apenas o nome da fase atual
  document.getElementById("tituloPrincipal").innerText = faseAtualObj.nome;
  
  const perguntaAtual = faseAtualObj.perguntas[indicePergunta];
  const perguntaArea = document.getElementById("pergunta-area");
  perguntaArea.innerHTML = `<h2>${perguntaAtual.pergunta}</h2>`;
  
  // Exibe as alternativas
  perguntaAtual.respostas.forEach((resposta, i) => {
    const botao = document.createElement("button");
    botao.innerText = resposta;
    botao.onclick = () => verificarResposta(i, botao);
    botao.classList.add("opcao");
    perguntaArea.appendChild(botao);
  });
}

// FUNÇÃO: Verificar resposta selecionada
function verificarResposta(respostaSelecionada, botao) {
  clearInterval(intervalo);
  const faseAtualObj = fases[faseAtual];
  const perguntaAtual = faseAtualObj.perguntas[indicePergunta];
  
  if (respostaSelecionada === perguntaAtual.correta) {
    botao.classList.add("correta");
    acertos++;
    acertosDaFase++;  // Incrementa acertos na fase
    placar++;
    setTimeout(avancarPergunta, 500);
  } else {
    botao.classList.add("errada");
    erros++;
    tentativasErradas++;
    atualizarTentativas();
    if (tentativasErradas >= 3) {
      mostrarGameOver();
      return;
    } else {
      setTimeout(avancarPergunta, 1000);
    }
  }
  document.getElementById("placar").innerText = `Placar: ${acertos} acertos - ${erros} erros`;
}

// FUNÇÃO: Atualizar exibição das tentativas restantes
function atualizarTentativas() {
  const tentativasTexto = ["III", "II", "I", "💀"];
  document.getElementById("tentativas").innerText = tentativasTexto[tentativasErradas];
}

// FUNÇÃO: Avançar para a próxima pergunta ou para a próxima fase
function avancarPergunta() {
    indicePergunta++;
    const faseAtualObj = fases[faseAtual];
    
    if (indicePergunta < faseAtualObj.perguntas.length) {
      iniciarTemporizador();
      mostrarPergunta();
    } else {
      // Fim da fase: definir threshold para aprovação
      let threshold = (faseAtual < fases.length - 1) ? 4 : 3;
      console.log("Acertos nesta fase:", acertosDaFase, "Threshold:", threshold);
      
      if (acertosDaFase < threshold) {
        mostrarGameOver();
        return;
      } else {
        acertosDaFase = 0; // Reseta o contador da fase
        if (faseAtual < fases.length - 1) {
          mostrarTransicao();
        } else {
          mostrarResultado();
        }
      }
    }
  }
  

// FUNÇÃO: Exibir a DIV de transição entre fases dinamicamente
function mostrarTransicao() {
    let divTransicao = document.createElement('div');
    divTransicao.id = 'divTransicao';
  
    // Estilização básica – ajuste conforme desejado
    divTransicao.style.position = 'fixed';
    divTransicao.style.top = '50%';
    divTransicao.style.left = '50%';
    divTransicao.style.transform = 'translate(-50%, -50%)';
    divTransicao.style.backgroundColor = '#f2f2f2';
    divTransicao.style.padding = '20px';
    divTransicao.style.borderRadius = '10px';
    divTransicao.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    divTransicao.style.zIndex = '1000';
    divTransicao.style.textAlign = 'center';
  
    let proximaFase = fases[faseAtual + 1].nome;
    divTransicao.innerHTML = `
      <p>Parabéns, ${nomeJogador}! Você concluiu a fase: <strong>"${fases[faseAtual].nome}"</strong>.</p>
      <p>Prepare-se para a próxima fase: <strong>"${proximaFase}"</strong>.</p>
      <button id="btnContinuar" style="padding:10px 20px; font-size:16px; margin-top:10px; cursor:pointer;">Continuar</button>
    `;
  
    document.body.appendChild(divTransicao);
  
    document.getElementById("btnContinuar").addEventListener("click", () => {
      divTransicao.remove();
      // Aqui, incrementa a fase para avançar para a próxima
      faseAtual++;
      indicePergunta = 0;
      iniciarTemporizador();
      mostrarPergunta();
    });
  }
  
// FUNÇÃO: Exibir o resultado final do Quiz (após a última fase)
function mostrarResultado() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("fim").style.display = "block";
    
    // Restaura o título original do jogo na tela de resultado
    document.getElementById("tituloPrincipal").innerText = "Quiz Filosófico: A Jornada do Conhecimento";
    
    document.getElementById("resultado").innerText = `Você acertou ${acertos} perguntas e errou ${erros}.`;
    
    // Esconde as animações de vitória e derrota antes de definir a mensagem final
    document.getElementById("animacaoVitoria").style.display = "none";
    document.getElementById("animacaoDerrota").style.display = "none";
    
    // Caso o jogador acerte todas as questões (todas 30), exibe uma mensagem especial
    if (acertos === (fases.length * 6)) {
      document.getElementById("mensagemFinal").innerText = `🌟 Incrível, ${nomeJogador}! Você acertou TODAS as questões! Você é um gênio da Filosofia!`;
      document.getElementById("animacaoVitoria").style.display = "block";
      document.getElementById("somVitoria").play();
    } else if (acertos >= ((fases.length - 1) * 4 + 3)) {
      // Para as demais condições de vitória (mínimo 4 acertos nas fases intermediárias e 3 na última)
      document.getElementById("mensagemFinal").innerText = `🎉 Parabéns, ${nomeJogador}! Você dominou o Quiz Filosófico!`;
      document.getElementById("animacaoVitoria").style.display = "block";
      document.getElementById("somVitoria").play();
    } else {
      document.getElementById("mensagemFinal").innerText = `😢 Que pena, ${nomeJogador}. Mas não desista, tente novamente!`;
      document.getElementById("animacaoDerrota").style.display = "block";
      document.getElementById("somDerrota").play();
    }
  }
  

// FUNÇÃO: Exibir a tela de Game Over (se o tempo esgotar ou se os requisitos da fase não forem atendidos)
function mostrarGameOver() {
  clearInterval(intervalo);
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("fim").style.display = "block";
  
  // Restaura o título original do jogo na tela de Game Over
  document.getElementById("tituloPrincipal").innerText = "Quiz Filosófico: A Jornada do Conhecimento";
  
  document.getElementById("mensagemFinal").innerText = `💀 Tempo esgotado ou você não passou na fase, ${nomeJogador}!`;
  document.getElementById("resultado").innerText = `Você acertou ${acertos} perguntas e errou ${erros}.`;
  document.getElementById("animacaoVitoria").style.display = "none";
  document.getElementById("animacaoDerrota").style.display = "block";
  document.getElementById("somDerrota").play();
}

// FUNÇÃO: Reiniciar o Quiz
function reiniciarQuiz() {
  document.getElementById("fim").style.display = "none";
  document.getElementById("intro").style.display = "block";
}
