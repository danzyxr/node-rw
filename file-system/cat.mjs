#!/usr/bin/env node

import fs from 'fs';

fs.createReadStream(process.argv[2]).pipe(process.stdout);

// Usage:
// chmod +x cat.mjs
// ./cat.mjs target.txt
