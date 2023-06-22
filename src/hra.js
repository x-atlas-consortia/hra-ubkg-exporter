
/**
 * Get a URL to a given version of the HRA
 *
 * @param {string} version
 * @returns a URL to the HRA download
 */
function getHraOwlUrl(version) {
  if (version === 'latest') {
    return 'https://purl.org/ccf/ccf.owl';
  } else {
    return `https://purl.org/ccf/${version}/ccf.owl`;
  }
}

/**
 * Fetches the HRA from a given url
 *
 * @param {string} url
 * @returns HRA as a string (in rdf/xml format)
 */
function fetchHraOwl(url) {
  return fetch(url, {
    redirect: 'follow',
  }).then((r) => r.text());
}

/**
 * Get a given version of the HRA, store it in the output folder, and return its contents
 *
 * @param {string} version the version of the HRA to fetch
 * @returns the HRA data as a string (in rdf/xml format)
 */
export async function getHraOwlData(version) {
  const owlUrl = getHraOwlUrl(version);
  return fetchHraOwl(owlUrl);
}
