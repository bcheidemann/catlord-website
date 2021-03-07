import React from 'react';
import './App.css';
import '@south-paw/typeface-minecraft';
import { MenuBar } from './components/menubar/menubar.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { YerAWizardScreen } from './screens/mods/yerawizard/yerawizard.screen';
import { HomeScreen } from './screens/home/home.screen';
import { DownloadsScreen } from './screens/downloads/downloads.screen';
import { FileNotFoundScreen } from './screens/filenotfound/file.not.found.screen';
import { BackgroundComponent } from './components/background/background.component';
import { CatCraftingScreen } from './screens/mods/catcrafting/catcrafting.screen';
import { ChestFramesScreen } from './screens/mods/chestframes/chestframes.screen';
import { MapScreen } from './screens/map/map.screen';
import { LoginScreen } from './screens/login/login.screen';
import { FilesScreen } from './screens/files/files.screen';
import { CreateUserScreen } from './screens/createuser/createuser.screen';

function App() {
  return (
    <Router>
      <div>
        <BackgroundComponent />
        <div style={{ display: 'flex', paddingTop: 70 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
            <div
              style={{
                maxWidth: 1200,
                width: '100%',
                backgroundColor: 'darkgray',
                borderWidth: 3,
                borderTopWidth: 0,
                borderRadius: 10,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                borderStyle: 'solid',
                borderColor: 'black',
                marginBottom: 100,
              }}
            >
              <div style={{ maxWidth: 1200, margin: 'auto' }}>
                <div style={{ position: 'relative' }}>
                  <div className="fade"></div>
                  <img src={require('./assets/panorama/panorama2.png')} alt={'PANORAMA NOT FOUND'} width={'100%'} />
                </div>
              </div>
              <Route exact={true} path="/404">
                <FileNotFoundScreen />
              </Route>
              <Route exact={false} path="/files">
                <FilesScreen />
              </Route>
              <Route exact={true} path={["/", "/map"]}>
                <HomeScreen />
              </Route>
              <Route exact={true} path="/map">
                <MapScreen />
              </Route>
              <Route exact={true} path="/mods/yerawizard">
                <YerAWizardScreen />
              </Route>
              <Route exact={true} path="/mods/catcrafting">
                <CatCraftingScreen />
              </Route>
              <Route exact={true} path="/mods/chestframes">
                <ChestFramesScreen />
              </Route>
              <Route exact={true} path="/downloads">
                <DownloadsScreen />
              </Route>
              <Route exact={true} path="/login">
                <LoginScreen />
              </Route>
              <Route exact={true} path="/createuser">
                <CreateUserScreen />
              </Route>
            </div>
          </div>

        </div>
        <Route path="/" component={MenuBar} >
          {/* <MenuBar title={'CatLord MC'} /> */}
        </Route>
      </div>
    </Router>
  );
}

export default App;
