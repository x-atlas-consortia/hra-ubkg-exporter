# HRA UBKG Exporter

A CLI for exporting a subset of the [HRA](https://humanatlas.io) Knowledge Graph to [UBKG format](https://ubkg.docs.xconsortia.org/formats/#ubkg-edgenode-format).

## Quick Start

Once installing Node.js v18+ with NPM, you can run

```npx github:x-atlas-consortia/hra-ubkg-exporter --help```

to run the code without checking out the code manually with github.

## Steps to install the software

### Prerequisites

- [ ] Node.js v18+ (for native fetch support)

### 1. Clone the repo

```bash
$ git clone https://github.com/x-atlas-consortia/hra-ubkg-exporter.git
$ cd hra-ubkg-exporter
```

Or check out the same with Visual Studio Code or GitHub Desktop

### 2. Setting up the software

```bash
$ npm ci
```

### 3. Interacting with the software 

The software can be interacted with a terminal. CLI options below:

```bash
Usage: hra-ubkg-exporter [options] <output folder>

Export the HRA to UBKG nodes/edges format.

Options:
  --version <version>  HRA version to export (default: "latest")
  --compress           compress the nodes and edges output
  -h, --help           display help for command
```
