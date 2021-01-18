import * as React from 'react';
import { Tragedy } from '../types/Tragedy';

interface TragedyViewProps {
  tragedy: Tragedy;
}

export function TragedyView({ tragedy: tragedy }: TragedyViewProps): JSX.Element {
  // Assume that no cast means it hasn't been generated yet.
  if (tragedy.cast.length === 0) {
    return <></>;
  }

  return (
    <>
      <div>
        <h2>Main Plot</h2>
        {tragedy.mainPlot.name}
      </div>
      <div>
        <h2>Subplots</h2>
        <ul>
          {tragedy.subplots.map((s) => (
            <li>{s.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Cast</h2>
        <ul>
          {tragedy.cast.map((c) => (
            <li>{c.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
