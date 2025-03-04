
import { arrayClassNameAction, arrayKeyNameAction } from "../constant/arrayClassAction";
import { resultArrayContent } from "./filterArrayContent";
import { JSDOM } from 'jsdom';

const splitUrlLink = (text:string | null) => {
    if(text){
        const textLink = text.split('find/')
        return textLink
    }
    
}
export function parserActionData(data: string) {
    const parser = new JSDOM(data);;
    const doc = parser.window.document;

    const result: any = [];

    doc.querySelectorAll("*").forEach((node) => {
        if (node.textContent && node.textContent.trim() !== "") {
          const text = node.textContent.trim();
          const classList = node.classList;
          const obj: { [key: string]: string | null | undefined } = {};
    
          // Перебираем классы только один раз
          classList.forEach((className) => {
            obj[className] = text;
          });
    
          result.push(obj);
        }
      });

    const results = resultArrayContent(result, arrayClassNameAction, arrayKeyNameAction);
    doc.querySelectorAll("img").forEach((imgNode) => {
        if (imgNode) {
          const obj: { [key: string]: any[] } = { "sales-single-img": [] };
    
          // Получаем значение атрибутов 'src' и 'alt'
          const imgSrc = imgNode.getAttribute("src");
          const imgAlt = imgNode.getAttribute("alt");
    
          if (imgSrc !== 'путь_картинки') {
            // Добавляем объект с атрибутами в массив
            obj["sales-single-img"].push({ imgSrc: imgSrc, imgAlt: imgAlt });
            results.push(obj);
          } else {
            obj["sales-single-img"].push({ imgSrc: "", imgAlt: "" });
            results.push(obj);
          }
        }
    
        // Добавляем объект в результат
      });
    return results;
}