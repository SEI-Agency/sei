fetch("https://beckend-rd9q.onrender.com/validate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ key: "3xTr#9@pLz!Q" })  
})
  .then(res => res.json())
  .then(data => {
    if (data.accessLevel) {
      localStorage.setItem("accessLevel", data.accessLevel);
      window.location.href = "home.html";
    } else {
      alert("Chave inválida");
    }
  })
  .catch(err => console.error("Erro ao validar chave:", err));

// Lógica de exibição dos documentos
const docContainer = document.getElementById("doc-container");
if (docContainer) {
  const accessLevel = parseInt(localStorage.getItem("accessLevel"));

  if (!accessLevel) {
    alert("Acesso negado. Faça login.");
    window.location.href = "index.html";
  }

  // Lista de documentos
  const docs = [
    {
      titulo: "Introdução Agentes",
      descricao: "Resumo detalhado das operações realizadas.",
      link: "https://docs.google.com/document/d/1qsZBZvHSKDamTn8aaQF2PtkyGQlzNsIssEs59Az4-Ak/edit?usp=sharing",
      nivel: 1
    },
    {
      titulo: "Plano Estratégico",
      descricao: "Documento com as estratégias futuras.",
      link: "https://docs.google.com/document/d/EXAMPLE2",
      nivel: 3
    },
    {
      titulo: "Dados Confidenciais",
      descricao: "Informações sensíveis e restritas.",
      link: "https://docs.google.com/document/d/EXAMPLE3",
      nivel: 4
    }
  ];

  docs.forEach(doc => {
    if (accessLevel >= doc.nivel) {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<h3>${doc.titulo}</h3>
                       <p>${doc.descricao}</p>
                       <a href="${doc.link}" target="_blank">Acessar Documento</a>`;
      docContainer.appendChild(div);
    }
  });
}
