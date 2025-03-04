import { JSDOM } from "jsdom";
import { resultArrayContent } from "./filterArrayContent";


const splitUrlLink = (text: string | null) => {
  if (text) {
    const textLink = text.split("find/");
    return textLink;
  }
};
export const arrayClassName = ['route__title', 'info-route__subtitle','schedule__title', 'schedule__text','route__content','route-stops__station','route-stops__desc','buy-ticket', 'all-routes__title','all-routes__item','all-routes__link','benefits__title','benefits__wrapper','benefits__item','buy-ticket__title'];
export const arrayKeyName =['route-title', 'info-route-subtitle','schedule-title', 'schedule-text','route-content','route-stops-station','route-stops-desc','buy-ticket', 'all-routes-title','all-routes-item','all-routes-link','benefits-title','benefits-wrapper','benefits-item','buy-ticket-title'];
export function parseDatas(data: string) {
  const parser = new JSDOM(data);
  const doc = parser.window.document;

  const result: any = [];

  doc.querySelectorAll("*").forEach((node) => {
    if (node.textContent && node.textContent.trim() !== "") {
      const text = node.textContent.trim();
      const classList = node.classList;
      const obj: { [key: string]: string | null | undefined | {} } = {};
      for (let i = 0; i < classList.length; i++) {
        for (let i = 0; i < classList.length; i++) {
          const className = classList.item(i);
          if (className) {
            obj[className] = text;
            if(className === 'benefits__wrapper'){
              const  bb = node.innerHTML;
              if(bb){
                obj[className] = bb;
              }
            }
            if (classList.contains("all-routes__link")) {
              const linkClassName = classList.item(i);
              if (linkClassName) {
                const textLinks = node.getAttribute("href");
                const resultTextLink = splitUrlLink(textLinks);
                if (resultTextLink) {
                  obj[linkClassName] = resultTextLink[1];
                }
              }
            }
            if (classList.contains("route__content")) {
              const divText = node.querySelectorAll(".route__text");
              if (divText) {
                const textsArray:
                  | string
                  | { content: string }[]
                  | null
                  | undefined = [];
                divText.forEach((text) => {
                  if (text) {
                    textsArray.push({ content: text.innerHTML });
                  }
                });
                obj[className] = textsArray;
              }
            }
            if (classList.contains("buy-ticket")) {
              const divText = node.querySelectorAll(".buy-ticket__text");
              if (divText) {
                console.log(divText.length);
                const textsArray:
                  | string
                  | { content: string }[]
                  | null
                  | undefined = [];
                divText.forEach((text) => {
                  if (text) {
                    textsArray.push({ content: text.innerHTML });
                  }
                });
                obj[className] = textsArray;
              }
            }
          } else {
            if (className) {
              obj[className] = null;
            }
          }
        }
      }
      result.push(obj);
    }
  });
  const results = resultArrayContent(result, arrayClassName, arrayKeyName);
  doc.querySelectorAll("div.buy-ticket__text").forEach((divNode) => {
    if (divNode && divNode.textContent !== null) {
      const benefitsList = divNode.querySelector("ul.benefits__list");
      const object: { [key: string]: any[] } = { "buy-ticket-text": [] };
      if (benefitsList && benefitsList.textContent !== null) {
        divNode.removeChild(benefitsList);
        object["buy-ticket-text"].push({
          [`buy-ticket-text`]: divNode.textContent.trim(),
        });
        results.push(object);
      } else {
        object["buy-ticket-text"].push({ [`buy-ticket-text`]: null });
        results.push(object);
      }
      const obj: { [key: string]: any[] } = { "benefits__list-ticket": [] };
      if (benefitsList) {
        const benefitsListItem =
          benefitsList.querySelectorAll("li.benefits__item");
        benefitsListItem.forEach((ulNode: any, index: any) => {
          if (ulNode.textContent) {
            const text = ulNode.textContent.trim();
            obj["benefits__list-ticket"].push({ [`li-${index}`]: text });
          } else {
            obj["benefits__list-ticket"].push({ [`li-${index}`]: null });
          }
        });
        results.push(obj);
      } else {
        obj["benefits__list-ticket"].push({ [`li-0`]: null });
        results.push(obj);
      }
    } else {
      const object: { [key: string]: any[] } = {
        "buy-ticket-text": [{ [`buy-ticket-text`]: null }],
      };
      results.push(object);
      const obj: { [key: string]: any[] } = {
        "benefits__list-ticket": [{ [`li-0`]: null }],
      };
      results.push(obj);
    }
  });

  doc.querySelectorAll("div.route__content").forEach((divNode) => {
    if (divNode && divNode.textContent !== null) {
      const benefitsListRoute = divNode.querySelector("ul.benefits__list");
      const obj: { [key: string]: any[] } = {
        "benefits__list-route-content": [],
      };

      if (benefitsListRoute) {
        const benefitsListItem =
          benefitsListRoute.querySelectorAll("li.benefits__item");
        benefitsListItem.forEach((ulNode: any, index: any) => {
          if (ulNode.textContent) {
            const text = ulNode.textContent.trim();
            obj["benefits__list-route-content"].push({ [`li-${index}`]: text });
          } else {
            obj["benefits__list-route-content"].push({ [`li-${index}`]: null });
          }
        });
        results.push(obj);
      } else {
        obj["benefits__list-route-content"].push({ [`li-0`]: null });
        results.push(obj);
      }
    } else {
      const obj: { [key: string]: any[] } = {
        "benefits__list-route-content": [],
      };
      obj["benefits__list-route-content"].push({ [`li-0`]: null });
      results.push(obj);
    }
  });

  doc.querySelectorAll("div.benefits__wrapper").forEach((divNode) => {
    if (divNode && divNode.textContent !== null) {
      const benefitsListRoute = divNode.querySelector("ul.benefits__list");
      const obj: { [key: string]: any[] } = {
        "benefits__list-benefist-content": [],
      };
      const objectLink: { [key: string]: any[] } = {
        "benefits__list-benefist-link": [],
      };
      if (benefitsListRoute) {
        const benefitsListItem =
          benefitsListRoute.querySelectorAll("li.benefits__item");

        benefitsListItem.forEach((ulNode: any, index: any) => {
          const tagLink = ulNode.querySelector("a");
          if (tagLink) {
            const textLinks = tagLink.getAttribute("href");
            const resultTextLink = splitUrlLink(textLinks);
            if (resultTextLink) {
              objectLink["benefits__list-benefist-link"].push({
                [`link-${index}`]: resultTextLink[1],
                [`nameLink-${index}`]: tagLink.textContent.trim(),
              });
            }
          }
          if (ulNode.textContent) {
            if (tagLink) {
              ulNode.removeChild(tagLink);
            }
            const text = ulNode.textContent.trim().replace(/\.$/, "");
            obj["benefits__list-benefist-content"].push({
              [`li-${index}`]: text,
            });
          } else {
            obj["benefits__list-benefist-content"].push({
              [`li-${index}`]: null,
            });
            objectLink["benefits__list-benefist-link"].push({
              [`link-${index}`]: null,
              [`nameLink-${index}`]: null,
            });
          }
        });
        results.push(obj, objectLink);
      } else {
        obj["benefits__list-benefist-content"].push({ [`li-0`]: null });
        objectLink["benefits__list-benefist-link"].push({
          [`link-0`]: null,
          [`nameLink-0`]: null,
        });
        results.push(obj, objectLink);
      }
    } else {
      const obj: { [key: string]: any[] } = {
        "benefits__list-benefist-content": [{ [`li-0`]: null }],
      };
      const objectLink: { [key: string]: any[] } = {
        "benefits__list-benefist-link": [
          { [`link-0`]: null, [`nameLink-0`]: null },
        ],
      };
      results.push(obj, objectLink);
    }
  });
  doc.querySelectorAll(".route-stops__title").forEach((titleItem) => {
    if (titleItem && titleItem.textContent !== null) {
      const titleText = titleItem.textContent.trim();
      const obj: { [key: string]: any[] } = {
        "route-stops-title": [{ [`route-stops__title`]: titleText }],
      };
      results.push(obj);
    } else {
      const obj: { [key: string]: any[] } = {
        "route-stops-title": [{ [`route-stops__title`]: null }],
      };
      results.push(obj);
    }
  });
  return results;
}