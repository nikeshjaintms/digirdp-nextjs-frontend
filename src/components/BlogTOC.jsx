"use client";
import React, { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";

export default function BlogTOC({ html }) {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (!html) return;

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const headings = [...temp.querySelectorAll("p strong, h1, h2, h3, h4, h5, h6")]
      .map(tag => tag.innerText.trim())
      .filter(text => {
        // Always include "Conclusion"
        if (/conclusion/i.test(text)) return true;

        // Must start uppercase
        if (!/^[A-Z]/.test(text)) return false;

        // Must contain at least 2 words
        if (text.split(" ").length < 2) return false;

        // Must be at least 10 characters
        if (text.length < 10) return false;

        // Skip sentences ending with a period
        if (text.endsWith(".")) return false;

        return true;
      })
      .map((text, i) => ({
        id: `section-${i}`,
        text,
      }));

    setToc(headings);
  }, [html]);

  let index = -1;

  const getNodeText = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.data;
  if (!node.children) return "";
  return node.children.map(getNodeText).join(" ").trim();
};

const contentWithIDs = parse(html, {
  replace: (node) => {
    if (
      ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.name) ||
      (node.name === "p" && node.children && node.children[0]?.name === "strong")
    ) {
      const textContent = getNodeText(node);

      if (
        /conclusion/i.test(textContent) ||
        (
          /^[A-Z]/.test(textContent) &&
          textContent.split(" ").length >= 2 &&
          textContent.length >= 10 &&
          !textContent.endsWith(".")
        )
      ) {
        index++;

        if (["h1","h2","h3","h4","h5","h6"].includes(node.name)) {
          return React.createElement(
            node.name,
            { id: `section-${index}`, style: { scrollMarginTop: "120px" } },
            domToReact(node.children)
          );
        }

          // For <p><strong>…</strong></p>
          return (
            <p id={`section-${index}`} style={{ scrollMarginTop: "120px" }}>
              {domToReact(node.children)}
            </p>
          );
        }
      }
    },
  });

  return (
  <div className="row">
      
      {/* TOC */}
      <div className="col-lg-12 col-12" 
        style={{
          background: "#ffffff",
          border: "1px solid #cd99ff",
          borderRadius: "10px",
          padding: "22px",
          marginBottom: "20px",
          boxShadow: "1px 1px 5px #925fc375",
          position: "sticky",
          top: "120px",
          height: "fit-content"
        }}
      >
        <h3 style={{ borderBottom: "1px solid #cd99ff" }}>Table of Contents</h3>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {toc.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ marginBottom: "10px" }}
            >
              <strong>
                <a href={`#${item.id}`} style={{ color: "#333", textDecoration: "none" }}>
                  {item.text}
                </a>
              </strong>
              <span style={{ fontSize: "30px", opacity: 0.5 }}>&#8250;</span>
            </li>
          ))}
        </ul>
      </div>

      {/* BLOG CONTENT */}
      <div className="col-lg-12 col-md-7 col-12">
        {contentWithIDs}
      </div>

  </div>
);
}
