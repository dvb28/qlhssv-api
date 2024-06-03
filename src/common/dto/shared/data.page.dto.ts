export class PageDateDto<T> {
  data: T[] | T | any;
  total: number;
  page: number;
  limit: number;
  pages: number;
}
