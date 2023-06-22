#!/usr/bin/env node

import { Command } from 'commander';
import { exportToUbkg } from './export.js';

const program = new Command();

program
  .description('Export the HRA to UBKG nodes/edges format.')
  .option('--version <version>', 'HRA version to export', 'latest')
  .option('--compress', 'compress the nodes and edges output')
  .argument('<output folder>')
  .action((outputFolder, { version, compress }) => {
    exportToUbkg(outputFolder, version, compress);
  });

program.parse(process.argv);
