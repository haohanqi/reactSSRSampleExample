const staticHtmlTemplate = (initialProps, reactHtml) => `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>React SSR with Initial Props</title>
       <!-- Embed the initial props as JSON in a script tag -->
      <script>
        window.__INITIAL_PROPS__ = ${JSON.stringify(initialProps)};
      </script>
    </head>
    <body>
      <div id="root">${reactHtml}</div>
      <script src="/index.bundle.js" defer></script>
      <script src="/runtime.bundle.js" defer></script>
    </body>
    </html>
`;

module.exports = staticHtmlTemplate;
