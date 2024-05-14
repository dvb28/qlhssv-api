export class PageDateDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
