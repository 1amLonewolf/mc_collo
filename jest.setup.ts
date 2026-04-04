/** @jsx React.createElement */
import '@testing-library/jest-dom';
import React from 'react';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { ...props, alt: props.alt || '' });
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => React.createElement('div', props, children),
      button: ({ children, ...props }: any) => React.createElement('button', props, children),
      p: ({ children, ...props }: any) => React.createElement('p', props, children),
      h2: ({ children, ...props }: any) => React.createElement('h2', props, children),
      h3: ({ children, ...props }: any) => React.createElement('h3', props, children),
      span: ({ children, ...props }: any) => React.createElement('span', props, children),
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

// Suppress console errors during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning:') || args[0].includes('React does not recognize'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
