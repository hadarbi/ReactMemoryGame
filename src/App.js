import './App.css';
import Header from './components/Header/Header';
import NameInput from './components/NameInput/NameInput';
import Menu from './components/Menu/Menu';
import Setting from './components/Setting/Setting';
import BackButton from './components/BackButton/BackButton';
import Game from './components/Game/Game';
import Rank from './components/Rank/Rank';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [settings, setSettings] = useState({ rows: 4, columns: 4, delay: 1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScoresOpen, setIsScoresOpen] = useState(false);
  const [ranks, setRanks] = useState({});
  const [errors, setErrors] = useState({});


  const activeErrors = Object.values(errors).filter(val => !!val);
  return (
    <div>
      <Header />

      {!isPlaying && !isScoresOpen && (
        <>
          <NameInput name={name} setName={setName} setErrors={setErrors} />
          < Menu setIsPlaying={!activeErrors.length ? setIsPlaying : () => { }} setIsSettingsOpen={setIsSettingsOpen} setIsScoresOpen={setIsScoresOpen} />
        </>
      )}

      {isPlaying && <Game ranks={ranks} setRanks={setRanks} name={name} setIsPlaying={setIsPlaying} settings={settings} />}
      {isSettingsOpen && <Setting settings={settings} setSettings={setSettings} setErrors={setErrors} />}
      {isScoresOpen && (
        <div className="text-center">
          <Rank ranks={ranks} />
          <BackButton onClick={() => setIsScoresOpen(false)} />
        </div>
      )}
      {
        (!isPlaying && !isScoresOpen && activeErrors.length > 0) && <div className='container alert alert-danger text-center mt-3  w-50'>
          {activeErrors.map(error => (
            <div>{error}</div>
          ))}
        </div>
      }

    </div>

  );
}

export default App;
