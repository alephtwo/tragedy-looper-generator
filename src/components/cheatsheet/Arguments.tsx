import * as React from 'react';
import { Dispatch } from 'react';
import {
  Button,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { CheatsheetState } from '../../types/CheatsheetState';
import { CheatsheetMessage } from '../../reducers/cheatsheetReducer';
import { TragedySets } from '../../data/TragedySets';
import { Plot } from '../../types/Plot';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { AllCharacters } from '../../data/Characters';
import * as _ from 'lodash';
import { Roles } from '../../data/Roles';
import { CheatsheetCastRow } from '../../types/CheatsheetCastRow';

interface CheatsheetArgumentsProps {
  state: CheatsheetState;
  dispatch: Dispatch<CheatsheetMessage>;
}

export function Arguments(props: CheatsheetArgumentsProps): JSX.Element {
  const styles = useStyles();
  const { state, dispatch } = props;

  return (
    <Paper className={styles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Plots</Typography>
          <Table size="small" className={styles.table}>
            <TableBody>
              <TragedySetPicker value={state.tragedySet.id} dispatch={dispatch} />
              <MainPlotPicker value={state.mainPlot.id} mainPlots={state.tragedySet.mainPlots} dispatch={dispatch} />
              <SubplotPicker
                values={state.subplots.map((s) => s.id)}
                subplots={state.tragedySet.subplots}
                dispatch={dispatch}
              />
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Cast</Typography>
          <Button variant="contained" color="primary" fullWidth onClick={() => dispatch({ type: 'add-cast-member' })}>
            Add Cast
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={styles.deleteColumn} />
                <TableCell className={styles.limitColumnWidth}>Name</TableCell>
                <TableCell className={styles.limitColumnWidth}>Role</TableCell>
              </TableRow>
            </TableHead>
            <CastPicker cast={state.cast} dispatch={dispatch} />
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
}

interface TragedySetPickerProps {
  value: string;
  dispatch: Dispatch<CheatsheetMessage>;
}

function TragedySetPicker(props: TragedySetPickerProps): JSX.Element {
  const styles = useStyles();
  const items = [...TragedySets].map((ts) => (
    <MenuItem key={`cs-ts-${ts.id}}`} value={ts.id}>
      {ts.title}
    </MenuItem>
  ));
  const handleChange = (value: string) => {
    props.dispatch({ type: 'update-tragedy-set', id: value });
  };

  return (
    <TableRow>
      <TableCell className={styles.labelColumn} variant="head">
        Tragedy Set
      </TableCell>
      <TableCell>
        <Select
          fullWidth
          variant="outlined"
          value={props.value}
          onChange={(e) => handleChange(e.target.value as string)}
        >
          {items}
        </Select>
      </TableCell>
    </TableRow>
  );
}

interface MainPlotPickerProps {
  value: string;
  mainPlots: Array<Plot>;
  dispatch: Dispatch<CheatsheetMessage>;
}
function MainPlotPicker(props: MainPlotPickerProps): JSX.Element {
  const styles = useStyles();
  const items = [...props.mainPlots].map((mp) => (
    <MenuItem key={`cs-mp-${mp.id}`} value={mp.id}>
      {mp.name}
    </MenuItem>
  ));

  const handleChange = (value: string) => {
    props.dispatch({ type: 'update-main-plot', id: value });
  };

  return (
    <TableRow>
      <TableCell className={styles.labelColumn} variant="head">
        Main Plot
      </TableCell>
      <TableCell>
        <Select
          fullWidth
          variant="outlined"
          value={props.value}
          onChange={(e) => handleChange(e.target.value as string)}
        >
          {items}
        </Select>
      </TableCell>
    </TableRow>
  );
}

interface SubplotPickerProps {
  values: Array<string>;
  subplots: Array<Plot>;
  dispatch: Dispatch<CheatsheetMessage>;
}
function SubplotPicker(props: SubplotPickerProps): JSX.Element {
  const styles = useStyles();
  const items = [...props.subplots].map((sp) => (
    <MenuItem key={`cs-sp-${sp.id}`} value={sp.id}>
      {sp.name}
    </MenuItem>
  ));
  const handleChange = (values: Array<string>) => {
    props.dispatch({ type: 'update-subplots', ids: values });
  };
  return (
    <TableRow>
      <TableCell className={styles.labelColumn} variant="head">
        Subplots
      </TableCell>
      <TableCell>
        <Select
          fullWidth
          multiple
          variant="outlined"
          maxRows={2}
          value={props.values}
          onChange={(e) => handleChange(e.target.value as Array<string>)}
        >
          {items}
        </Select>
      </TableCell>
    </TableRow>
  );
}

interface CastPickerProps {
  cast: Array<CheatsheetCastRow>;
  dispatch: Dispatch<CheatsheetMessage>;
}
function CastPicker(props: CastPickerProps): JSX.Element {
  const styles = useStyles();
  const cast = [...props.cast].map((c) => (
    <TableRow key={c.id}>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.dispatch({ type: 'remove-cast-member', id: c.id })}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
      <TableCell className={styles.limitColumnWidth}>
        <FullCastWithExceptionsPicker cheatsheetRow={c} dispatch={props.dispatch} />
      </TableCell>
      <TableCell className={styles.limitColumnWidth}>
        <AllRolesWithExceptionsPicker cheatsheetRow={c} dispatch={props.dispatch} />
      </TableCell>
    </TableRow>
  ));
  return <TableBody>{cast}</TableBody>;
}

interface FullCastWithExceptionsPickerProps {
  cheatsheetRow: CheatsheetCastRow;
  dispatch: Dispatch<CheatsheetMessage>;
}
function FullCastWithExceptionsPicker(props: FullCastWithExceptionsPickerProps): JSX.Element {
  const cast = [..._.values(AllCharacters)];
  cast.sort((a, b) => a.name.localeCompare(b.name));

  const handleChange = (id: string) => {
    props.dispatch({
      type: 'update-cast-character',
      id: props.cheatsheetRow.id,
      characterId: id,
    });
  };

  const items = [...cast].map((c) => (
    <MenuItem key={`cs-cast-select-${props.cheatsheetRow.id}-${c.id}`} value={c.id}>
      {c.name}
    </MenuItem>
  ));

  return (
    <Select
      variant="outlined"
      fullWidth
      value={props.cheatsheetRow?.character?.id || ''}
      onChange={(e) => handleChange(e.target.value as string)}
    >
      {items}
    </Select>
  );
}

interface AllRolesWithExceptionsPickerProps {
  cheatsheetRow: CheatsheetCastRow;
  dispatch: Dispatch<CheatsheetMessage>;
}
function AllRolesWithExceptionsPicker(props: AllRolesWithExceptionsPickerProps): JSX.Element {
  // Filter out roles that have already been chosen in other rows.
  const roles = [..._.values(Roles)];
  roles.sort((a, b) => a.name.localeCompare(b.name));

  const handleChange = (id: string) => {
    props.dispatch({
      type: 'update-cast-role',
      id: props.cheatsheetRow.id,
      roleId: id,
    });
  };

  const items = [...roles].map((r) => (
    <MenuItem key={`cs-role-select-${props.cheatsheetRow.id}-${r.id}`} value={r.id}>
      {r.name}
    </MenuItem>
  ));

  return (
    <Select
      variant="outlined"
      fullWidth
      value={props.cheatsheetRow?.role?.id || ''}
      onChange={(e) => handleChange(e.target.value as string)}
    >
      {items}
    </Select>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  labelColumn: {
    width: '200px',
  },
  deleteColumn: {
    width: '10%',
  },
  limitColumnWidth: {
    width: '45%',
  },
  table: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
