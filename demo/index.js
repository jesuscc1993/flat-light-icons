const initialize = () => {
  const output = jQuery('#output');

  Object.keys(filesMap).forEach((groupKey) => {
    const group = filesMap[groupKey];

    const groupElement = jQuery(`
      <div class="group">
        <div class="title">${group.title}</div>
      </div>
    `);
    const groupContent = jQuery(`<div class="content"></div>`);
    const filesGrid = jQuery(`<div class="grid"></div>`);

    group.files.forEach((file) => {
      const path = `../${groupKey}/${file}.png`;
      filesGrid.append(`
        <a href="${path}" target="_blank">
          <img class="icon" src="${path}" title="${file}">
        </a>
      `);
    });

    groupContent.append(filesGrid);
    groupElement.append(groupContent);
    output.append(groupElement);
  });
};

initialize();
