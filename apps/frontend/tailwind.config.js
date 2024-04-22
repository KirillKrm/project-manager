import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export const content = [
  join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html,css}'),
  ...createGlobPatternsForDependencies(__dirname),
];
export const theme = {
  extend: {
    colors: {
      primary: '#0c0c0c',
      secondary: '#f9f9f9',
    },
  },
};
export const plugins = [];
