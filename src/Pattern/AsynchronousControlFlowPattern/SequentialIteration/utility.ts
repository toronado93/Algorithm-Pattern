import path from "path";
import { URL } from "url";
import slug from "slug";
import cheerio from "cheerio";

function getLinkUrl(currentUrl: string, element: any) {
  const parsedLink = new URL(element.attribs.href || "", currentUrl);
  const currentParsedUrl = new URL(currentUrl);
  if (
    parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname
  ) {
    return null;
  }
  return parsedLink.toString();
}

function urlToFilename(url: string) {
  const parsedUrl = new URL(url);
  const urlPath = parsedUrl.pathname
    .split("/")
    .filter(function (component) {
      return component !== "";
    })
    .map(function (component) {
      return slug(component, { remove: null });
    })
    .join("/");
  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/htm/)) {
    filename += ".html";
  }

  return filename;
}

function getPageLinks(currentUrl: string, body: any) {
  return Array.from(cheerio.load(body)("a"))
    .map(function (element) {
      return getLinkUrl(currentUrl, element);
    })
    .filter(Boolean);
}

export { urlToFilename, getPageLinks };
