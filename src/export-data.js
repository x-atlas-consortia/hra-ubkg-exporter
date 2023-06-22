import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { SparqlRunner } from './sparql.js';

/**
 * Exports edges from the HRA for UBKG
 *
 * @param {SparqlRunner} engine the query engine to use
 * @param {string} outputFolder the output folder the edges should go into
 */
export function exportEdges(engine, outputFolder) {
  const results = engine
    .select(
      readFileSync('queries/edges.rq').toString(),
      'text/tab-separated-values'
    )
    .replace(/\tbn\-/g, '\tHRA bn-') // Reformat blank nodes
    .replace(/\t\n/g, '\n') // Remove empty cells (only not blank for has_marker_component)
    .replace(/\"/g, ''); // Remove quotes

  writeFileSync(resolve(outputFolder, 'edges.tsv'), results);
}

/**
 * Grabs the set of all node ids from the edges file
 * @param {string} outputFolder the output folder the edges are in
 * @returns a Set of all the node ids
 */
function getNodesFromEdgesFile(outputFolder) {
  return readFileSync(resolve(outputFolder, 'edges.tsv'))
    .toString()
    .split('\n')
    .reduce((acc, line) => {
      const row = line.split('\t');
      if (row[0] !== 'subject') {
        acc.add(row[0]);
        acc.add(row[2]);
      }
      return acc;
    }, new Set());
}

/**
 * Exports nodes from the HRA for UBKG
 *
 * @param {SparqlRunner} engine the query engine to use
 * @param {string} outputFolder the output folder the nodes and edges should go into
 */
export function exportNodes(engine, outputFolder) {
  // Grab all the node ids from the edges file
  const nodeIds = getNodesFromEdgesFile(outputFolder);

  const labeled = new Set(); // Set of all nodes with labels
  let results = engine
    .select(
      readFileSync('queries/nodes.rq').toString(),
      'text/tab-separated-values'
    )
    .replace(/\"/g, '') // Remove quotes
    .split('\n') // Split lines for for filtering
    .filter((line) => {
      // Only keep nodes from our edges file
      const node_id = line.split('\t')[0];
      const goodId = nodeIds.has(node_id) || node_id === 'node_id';
      if (goodId) {
        labeled.add(node_id);
      }
      return goodId;
    })
    .join('\n');

  // Add nodes without a label
  results += [...nodeIds].filter((n) => !labeled.has(n)).join('\n');

  writeFileSync(resolve(outputFolder, 'nodes.tsv'), results);
}
