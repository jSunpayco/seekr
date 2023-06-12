import { expect } from 'vitest';
import {render, screen} from '@testing-library/react';
import Login from '../pages/Login/login';

test('check for anchor element', () =>{
  render(<Login/>);
  let anchor = screen.getByRole('link')
  expect(anchor).to.exist;
})