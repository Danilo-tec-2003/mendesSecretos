// script.js

// Lista de participantes
const participants = [
    "Danilo",
    "Rebeca",
    "Yane",
    "Ivanice",
    "Zélia",
    "Denilson",
    "Eliane",
    "Alessandra",
    "Aline",
    "Neide",
    "Dilene",
    "tia neném",
    "Ailson",
    "Eliza",
    "Naninha",
  ];
  
  // Função para embaralhar (randomizar)
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Função principal para gerar o sorteio
  function generateSecretSanta() {
    const givers = [...participants];
    const receivers = [...participants];
  
    // Danilo sempre tira Rebeca
    const daniloIndex = givers.indexOf("Danilo");
    const rebecaIndex = receivers.indexOf("Rebeca");
  
    givers.splice(daniloIndex, 1); // Remove Danilo da lista de quem sorteia
    receivers.splice(rebecaIndex, 1); // Remove Rebeca da lista de quem é sorteado
  
    // Embaralhar os restantes
    shuffle(receivers);
  
    // Inicializar pares com Danilo e Rebeca fixos
    const result = [
      { giver: "Danilo", receiver: "Rebeca" },
    ];
  
    // Atribuir o restante (ninguém tira a si mesmo)
    for (let giver of givers) {
      const validReceivers = receivers.filter((r) => r !== giver);
      const receiver = validReceivers.pop();
      result.push({ giver, receiver });
    }
  
    return result;
  }
  
  // Função para salvar pares no localStorage
  function savePairs(pairs) {
    const secretSantaMap = {};
    pairs.forEach((pair) => {
      // Gerar um ID único para cada participante
      const uniqueId = Math.random().toString(36).substring(2, 10);
      secretSantaMap[uniqueId] = pair.receiver;
  
      // Salvar no localStorage
      localStorage.setItem(`secret_santa_${uniqueId}`, pair.receiver);
    });
  }
  
  // Função para criar links únicos
  function generateLinks(pairs) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h2>Compartilhe os Links</h2><ul>`;
  
    pairs.forEach((pair) => {
      // Gerar um ID único para cada participante
      const uniqueId = Math.random().toString(36).substring(2, 10);
  
      // Salvar no localStorage
      localStorage.setItem(`secret_santa_${uniqueId}`, pair.receiver);
  
      // Mostrar links para o organizador copiar
      resultDiv.innerHTML += `<li>
        Envie este link para <strong>${pair.giver}</strong>: 
        <button onclick="copyLink('${uniqueId}')">Copiar Link</button>
      </li>`;
    });
  
    resultDiv.innerHTML += `</ul>`;
  }
  
  // Função para copiar o link para o clipboard
  function copyLink(id) {
    const link = `${window.location.origin}?id=${id}`;
    navigator.clipboard.writeText(link);
    alert("Link copiado: " + link);
  }
  
  // Função para processar o sorteio
  function displayResults() {
    const pairs = generateSecretSanta();
    generateLinks(pairs);
  }
  
  // Revelar amigo secreto ao abrir o link
  function revealSecretSanta() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
  
    if (id) {
      const secretSanta = localStorage.getItem(`secret_santa_${id}`);
      if (secretSanta) {
        document.body.innerHTML = `
          <div class="container">
            <h1>Amigo Secreto</h1>
            <p>Seu amigo secreto é <strong>${secretSanta}</strong>.</p>
          </div>
        `;
      } else {
        document.body.innerHTML = `
          <div class="container">
            <h1>Amigo Secreto</h1>
            <p>Link inválido ou expirado!</p>
          </div>
        `;
      }
    }
  }
  
  // Botão para gerar o sorteio
  document.getElementById("generate").addEventListener("click", displayResults);
  
  // Executa ao carregar a página
  revealSecretSanta();
  