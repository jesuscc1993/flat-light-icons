const fs = require('fs');
const path = require('path');

const svgDirPath = path.resolve(__dirname, '../SVG');
const outputFilePath = path.join(__dirname, 'files.js');

const getTitle = (directory) => {
  const segments = directory.split('/');
  const label = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);

  return segments.length > 1
    ? `${label} (${segments.slice(1).join(', ')})`
    : label;
};

const getGroups = (directory, relativeDirectory = '') => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && path.extname(entry.name) === '.svg')
    .map((entry) => path.basename(entry.name, '.svg'))
    .sort((left, right) => left.localeCompare(right));

  const groups = files.length ? [[relativeDirectory, files]] : [];

  entries
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name))
    .forEach((entry) => {
      groups.push(
        ...getGroups(
          path.join(directory, entry.name),
          path.posix.join(relativeDirectory, entry.name),
        ),
      );
    });

  return groups;
};

const groups = getGroups(svgDirPath);
const filesMap = Object.fromEntries(
  groups.map(([directory, files]) => [
    directory,
    {
      title: getTitle(directory),
      files,
    },
  ]),
);

fs.writeFileSync(
  outputFilePath,
  `const filesMap = ${JSON.stringify(filesMap, null, 2)};\n`,
);
console.log(
  `Wrote ${groups.length} icon groups to "${path.relative(process.cwd(), outputFilePath)}".`,
);
