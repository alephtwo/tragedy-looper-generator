import * as React from 'react';
import { Dispatch } from 'react';
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { CheatsheetState } from '../../types/CheatsheetState';
import { CheatsheetMessage } from '../../reducers/cheatsheetReducer';
import { TragedySets } from '../../data/TragedySets';
import { Plot } from '../../types/Plot';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { AllCharacters } from '../../data/Characters';
import * as _ from 'lodash';
import { Roles } from '../../data/Roles';
import { CheatsheetCastRow } from '../../types/CheatsheetCastRow';
import { TragedySetInfo } from '../../types/TragedySetInfo';
import { Role } from '../../types/Role';
import { Character } from '../../types/Character';

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
              <TragedySetPicker value={state.tragedySet} dispatch={dispatch} />
              <MainPlotPicker value={state.mainPlot} mainPlots={state.tragedySet.mainPlots} dispatch={dispatch} />
              <SubplotPicker subplots={state.subplots} allSubplots={state.tragedySet.subplots} dispatch={dispatch} />
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6">Cast</Typography>
            </Grid>
            <Grid item xs={6} className={styles.alignRight}>
              <Button variant="contained" color="primary" onClick={() => dispatch({ type: 'add-cast-member' })}>
                Add Cast
              </Button>
            </Grid>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={styles.limitColumnWidth}>Character</TableCell>
                <TableCell className={styles.limitColumnWidth}>Role</TableCell>
                <TableCell className={styles.deleteColumn} />
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
  value: TragedySetInfo;
  dispatch: Dispatch<CheatsheetMessage>;
}

function TragedySetPicker(props: TragedySetPickerProps): JSX.Element {
  const styles = useStyles();
  const handleChange = (tragedySet: TragedySetInfo | null) => {
    console.debug(tragedySet);
    props.dispatch({ type: 'update-tragedy-set', tragedySet: tragedySet });
  };

  return (
    <TableRow>
      <TableCell className={styles.labelColumn} variant="head">
        Tragedy Set
      </TableCell>
      <TableCell>
        <Autocomplete
          value={props.value}
          defaultValue={TragedySets[0]}
          options={[...TragedySets]}
          getOptionLabel={(ts) => ts.title}
          onChange={(_, v) => handleChange(v)}
          renderInput={renderAutocomplete}
        />
      </TableCell>
    </TableRow>
  );
}

interface MainPlotPickerProps {
  value: Plot;
  mainPlots: Array<Plot>;
  dispatch: Dispatch<CheatsheetMessage>;
}
function MainPlotPicker(props: MainPlotPickerProps): JSX.Element {
  const styles = useStyles();
  const handleChange = (plot: Plot | null) => {
    props.dispatch({ type: 'update-main-plot', plot: plot });
  };

  return (
    <TableRow>
      <TableCell className={styles.labelColumn} variant="head">
        Main Plot
      </TableCell>
      <TableCell>
        <Autocomplete
          value={props.value}
          defaultValue={props.mainPlots[0]}
          options={[...props.mainPlots]}
          getOptionLabel={(p) => p.name}
          onChange={(_, v) => handleChange(v)}
          renderInput={renderAutocomplete}
        />
      </TableCell>
    </TableRow>
  );
}

interface SubplotPickerProps {
  subplots: Array<Plot>;
  allSubplots: Array<Plot>;
  dispatch: Dispatch<CheatsheetMessage>;
}
function SubplotPicker(props: SubplotPickerProps): JSX.Element {
  const styles = useStyles();
  const handleChange = (values: Array<Plot>) => {
    props.dispatch({ type: 'update-subplots', subplots: values });
  };
  return (
    <TableRow>
      <TableCell className={styles.labelColumn} variant="head">
        Subplots
      </TableCell>
      <TableCell>
        <Autocomplete
          multiple
          value={props.subplots}
          defaultValue={[]}
          options={[...props.allSubplots]}
          getOptionLabel={(p) => p.name}
          onChange={(_, v) => handleChange(v)}
          renderInput={renderAutocomplete}
        />
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
      <TableCell className={styles.limitColumnWidth}>
        <FullCastWithExceptionsPicker cheatsheetRow={c} dispatch={props.dispatch} />
      </TableCell>
      <TableCell className={styles.limitColumnWidth}>
        <AllRolesWithExceptionsPicker cheatsheetRow={c} dispatch={props.dispatch} />
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.dispatch({ type: 'remove-cast-member', id: c.id })}
        >
          <DeleteIcon />
        </Button>
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

  const handleChange = (character: Character | null) => {
    props.dispatch({
      type: 'update-cast-character',
      id: props.cheatsheetRow.id,
      character: character || undefined,
    });
  };

  return (
    <Autocomplete
      value={props.cheatsheetRow.character || null}
      onChange={(_, v) => handleChange(v)}
      options={cast}
      getOptionLabel={(p) => p.name}
      renderInput={renderAutocomplete}
    />
  );
}

interface AllRolesWithExceptionsPickerProps {
  cheatsheetRow: CheatsheetCastRow;
  dispatch: Dispatch<CheatsheetMessage>;
}
function AllRolesWithExceptionsPicker(props: AllRolesWithExceptionsPickerProps): JSX.Element {
  const roles = [..._.values(Roles)];
  roles.sort((a, b) => a.name.localeCompare(b.name));

  const handleChange = (role: Role | null) => {
    props.dispatch({
      type: 'update-cast-role',
      id: props.cheatsheetRow.id,
      role: role || undefined,
    });
  };

  return (
    <Autocomplete
      value={props.cheatsheetRow.role || null}
      onChange={(_, v) => handleChange(v)}
      options={roles}
      getOptionLabel={(p) => p.name}
      renderInput={renderAutocomplete}
    />
  );
}

const renderAutocomplete = (params: AutocompleteRenderInputParams) => (
  <TextField {...params} size="small" variant="outlined" />
);

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
  alignRight: {
    textAlign: 'right',
  },
}));
