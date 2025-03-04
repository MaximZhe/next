export function filterArrayContent (array:any[], nameClass:any) {
    const filteredData = array.filter(obj => {
      return Object.keys(obj).some(key => key.startsWith(nameClass));
  });
  return filteredData;
  }
export function resultArrayContent(arrayData: any[], arrayClassNames: string[], arrayKeyNames: string[]) {
    const resultContent: any[] = [];
    arrayClassNames.forEach((item, index) => {
        const content = filterArrayContent(arrayData, item);
        const obj: any = {};
        obj[arrayKeyNames[index]] = content;
        resultContent.push(obj);
    });
    return resultContent;
}