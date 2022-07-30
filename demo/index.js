const initialize = () => {
  const output = jQuery('#output');

  Object.keys(filesMap).forEach((groupKey) => {
    const group = filesMap[groupKey];

    const groupElement = jQuery(`
      <div class="group">
        <h2>${group.title}</h2>
      </div>
    `);
    const filesGrid = jQuery(`<div class="grid"></div>`);

    group.files.forEach((file) => {
      filesGrid.append(
        `<img class="icon" src="../${groupKey}/${file}.png" title="${file}">`
      );
    });

    groupElement.append(filesGrid);
    output.append(groupElement);
  });
};

initialize();
