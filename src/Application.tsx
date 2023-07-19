import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Box, Container, Grid, MenuItem, Select, Tab, Tabs } from '@mui/material';
import { ScriptGenerator } from './scriptGenerator/ScriptGenerator';
import { Script } from './model/Script';
import { ReferenceCards } from './referenceCard/ReferenceCards';
import { Cheatsheet } from './referenceCard/Cheatsheet';
import { TragedySets } from './data/TragedySets';
import { ScriptEditor } from './scriptEditor/ScriptEditor';
import { useTranslation } from 'react-i18next';

const initialScript: Script = new Script({
  tragedySet: TragedySets.basicTragedy,
  mainPlot: TragedySets.basicTragedy.mainPlots[0],
  subplots: [],
  days: 7,
  cast: [],
});

export function Application(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState(0);
  const [script, setScript] = useState(initialScript);
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    document.title = t('scaffolding.title');
  });

  return (
    <Container sx={styles.application}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Tabs
              sx={{ display: 'flex' }}
              value={tab}
              onChange={(_e, v: number) => setTab(v)}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab sx={{ color: 'white' }} label={t('scaffolding.generator')} />
              <Tab sx={{ color: 'white' }} label={t('scaffolding.editor')} />
              <Box sx={{ margin: 1, flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Select
                  sx={{ color: 'white' }}
                  size="small"
                  variant="outlined"
                  value={lang}
                  onChange={(e) => {
                    i18n.changeLanguage(e.target.value).catch((e) => console.error(e));
                    setLang(e.target.value);
                  }}
                >
                  <MenuItem value={'en'}>🇬🇧 EN</MenuItem>
                </Select>
              </Box>
            </Tabs>
          </AppBar>
        </Grid>
        <TabPanel index={0} currentTab={tab}>
          <Grid item xs={12}>
            <ScriptGenerator setScript={setScript} />
          </Grid>
          <Grid item xs={12}>
            <ReferenceCards script={script} />
          </Grid>
          <Grid item xs={12}>
            <Cheatsheet script={script} />
          </Grid>
        </TabPanel>
        <TabPanel index={1} currentTab={tab}>
          <Grid item xs={12}>
            <ScriptEditor setScript={setScript} />
          </Grid>
        </TabPanel>
      </Grid>
    </Container>
  );
}

interface TabProps {
  index: number;
  currentTab: number;
  children: React.ReactNode;
}
function TabPanel(props: TabProps): JSX.Element {
  return props.currentTab === props.index ? <>{props.children}</> : <></>;
}

const styles = {
  application: {
    marginTop: 1,
    marginBottom: 1,
  },
  coolSelect: {},
};
