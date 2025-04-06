// Login + redirecionamento
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const accessKey = document.getElementById("password").value.trim();

  try {
    const response = await fetch("https://beckend-rd9q.onrender.com/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ accessKey })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("accessLevel", data.level);
      window.location.href = "home.html";
    } else {
      document.getElementById("error-message").textContent = "Chave inválida.";
    }
  } catch (error) {
    console.error("Erro ao verificar chave:", error);
    document.getElementById("error-message").textContent = "Erro ao conectar ao servidor.";
  }
});

// Exibe conteúdo da home (apenas se for home.html)
document.addEventListener("DOMContentLoaded", () => {
  const docContainer = document.getElementById("doc-container");

  if (docContainer) {
    const accessLevel = parseInt(localStorage.getItem("accessLevel"));

    if (!accessLevel) {
      alert("Acesso negado. Faça login.");
      window.location.href = "index.html";
      return;
    }

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
});
