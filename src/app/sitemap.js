export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/site-map`, {
    next: { revalidate: 3600 },
  });

  const data = await response.json();

  // Static URLs
  const staticUrls = [
    "about",
    "affiliate",
    "career",
    "contact",
    "dedicated-datacenter",
    "faqs",
    "knowledgebase",
    "legal",
    "looking-glass",
    "offer",
    "reseller-program",
    "sales",
  ].map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
  }));

  // Dynamic URLs
  const windowsRdpUrls = data.windowsrdp.map((i) => ({
    url: `${baseUrl}/rdp-plan/${i.url_text}`,
    lastModified: i.updated_at,
  }));

  const dedicatedUrls = data.dedicated.map((i) => ({
    url: `${baseUrl}/dedicated-plan/${i.url_text}`,
    lastModified: i.updated_at,
  }));

  const vpsUrls = data.vps.map((i) => ({
    url: `${baseUrl}/cloud-vps-plan/${i.url_text}`,
    lastModified: i.updated_at,
  }));

  const pvtrdpUrls = data.pvtrdp.map((i) => ({
    url: `${baseUrl}/private-rdp/${i.url_text}`,
    lastModified: i.updated_at,
  }));

  const hostingUrls = data.hosting.map((i) => ({
    url: `${baseUrl}/hosting/${i.url_text}`,
    lastModified: i.updated_at,
  }));

  const blogUrls = data.blogs.map((i) => ({
    url: `${baseUrl}/blog/${i.slug}`,
    lastModified: i.updated_at,
  }));

  return [
    ...staticUrls,
    ...windowsRdpUrls,
    ...dedicatedUrls,
    ...vpsUrls,
    ...pvtrdpUrls,
    ...hostingUrls,
    ...blogUrls,
  ];
}
