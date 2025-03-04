export const parseRouteParams = (url: string) => {
    // Разбиваем URL на части по слешу
    const parts = url.split('/');
  
    // Проверяем, что у нас есть как минимум 4 части (до /find/route/)
    if (parts.length < 4) {
      throw new Error('Invalid URL format');
    }
  
    // Берем последнюю часть (после /find/route/)
    const routeParams = parts[parts.length - 1];
  
    // Разбиваем ее по дефису и возвращаем массив
    return routeParams.split('-');
  };