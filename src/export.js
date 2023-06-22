import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import sh from 'shelljs';
import { exportEdges, exportNodes } from './export-data.js';
import { getHraOwlData } from './hra.js';
import { SparqlRunner } from './sparql.js';

/**
 * Main function that exports HRA in UBKG format to an output folder
 *
 * @param {string} outputFolder the folder to store the export in
 * @param {string} version the hra version to use, default is 'latest'
 * @param {boolean} compress whether to compress the nodes and edges afterwards
 */
export async function exportToUbkg(outputFolder, version, compress) {
  if (!existsSync(outputFolder)) {
    sh.mkdir(resolve(outputFolder));
  } else {
    sh.rm(resolve(outputFolder, '*'));
  }
  writeFileSync(resolve(outputFolder, 'VERSION'), version);

  // Grab the HRA and initialize the SPARQL runner
  const owlString = await getHraOwlData(outputFolder, version);
  const engine = new SparqlRunner(owlString);

  exportEdges(engine, outputFolder);
  exportNodes(engine, outputFolder);

  if (compress) {
    sh.exec(`gzip ${outputFolder}/edges.tsv`);
    sh.exec(`gzip ${outputFolder}/nodes.tsv`);
  }
}
