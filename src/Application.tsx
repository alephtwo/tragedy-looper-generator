import * as React from 'react';
import { useState } from 'react';
import { AppBar, Container, Grid, makeStyles, Tab, Tabs } from '@material-ui/core';
import { ScriptGenerator } from './generator/ScriptGenerator';
import { Script } from './types/Script';
import { ReferenceCards } from './referenceCard/ReferenceCards';
import { Cheatsheet } from './cheatsheet/Cheatsheet';
import { TragedySets } from './data/TragedySets';
import { ScriptEditor } from './editor/ScriptEditor';

const initialScript: Script = new Script({
  tragedySet: TragedySets.basicTragedy,
  mainPlot: TragedySets.basicTragedy.mainPlots[0],
  subplots: [],
  days: 7,
  cast: [],
});

export function Application(): JSX.Element {
  const styles = useStyles();
  const [tab, setTab] = useState(0);
  const [script, setScript] = useState(initialScript);

  const tabs = (
    <>
      <TabPanel index={0} currentTab={tab}>
        <Grid item xs={12}>
          <ScriptGenerator setScript={setScript} />
        </Grid>
      </TabPanel>
      <TabPanel index={1} currentTab={tab}>
        <Grid item xs={12}>
          <ScriptEditor setScript={setScript} />
        </Grid>
      </TabPanel>
    </>
  );

  return (
    <Container className={styles.application}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <AppBar position="static" className={styles.tabHeader}>
            <Tabs value={tab} onChange={(_e, v) => setTab(v)}>
              <Tab label="Generator" />
              <Tab label="Editor" />
            </Tabs>
          </AppBar>
        </Grid>
        {tabs}
        <Grid item xs={12}>
          <ReferenceCards script={script} />
        </Grid>
        <Grid item xs={12}>
          <Cheatsheet script={script} />
        </Grid>
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

const useStyles = makeStyles((theme) => ({
  application: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  tabHeader: {},
}));
