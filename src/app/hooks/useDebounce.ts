'use client'
import { useEffect, useState } from "react";
const layoutMap: Record<string, string> = {
  'q': 'й', 'Q': 'Й', 
  'w': 'ц', 'W': 'Ц', 
  'e': 'у', 'E': 'У', 
  'r': 'к', 'R': 'К', 
  't': 'е', 'T': 'Е', 
  'y': 'н', 'Y': 'Н', 
  'u': 'г', 'U': 'Г', 
  'i': 'ш', 'I': 'Ш', 
  'o': 'щ', 'O': 'Щ', 
  'p': 'з', 'P': 'З', 
  'a': 'ф', 'A': 'Ф', 
  's': 'ы', 'S': 'Ы', 
  'd': 'в', 'D': 'В', 
  'f': 'а', 'F': 'А', 
  'g': 'п', 'G': 'П', 
  'h': 'р', 'H': 'Р', 
  'j': 'о', 'J': 'О', 
  'k': 'л', 'K': 'Л', 
  'l': 'д', 'L': 'Д', 
  'z': 'я', 'Z': 'Я', 
  'x': 'ч', 'X': 'Ч', 
  'c': 'с', 'C': 'С', 
  'v': 'м', 'V': 'М', 
  'b': 'и', 'B': 'И', 
  'n': 'т', 'N': 'Т', 
  'm': 'ь', 'M': 'Ь'  
};

function switchLayout(input: string) {
  return input.split('').map(char => layoutMap[char] || char).join('');
}

export function useDebounce (value:string, delay:number = 0) : string {
    const [valueDebounce, setValueDebounce] = useState(value);
    
    useEffect(() => {
      const handler = setTimeout(() => {
        setValueDebounce(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return switchLayout(valueDebounce);
}