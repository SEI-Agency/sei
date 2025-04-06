const passwords = {
  "3xTr#9@pLz!Q": 1,
  "R7g$1*aY8w%Fn": 2,
  "jK4^s2&mD6#vX": 3,
  "P9q!5@hZ3*bUl": 4,
  "yE6$8&cN1#aTw": 5,
  "zL2^7@fR4*dXk": 6
};

// Lógica do login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const level = passwords[password];
    if (level) {
      localStorage.setItem("accessLevel", level);
      window.location.href = "home.html";
    } else if (password === "") {
    } else {
      alert("Senha incorreta.");
    }
  });
}

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
