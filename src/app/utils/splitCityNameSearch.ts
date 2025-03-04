export function splitCityName(cityName: string) {
    if (cityName && cityName.includes(',')) {
      return cityName.split(',');
    } else {
      return [cityName, ''];
    }
  }
export function splitParamsText (text: string) {
    const array = text.split('');
    if (array.includes(',')) {
        const arrayCityString = array.join('');
        const arrayCityName = arrayCityString.split(',')
        return arrayCityName
    } else {
        return [text, ''];
    }
}