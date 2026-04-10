const fs = require('fs');
const path = require('path');

const pages = [
  'Commercial', 'Residential', 'Plots', 'Services', 'Insights', 
  'ReadyProperty', 'CompletedProjects', 'Articles', 'ProposeLand', 
  'ProposeProject', 'RegisterVendor', 'RegisterChannelPartner'
];

const template = (name) => {
  // Add spaces before capital letters for the display string
  const displayName = name.replace(/([A-Z])/g, ' $1').trim();
  
  return `import "../styles/page.css";

const ${name} = () => {
  return (
    <div className="generic-page">
      <div className="page-header">
        <h1>${displayName}</h1>
      </div>
      <div className="page-content">
        <p>This section is currently under development. Please check back later for more information about our ${displayName.toLowerCase()}.</p>
      </div>
    </div>
  );
};

export default ${name};
`;
};

const outputDir = path.join('c:\\\\Users\\\\kena\\\\Sangrilla Group\\\\sangrillagroup\\\\src\\\\pages');

pages.forEach(page => {
  const filePath = path.join(outputDir, `${page}.tsx`);
  fs.writeFileSync(filePath, template(page));
  console.log(`Created ${filePath}`);
});
