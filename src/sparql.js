import { Store } from 'oxigraph';

/**
 * A class for running sparql queries
 */
export class SparqlRunner {
  /**
   * @param {string} owlString rdf/xml data to load into the SPARQL runner 
   */
  constructor(owlString) {
    this.engine = new Store();
    this.engine.load(owlString, 'application/rdf+xml');
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
          .map((f) => datum.get(f)?.value ?? undefined)
          .filter((v) => v);
        output += row.join('\t') + '\n';
      }
      return output;
    } else {
      throw new Error(`MIME Type: ${mimetype} not supported by this method.`);
    }
  }
}
