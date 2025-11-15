"use client";
import { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";

export default function BlogTOC({ html }) {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (!html) return;

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const headings = [...temp.querySelectorAll("p strong")]
      .map(tag => tag.innerText.trim())
      .filter(text => {
        // RULE 1: Must start with uppercase
        if (!/^[A-Z]/.test(text)) return false;

        // RULE 2: Must contain at least 3 words
        if (text.split(" ").length < 1) return false;

        // RULE 3: Must be longer than 25 chars
        if (text.length < 5) return false;

        // RULE 4: Skip lines ending with a period (.)
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

  // PARSE HTML + inject IDs for headings
  const contentWithIDs = parse(html, {
    replace: (node) => {
      if (
        node.name === "p" &&
        node.children &&
        node.children[0]?.name === "strong"
      ) {
        // Identify this paragraph's text
        const textContent = node.children[0]?.children?.[0]?.data?.trim() || "";

        // Apply SAME FILTER here to match TOC
        if (
          /^[A-Z]/.test(textContent) && // starts uppercase
          textContent.split(" ").length >= 1 && // 3+ words
          textContent.length >= 5 && // long enough
          !textContent.endsWith(".") // not ending with period
        ) {
          index++;
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
      {/* LEFT: TABLE OF CONTENT */}
      <aside className="col-lg-4 col-12">
        <h3>Table of Contents</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {toc.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              <strong>
                <a
                  href={`#${item.id}`}
                  style={{ color: "#333", textDecoration: "none" }}
                >
                  {item.text}
                </a>
              </strong>
            </li>
          ))}
        </ul>
      </aside>

      {/* RIGHT: CONTENT WITH IDs */}
      <div className="col-lg-8 col-12">{contentWithIDs}</div>
    </div>
  );
}
