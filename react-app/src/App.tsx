import React, { useEffect } from 'react';
import { SettingsProvider } from './features/settings/SettingsContext';
import { GameProvider } from './features/game/GameContext';
import { useSettings } from './features/settings/useSettings';
import { DeskSurface } from './components/DeskSurface/DeskSurface';
import { StickyNotes } from './components/StickyNotes/StickyNotes';
import { NotebookWrapper } from './components/NotebookWrapper/NotebookWrapper';
import { ScribbleCanvas } from './features/canvas/ScribbleCanvas';
import { BinderSpiral } from './components/BinderSpiral/BinderSpiral';
import { RulesPage } from './components/RulesPage/RulesPage';
import { GamePage } from './components/GamePage/GamePage';
import { audioService } from './services/AudioService';
import './styles/global.css';

const AppContent: React.FC = () => {
  const { state } = useSettings();

  useEffect(() => {
    const body = document.body;

    body.classList.remove('ink-blue', 'ink-black', 'ink-pencil');
    body.classList.add(state.inkTheme);

    body.classList.toggle('grid-lines-active', state.gridActive);
    body.classList.toggle('audio-active', state.audioActive);
    body.classList.toggle('drawing-mode-active', state.drawMode);
  }, [state.inkTheme, state.gridActive, state.audioActive, state.drawMode]);

  useEffect(() => {
    const initAudio = () => {
      audioService.initOnUserGesture();
    };

    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  return (
    <DeskSurface>
      <StickyNotes />
      <NotebookWrapper>
        <ScribbleCanvas />
        <BinderSpiral />
        <RulesPage />
        <GamePage />
      </NotebookWrapper>
    </DeskSurface>
  );
};

export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </SettingsProvider>
  );
};

export default App;
