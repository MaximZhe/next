'use server'
import { JSDOM } from "jsdom";

export async function fetchTextsFromUrlsBenefits(urls: string[]) {
    const results = [];
  
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Ошибка при загрузке ${url}: ${response.statusText}`);
        }
        const text = await response.text();
  
        const parser = new JSDOM(text); // Передаем текст страницы в JSDOM
        const doc = parser.window.document;
  
        doc.querySelectorAll("div.routeDescription_path-benefits__colum-left__mxt7n").forEach((node) => {
          if (node && node.textContent !== null) {
            const list = node.querySelectorAll("ul.routeDescription_path__list__JOKel");
            if (list && list.length > 0) {
              list.forEach((item: any) => {
                if (item.textContent && item.textContent.trim() !== "") {
                  const text = item.textContent.trim();
                  results.push({ url, text: 'список есть' });
                }
              })
            }
            else {
              results.push({ url, text: 'нет списка' });
            }
          }
  
        });
  
  
  
      } catch (error) {
        console.error(error);
        results.push({ url, text: null, error: error });
      }
    }
  
    return results;
  }