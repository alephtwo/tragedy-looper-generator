import * as React from 'react';
import { Tragedy } from '../types/Tragedy';

interface TragedyViewProps {
  tragedy: Tragedy;
}

export function TragedyView({ tragedy: tragedy }: TragedyViewProps) {
  // Assume that no cast means it hasn't been generated yet.
  if (tragedy.cast.length === 0) {
    return null;
  }

  return (
    <ul>
      {tragedy.cast.map((c) => (
        <li>{c.name}</li>
      ))}
    </ul>
  );
}
