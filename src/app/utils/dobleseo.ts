'use server'
import { JSDOM } from "jsdom";

export async function fetchTextsFromDouble(urls: string[]) {
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
  
        doc.querySelectorAll("div.routeDescription_path-description__content__yJXnb").forEach((node) => {
          if (node && node.textContent !== null) {
            const list = node.querySelectorAll("p.routeDescription_path-description__text__fWTAC");
            if (list && list.length > 1 && list[0] !== null) { // Проверяем, что элементов больше 1
              const firstText = list[0] !== null ? list[0]?.textContent?.trim() : null;
              const secondText = list[1] !== null ? list[1]?.textContent?.trim() : null;
              
              if(secondText !== null && secondText !==undefined) {
                if (firstText?.includes(secondText))  {
                  results.push({ url, text: 'double text' }); // Добавляем в массив, если совпадают
                }
              }
            } else {
              results.push({ url, text: 'no text' }); // Если элементов меньше 2
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