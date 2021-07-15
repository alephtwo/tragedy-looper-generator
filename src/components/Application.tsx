import { Container, AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useState, ReactNode } from 'react';
import { Generator } from './generator/Generator';
import { Cheatsheet } from './cheatsheet/Cheatsheet';

function Application(): JSX.Element {
  const [currentTab, updateCurrentTab] = useState(0);
  const styles = useStyles();

  return (
    <Container>
      <AppBar position="static" className={styles.tabHeader}>
        <Tabs value={currentTab} onChange={(e, v) => updateCurrentTab(v)}>
          <Tab label="Generator" />
          <Tab label="Cheatsheet" />
        </Tabs>
      </AppBar>
      <TabPanel currentTab={currentTab} index={0}>
        <Generator />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        <Cheatsheet />
      </TabPanel>
    </Container>
  );
}

interface TabPanelProps {
  children: ReactNode;
  currentTab: number;
  index: number;
}
function TabPanel(props: TabPanelProps): JSX.Element {
  return (
    <div role="tabpanel" hidden={props.currentTab !== props.index} id={`tabpanel-${props.index}`}>
      {props.children}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  tabHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default Application;
