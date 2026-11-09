import { useState } from "react";

function Formulario({ onAdicionar }) {
  const [texto, setTexto] = useState("");

  function enviar(e) {
    e.preventDefault();
    if (texto.trim() === "") return;
    onAdicionar(texto.trim());
    setTexto("");
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <input
        type="text"
        placeholder="Digite uma tarefa..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default Formulario;
