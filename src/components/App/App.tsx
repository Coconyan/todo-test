import Todos from '../todos/todos';
import './styles/index.scss';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Todos</h1>
      </header>
      <main>
        <Todos />
      </main>
    </div>
  );
}

export default App;
