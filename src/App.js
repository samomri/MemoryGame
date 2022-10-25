import Header from './components/Header';
import useAppState from './hooks/useAppState';
import Cards  from './components/Cards';

function App() {
  const { handleClick, handleNewGame, wins, cards, pickOne, pickTwo, counter, start,scoreArray,setWins } = useAppState();


  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} counter={counter} scoreArray={scoreArray} setWins={setWins}/>
      <Cards cards={cards} handleClick={handleClick} pickOne={pickOne} pickTwo={pickTwo} start={start}/>
    </>
  );
}

export default App;