export function getQueryParam(target: string) {
  let queryParams: any = {};
  target.split("&").forEach(param => {
    queryParams[param.split("=")[0]] = param.split("=")[1];
  });
  return queryParams;
}
