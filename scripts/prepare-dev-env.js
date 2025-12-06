// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { exit } from 'process';
import { execSync } from 'child_process';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// in GitHub ACtions
if (isGitHubActions) {
  exit(0);
}

// user's development environment
//
console.log('Installing dev environment...');
execSync("lefthook install", { stdio: 'inherit' } );
console.log('Dev environment is ready.');
