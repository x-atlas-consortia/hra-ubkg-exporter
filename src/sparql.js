import { Store, BlankNode } from 'oxigraph';

/**
 * A class for running sparql queries
 */
export class SparqlRunner {
  /**
   * @param {string} ttlString text/turtle data to load into the SPARQL runner
   */
  constructor(ttlString) {
    this.engine = new Store();
    this.engine.load(ttlString, 'text/turtle');
  }

  /**
   * Run a SPARQL query and return results in the given mimetype format
   *
   * @param {string} query the SPARQL query as a string
   * @param {*} mimetype the format of the returned data (currently only supports text/tab-separated-values)
   * @returns the results of the query in the given format
   */
  select(query, mimetype) {
    if (mimetype === 'text/tab-separated-values') {
      let fields, output;
      for (const datum of this.engine.query(query)) {
        if (!fields) {
          fields = [...datum.keys()];
          output = fields.join('\t') + '\n';
        }
        const row = fields
          .map((f) => {
            const node = datum.get(f);
            if (!node) {
              return undefined;
            } else if (node instanceof BlankNode) {
              return `bn-${node.value}`;
            } else {
              return node.value;
            }
          })
          .filter((v) => v);
        output += row.join('\t') + '\n';
      }
      return output;
    } else {
      throw new Error(`MIME Type: ${mimetype} not supported by this method.`);
    }
  }
}
