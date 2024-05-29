import './App.css';
import Header from './components/Header/Header';
import NameInput from './components/NameInput/NameInput';
import Menu from './components/Menu/Menu';
import Setting from './components/Setting/Setting';
import BackButton from './components/BackButton/BackButton';
import Game from './components/Game/Game';
import Rank from './components/Rank/Rank';

import { useManageRanks } from './hooks/useManageRanks';
import { useValidation } from './hooks/useValidation';

import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [settings, setSettings] = useState({ rows: 4, columns: 4, delay: 1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScoresOpen, setIsScoresOpen] = useState(false);

  // Custom hooks
  const { ranks, setRanks } = useManageRanks();
  const { activeErrors } = useValidation({ name, settings });


  const shouldShowManu = !isPlaying && !isScoresOpen;
  const hasErrors = activeErrors.length > 0;
  return (
    <div>
      <Header />
      {shouldShowManu && (
        <>
          <NameInput name={name} setName={setName} />
          <Menu setIsPlaying={!activeErrors.length ? setIsPlaying : () => { }} setIsSettingsOpen={setIsSettingsOpen} setIsScoresOpen={setIsScoresOpen} />
        </>
      )}

      {isPlaying && <Game ranks={ranks} setRanks={setRanks} name={name} setIsPlaying={setIsPlaying} settings={settings} />}
      {isSettingsOpen && <Setting settings={settings} setSettings={setSettings} />}
      {isScoresOpen && (
        <div className="text-center">
          <Rank ranks={ranks} />
          <BackButton onClick={() => setIsScoresOpen(false)} />
        </div>
      )}
      {hasErrors && <div className='container alert alert-danger text-center mt-3 w-50'>
        {activeErrors.map(error => (
          <div>{error}</div>
        ))}
      </div>
      }
    </div>
  );
}

export default App;
