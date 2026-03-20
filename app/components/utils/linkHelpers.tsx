import type { LinkField } from "../../types/sanity";

export const getLinkUrl = (link?: LinkField) => {
  if (!link) return "#";

  switch (link.linkType) {
    case "external":
      const externalUrl = link.external || "#";
      
      // Don't modify anchor links or links that already have a protocol
      if (
        externalUrl === "#" ||
        externalUrl.startsWith("#") ||
        externalUrl.startsWith("http://") ||
        externalUrl.startsWith("https://")
      ) {
        return externalUrl;
      }
      
      // Add https:// to external URLs without a protocol
      return `https://${externalUrl}`;
      
    case "internal":
      if (!link.internal?.slug?.current) return "#";
      return `/${link.internal.slug.current}`;
      
    case "file":
      return link.file?.asset?.url || "#";
      
    default:
      return "#";
  }
};

export const getLinkTarget = (link?: LinkField) => {
  if (!link) return undefined;
  
  // Open in new tab if it's an external link and openInNewTab is true
  if (link.linkType === "external" && link.openInNewTab) {
    return "_blank";
  }
  
  return undefined;
};

export const getLinkRel = (link?: LinkField) => {
  if (!link) return undefined;
  
  // Add security attributes for external links opening in new tab
  if (link.linkType === "external" && link.openInNewTab) {
    return "noopener noreferrer";
  }
  
  return undefined;
};