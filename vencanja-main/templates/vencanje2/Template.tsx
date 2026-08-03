// "use client";

// import { defaultConfig } from "./defaultConfig";
// import { useState } from "react";
// import ConfigRenderer from "@/engine/ConfigRederer";
// import { vencanje2Renderers } from "./renderers";

// const VencanjeTemplatePage = () => {
//   const [config, setConfig] = useState(defaultConfig);

//   const handleSectionChange = (sectionId: string, newData: any) => {
//     setConfig((prev) => ({
//       ...prev,
//       sections: prev.sections.map((s) =>
//         s.id === sectionId ? { ...s, data: newData } : s,
//       ),
//     }));
//   };

//   return (
//     // <div className="min-h-screen selection:bg-wedding-gold/30 selection:text-wedding-dark">
//     <ConfigRenderer
//       config={config}
//       renderers={vencanje2Renderers}
//       mode="editor"
//       onSectionChange={handleSectionChange}
//     />
//     // </div>
//   );
// };

// export default VencanjeTemplatePage;
