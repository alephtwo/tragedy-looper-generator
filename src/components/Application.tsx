import * as React from 'react';
import { useState } from 'react';
import generateTragedy from '../generator/generateTragedy';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Subplot, Tragedy } from '../types/Tragedy.d';

const initialArgs: GeneratorArgs = {
  subplots: 2,
  castSize: 9,
};

const initialTragedy: Tragedy = {
  mainPlot: null,
  subplots: [],
  castMembers: [],
};

function Application() {
  const [tragedy, setTragedy] = useState<Tragedy>(initialTragedy);
  const [args, setArgs] = useState<GeneratorArgs>(initialArgs);

  const generate = () => {
    const tragedy: Tragedy = generateTragedy(args);
    setTragedy(tragedy);
  };

  return (
    <>
      <div>
        <h1>Tragedy Looper Generator</h1>
      </div>
      <div>
        <label>
          Subplots: {args.subplots}
          <input
            type="range"
            min="1"
            max="2"
            value={args.subplots}
            onChange={(e) => setArgs(extend(args, { subplots: +e.target.value }))}
          />
        </label>
      </div>
      <div>
        <label>
          Cast Size: {args.castSize}
          <input
            type="range"
            min="6"
            max="11"
            value={args.castSize}
            onChange={(e) => setArgs(extend(args, { castSize: +e.target.value }))}
          />
        </label>
      </div>
      <div>
        <button onClick={generate}>Generate</button>
      </div>
      <div>
        <TragedyView tragedy={tragedy} />
      </div>
    </>
  );
}

interface TragedyProps {
  tragedy: Tragedy;
}

function TragedyView({ tragedy: tragedy }: TragedyProps) {
  // If there is no main plot, we need to stop.
  if (!tragedy.mainPlot) {
    return <div />;
  }

  // There must be a plot, so let's display it.
  return (
    <div>
      <ol>
        <li>
          <h3>Plots</h3>
          <ul>
            <li>Main Plot: {tragedy.mainPlot}</li>
            <li>
              Subplots:
              <ul>{toList(tragedy.subplots)}</ul>
            </li>
          </ul>
        </li>
        <li>
          <h3>Cast:</h3>
          <ul>{toList(tragedy.castMembers)}</ul>
        </li>
        <li>
          <h3>Roles</h3>
        </li>
        <li>
          <h3>Number of Days</h3>
        </li>
        <li>
          <h3>Incidents and Culprits</h3>
        </li>
        <li>
          <h3>Number of Loops</h3>
        </li>
      </ol>
    </div>
  );
}

function toList(entries: string[]) {
  return wrap(entries).map((e) => <li>{e}</li>);
}

/**
 * Ensure that the input is wrapped in an array.
 * @param j The input
 */
function wrap<T>(j: T | T[]): any[] {
  if (!(j instanceof Array)) {
    return [j];
  }
  return j;
}

function extend(src: GeneratorArgs, extension: object): GeneratorArgs {
  return Object.assign({}, src, extension);
}

export default Application;
