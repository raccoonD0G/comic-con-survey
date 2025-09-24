#!/usr/bin/env node
// CRA's webpack dev server refuses to start when HOST is defined but empty.
// Default to 0.0.0.0 so developers can still bind to all interfaces.
const host = typeof process.env.HOST === 'string' ? process.env.HOST.trim() : undefined;

if (!host) {
  process.env.HOST = '0.0.0.0';
}

require('react-scripts/scripts/start');
