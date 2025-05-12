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
      { pergunta: "1. Qual é o principal objetivo da Filosofia da Educação?", respostas: ["A) Ensinar técnicas de ensino modernas.", "B) Avaliar o desempenho escolar dos alunos", "C) Refletir criticamente sobre os fins, meios e valores da educação", "D) Promover apenas o uso de tecnologias educacionais"], correta: 2 },
      { pergunta: "2. A Filosofia da Educação ajuda os educadores a:", respostas: ["A) Compreender e fundamentar teoricamente sua prática pedagógica", "B) Reproduzir conteúdos prontos sem reflexão", "C) Seguir regras fixas de ensino sem questionamentos", "D) Substituir a pedagogia por métodos filosóficos antigos"], correta: 0 },
      { pergunta: "3. Quando um educador questiona “por que educar?”, ele está exercendo:", respostas: ["A) Uma crítica à ciência da educação", "B) Um pensamento religioso", "C) Uma atitude antipedagógica", "D) Uma reflexão filosófica sobre os propósitos da educação"], correta: 3 },
      { pergunta: "4. A Filosofia da Educação pode ser considerada:", respostas: ["A) Um conjunto de leis escolares", "B) Um estudo técnico de aplicação mecânica", "C) Um campo de reflexão que busca o sentido da prática educativa", "D) Uma lista de conteúdos obrigatórios do currículo escolar"], correta: 2 },
      { pergunta: "5. Qual pensador é conhecido por enfatizar a importância da educação como prática da liberdade?", respostas: ["A) Karl Marx", "B) Paulo Freire", "C) Friedrich Nietzsche", "D) Sócrates"], correta: 1 },
      { pergunta: "6. Como a Filosofia se relaciona com a Pedagogia na fundamentação das práticas educativas?", respostas: ["A) Restrita à transmissão de conteúdos imutáveis.", "B) Isolada das práticas e dos contextos sociais", "C) Orienta e revisa os princípios das teorias pedagógicas por meio de uma análise crítica.", "D) Limitada à resgatar legados históricos sem influenciar a prática atual."], correta: 2 }
    ]
  },
  {
    nome: "Fase 2: A origem do pensamento ocidental e a preocupação com o conhecimento",
    perguntas: [
      { pergunta: "1. Onde surgiu o pensamento filosófico ocidental?", respostas: ["A) Na China Antiga", "B) No Egito Antigo", "C) Na Índia Védica", "D) Na Grécia Antiga"], correta: 3 },
      { pergunta: "2. O que diferenciava o pensamento mítico do pensamento filosófico nascente?", respostas: ["A) O uso de linguagem poética", "B) A busca por explicações racionais e argumentativas da realidade", "C) A presença de deuses nas narrativas", "D) A aceitação cega das tradições"], correta: 1 },
      { pergunta: "3. Para Sócrates, o verdadeiro conhecimento nasce:", respostas: ["A) Da leitura dos poetas antigos", "B) Do reconhecimento da própria ignorância e do diálogo", "C) Da experiência sensível", "D) Da observação dos astros"], correta: 1 },
      { pergunta: "4. Qual termo designa o princípio ou “substância primordial” que os pré-socráticos buscavam identificar como a origem de tudo?", respostas: ["A) Epistêmê", "B) Logos.", "C) Arché.", "D) Mythos."], correta: 2 },
      { pergunta: "5. Platão defendia que o conhecimento verdadeiro era:", respostas: ["A) Baseado nos sentidos", "B) Resultante da prática política", "C) Obtido por meio da opinião comum (Doxa)", "D) Proveniente do mundo das ideias, acessível pela razão"], correta: 3 },
      { pergunta: "6. Qual abordagem a filosofia da educação defende para transformar o processo formativo?", respostas: ["A) Reproduzir conteúdos pré-estabelecidos sem estimular o questionamento.", "B) Incentivar a passividade e a aceitação do conhecimento sem crítica.", "C) Fomentar uma visão crítica que possibilita a transformação do indivíduo e, por consequência, da sociedade.", "D) Priorizar meramente os aspectos técnicos e práticos da aprendizagem."], correta: 2 }
    ]
  },
  {
    nome: "Fase 3: A contribuição de Sócrates e Platão para a Educação",
    perguntas: [
      { pergunta: "1. O que é a maiêutica?", respostas: ["A) Método socrático de perguntas", "B) Um sistema rígido de ensino", "C) Uma forma de imposição de conhecimento", "D) Uma técnica matemática"], correta: 0 },
      { pergunta: "2. A maiêutica socrática consistia em:", respostas: ["A) Transmitir o saber como uma verdade absoluta", "B) Questionar o aluno até que ele 'desse à luz' as suas próprias ideias", "C) Ensinar através de castigos e recompensas", "D) Decorar fórmulas filosóficas"], correta: 1 },
      { pergunta: "3. Qual era a visão de Platão sobre a educação?", respostas: ["A) Comerciantes bem-sucedidos", "B) Líderes religiosos", "C) Filósofos, por buscarem a verdade e a justiça", "D) Guerreiros treinados desde a infância"], correta: 2 },
      { pergunta: "4. Na obra: A República, Platão defende que a educação deve:", respostas: ["A) Guiar a alma em direção à verdade e ao bem", "B) Preparar indivíduos apenas para o mercado de trabalho", "C) Formar cidadãos obedientes ao Estado", "D) Ser livre e sem qualquer orientação ética"], correta: 0 },
      { pergunta: "5. Qual é o papel do educador, segundo a visão filosófica inspirada em Sócrates e Platão?", respostas: ["A) Conduzir o aluno no caminho do autoconhecimento e da verdade", "B) Atuar como autoridade absoluta e indiscutível", "C) Depositar conhecimento no aluno", "D) Reforçar a tradição sem questionamentos"], correta: 0 },
      { pergunta: "6.Qual a crítica de Sócrates ao modelo educacional dos sofistas em Atenas?", respostas: ["A) Eles valorizavam a razão acima de tudo", "B) Ensinavam a buscar a verdade com honestidade", "C) Cobravam para ensinar retórica sem compromisso com a verdade", "D) Eram seguidores de Platão e suas ideias políticas"], correta: 2 }
    ]
  },
  {
    nome: "Fase 4: A questão do conhecimento para Aristóteles",
    perguntas: [
      { pergunta: "1. Para Aristóteles, o conhecimento verdadeiro começa com:", respostas: ["A) A revelação divina", "B) A opinião comum (doxa)", "C) A experiência sensível (empírica)", "D) A contemplação do mundo das ideias."], correta: 2 },
      { pergunta: "2. Aristóteles classificava o conhecimento em três tipos principais. Qual das opções representa corretamente esses tipos?", respostas: ["A) Filosofia, Religião e Ciência", "B) Ética, Política e Teologia", "C) Teórico, prático e produtivo (poético)", "D) Científico, espiritual e intuitivo"], correta: 2 },
      { pergunta: "3. Na concepção aristotélica, a ciência (episteme) busca:", respostas: ["A) O prazer e a retórica persuasiva", "B) O conhecimento instável baseado em crenças", "C) A repetição de dogmas", "D) As causas e os princípios universais das coisas"], correta: 3 },
      { pergunta: "4. Qual é o papel da razão no pensamento de Aristóteles sobre o conhecimento?", respostas: ["A) Questionar verdades religiosas", "B) Apenas repetir aquilo que é ensinado", "C) Rejeitar toda experiência sensível como falsa", "D) Organizar e interpretar as experiências para chegar ao saber"], correta: 3 },
      { pergunta: "5. Como Aristóteles via a educação?", respostas: ["A) Como um processo contínuo de aprendizado", "B) Algo fechado e sem mudanças", "C) Uma imposição", "D) Apenas uma tradição"], correta: 0 },
      { pergunta: "6. O que diferencia o conhecimento filosófico do conhecimento empírico em Aristóteles?", respostas: ["A) O filosófico é baseado na fé, o empírico na razão", "B) O empírico é superficial e baseado na experiência; o filosófico busca as causas profundas", "C) O empírico busca o senso comum, enquanto o filosófico é prático", "D) Não há diferença entre eles"], correta: 1 }
    ]
  },
  {
    nome: "ÚLTIMA FASE! PARABÉNS POR TER CHEGADO ATÉ AQUI!🤩 - Fase 5: Questões éticas, educação e formação de professores",
    perguntas: [
      { pergunta: "1. O que é ética na educação?", respostas: ["A) Princípios que guiam as práticas educacionais", "B) Um conjunto de regras fixas", "C) Uma imposição sem questionamento", "D) Algo descartável"], correta: 0 },
      { pergunta: "2. Uma formação ética adequada de professores deve considerar:", respostas: ["A) A reflexão crítica sobre a própria prática e seus impactos na sociedade", "B) O desenvolvimento técnico, sem envolver valores", "C) Apenas os métodos de ensino tradicionais", "D) A neutralidade diante das injustiças sociais"], correta: 0 },
      { pergunta: "3. Qual é um dos maiores desafios éticos enfrentados por professores no ambiente escolar?", respostas: ["A) Lidar com a diversidade e garantir equidade no trato com todos os alunos", "B) Manter-se neutro diante de questões sociais", "C) Controlar o tempo das aulas", "D) Ensinar apenas matérias do currículo"], correta: 0 },
      { pergunta: "4. A relação entre ética e educação implica que o professor deve:", respostas: ["A) Reproduzir opiniões pessoais nas aulas", "B) Impor suas verdades morais", "C) Seguir ordens sem questionar", "D) Estimular o pensamento crítico e o respeito à pluralidade"], correta: 3 },
      { pergunta: "5. Na formação docente, a ética profissional deve ser entendida como:", respostas: ["A) Uma escolha pessoal e opcional", "B) Uma dimensão essencial para o exercício consciente e justo da profissão", "C) Um conjunto de regras fixas e inquestionáveis", "D) Um conteúdo secundário dentro da pedagogia"], correta: 1 },
      { pergunta: "6. De acordo com os conceitos apresentados sobre ética e moral, qual das alternativas abaixo melhor representa a distinção entre ambas?", respostas: ["A) Ética e moral são sinônimos e podem ser usadas indistintamente", "B) A moral refere-se a normas e hábitos, enquanto a ética é uma reflexão sobre essas normas", "C) A ética está baseada exclusivamente em leis e regulamentos impostos pela sociedade.", "D) A moral é sempre inquestionável, pois segue os costumes estabelecidos há séculos."], correta: 1 }
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
