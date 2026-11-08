function ItemTarefa({ tarefa, onAlternar, onExcluir }) {
  return (
    <li className={tarefa.concluida ? "item concluida" : "item"}>
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={() => onAlternar(tarefa.id)}
      />
      <span>{tarefa.texto}</span>
      <button className="excluir" onClick={() => onExcluir(tarefa.id)}>
        Excluir
      </button>
    </li>
  );
}

export default ItemTarefa;
