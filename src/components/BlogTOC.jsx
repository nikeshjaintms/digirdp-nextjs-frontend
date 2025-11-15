// "use client";
// import { useEffect, useState } from "react";
// import parse from "html-react-parser";

// export default function BlogTOC({ html }) {
//   const [toc, setToc] = useState([]);

//   useEffect(() => {
//     if (!html) return;

//     const temp = document.createElement("div");
//     temp.innerHTML = html;

//     const strongTags = temp.querySelectorAll("p strong");

//     const items = [...strongTags].map((tag, i) => ({
//       id: `section-${i}`,
//       text: tag.innerText,
//     }));

//     setToc(items);
//   }, [html]);

//   // Add IDs so TOC can scroll to them
//   const parsedContent = () => {
//     let index = -1;

//     return parse(html, {
//       replace: (node) => {
//         if (node.name === "strong" && node.parent?.name === "p") {
//           index++;
//           node.parent.attribs = {
//             ...node.parent.attribs,
//             id: `section-${index}`,
//             style: "scroll-margin-top: 120px;",
//           };
//         }
//       },
//     });
//   };

//   return (
//     <div style={{ display: "flex", gap: "30px" }}>
//       {/* LEFT: TOC */}
//       <aside style={{ width: "28%", position: "sticky", top: "120px", height: "max-content" }}>
//         <h4>Table of Contents</h4>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {toc.map((item) => (
//             <li key={item.id} style={{ marginBottom: "8px" }}>
//               <a href={`#${item.id}`} style={{ textDecoration: "none", color: "#333" }}>
//                 {item.text}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* RIGHT: Blog Content */}
//       <div style={{ width: "72%" }}>
//         {parsedContent()}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";

export default function BlogTOC({ html }) {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (!html) return;

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const headings = temp.querySelectorAll("p strong");

    const items = [...headings].map((tag, i) => ({
      id: `section-${i}`,
      text: tag.innerText,
    }));

    setToc(items);
  }, [html]);

  let index = -1;

  // PARSE AND ADD IDS PROPERLY
  const contentWithIDs = parse(html, {
    replace: (node) => {
      if (
        node.name === "p" &&
        node.children &&
        node.children[0]?.name === "strong"
      ) {
        index++;

        return (
          <p id={`section-${index}`} style={{ scrollMarginTop: "120px" }}>
            {domToReact(node.children)}
          </p>
        );
      }
    },
  });

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      {/* LEFT: TABLE OF CONTENTS */}
      <aside style={{ width: "28%", position: "sticky", top: "120px" }}>
        <h3>Table of Contents</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {toc.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              <a
                href={`#${item.id}`}
                style={{ color: "#333", textDecoration: "none" }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* RIGHT: BLOG CONTENT WITH IDs */}
      <div style={{ width: "72%" }}>{contentWithIDs}</div>
    </div>
  );
}
