#!/usr/bin/env node
// CRA's webpack dev server refuses to start when HOST is defined but empty.
// Default to 0.0.0.0 so developers can still bind to all interfaces.
const host = typeof process.env.HOST === 'string' ? process.env.HOST.trim() : undefined;

if (!host) {
  process.env.HOST = '0.0.0.0';
}

// When the LAN address can't be resolved (common on Windows laptops with the host
// variable unset), webpack-dev-server hands CRA an `allowedHosts` array containing
// `undefined`, which fails schema validation. Disable the host check so CRA falls
// back to the permissive "all" behaviour it uses when no proxy is configured.
if (!process.env.DANGEROUSLY_DISABLE_HOST_CHECK) {
  process.env.DANGEROUSLY_DISABLE_HOST_CHECK = 'true';
}

require('react-scripts/scripts/start');
