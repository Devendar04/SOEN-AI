export const basePrompt = `
<SOENArtifact id="project-import" title="Project Files">
  <SOENAction type="file" filePath="index.js">
    // run \`node index.js\` in the terminal

    console.log(\`Hello Node.js v\${process.versions.node}!\`);
  </SOENAction>
  <SOENAction type="file" filePath="package.json">
    {
      "name": "node-starter",
      "private": true,
      "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
      }
    }
  </SOENAction>
</SOENArtifact>
`;
