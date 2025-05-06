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
      { pergunta: "O que é Filosofia da Educação?", respostas: ["Reflexão crítica", "Memorização", "Dogmatismo", "Submissão"], correta: 0 },
      { pergunta: "Qual o papel da Filosofia na educação?", respostas: ["Criar métodos científicos", "Fundamentar o pensamento crítico", "Impor regras", "Eliminar debates"], correta: 1 },
      { pergunta: "O que caracteriza um bom educador?", respostas: ["Dogmatismo", "Flexibilidade e reflexão", "Memorização", "Falta de análise"], correta: 1 },
      { pergunta: "Qual é o objetivo da pedagogia crítica?", respostas: ["Promover reflexão e autonomia", "Repetir padrões tradicionais", "Evitar mudanças", "Fortalecer um sistema rígido"], correta: 0 },
      { pergunta: "Por que a filosofia é essencial na educação?", respostas: ["Para desenvolver o pensamento crítico", "Para memorizar conteúdos", "Para evitar debates", "Para seguir regras sem questionar"], correta: 0 },
      { pergunta: "Como a Filosofia impacta na formação de professores?", respostas: ["Ampliando a visão educacional", "Restringindo abordagens de ensino", "Tornando a educação mais rígida", "Eliminando a criatividade"], correta: 0 }
    ]
  },
  {
    nome: "Fase 2: A origem do pensamento ocidental e a preocupação com o conhecimento",
    perguntas: [
      { pergunta: "Quem foi Sócrates?", respostas: ["Filósofo grego", "Imperador romano", "Matemático", "Poeta"], correta: 0 },
      { pergunta: "Qual filósofo falava sobre o 'mundo das ideias'?", respostas: ["Platão", "Aristóteles", "Sócrates", "Nietzsche"], correta: 0 },
      { pergunta: "Quem criou a lógica formal?", respostas: ["Aristóteles", "Kant", "Descartes", "Hegel"], correta: 0 },
      { pergunta: "Qual a diferença entre empirismo e racionalismo?", respostas: ["Empirismo é baseado na experiência, racionalismo na razão", "Ambos são iguais", "Racionalismo rejeita toda experiência", "Empirismo se baseia exclusivamente na matemática"], correta: 0 },
      { pergunta: "O que é conhecimento segundo os filósofos clássicos?", respostas: ["Uma busca constante pela verdade", "Um conjunto de regras fixas", "Algo definido sem mudanças", "Uma crença imposta pela sociedade"], correta: 0 },
      { pergunta: "Quem introduziu a maiêutica como método?", respostas: ["Sócrates", "Platão", "Aristóteles", "Descartes"], correta: 0 }
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
