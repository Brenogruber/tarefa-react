import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ItemTarefa from "./components/ItemTarefa";

function App() {
  // Lê as tarefas salvas no localStorage (se houver)
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem("tarefas");
    return salvas ? JSON.parse(salvas) : [];
  });
  const [filtro, setFiltro] = useState("todas");

  // Salva no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionar(texto) {
    const nova = { id: Date.now(), texto: texto, concluida: false };
    setTarefas([...tarefas, nova]);
  }

  function alternar(id) {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  }

  function excluir(id) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  // Aplica o filtro escolhido
  const tarefasVisiveis = tarefas.filter((t) => {
    if (filtro === "pendentes") return !t.concluida;
    if (filtro === "concluidas") return t.concluida;
    return true;
  });

  return (
    <div className="app">
      <h1>Minhas Tarefas</h1>
      <p className="contador">Total de tarefas: {tarefas.length}</p>

      <Formulario onAdicionar={adicionar} />

      <div className="filtros">
        <button
          className={filtro === "todas" ? "ativo" : ""}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          className={filtro === "pendentes" ? "ativo" : ""}
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>
        <button
          className={filtro === "concluidas" ? "ativo" : ""}
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
      </div>

      <ul className="lista">
        {tarefasVisiveis.map((t) => (
          <ItemTarefa
            key={t.id}
            tarefa={t}
            onAlternar={alternar}
            onExcluir={excluir}
          />
        ))}
      </ul>

      {tarefasVisiveis.length === 0 && (
        <p className="vazio">Nenhuma tarefa para mostrar.</p>
      )}
    </div>
  );
}

export default App;
