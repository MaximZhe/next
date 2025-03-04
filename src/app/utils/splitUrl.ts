export function parseUrls(url: string) {
  const pathnames = url.split("/route");
  const pathname = pathnames[1].split("?");
  const citys = pathname[0].replace("/", "").split("-");
  const data = pathname[1].split("=");
  if (data.length > 1) {
    citys.push(data[1]);
    return citys;
  }
}
