import React from 'react';
import './App.css';
import '@south-paw/typeface-minecraft';
import { Panorama } from './components/panorama/panorama.component';
import { PageTitle } from './components/pagetitle/page.title.component';
import { MenuButton } from './components/menubutton/menu.button.component';
import { Recipe } from './components/recipe/recipe.component';
import { YerAWizardScreen } from './screens/yerawizard/yerawizard.screen';

function App() {
  return (
    <div>
      <Panorama />
      <PageTitle />
      <MenuButton />
      <div style={{backgroundColor: 'red', display: 'flex'}}>
        <YerAWizardScreen />
      </div>
    </div>
  );
}

export default App;
