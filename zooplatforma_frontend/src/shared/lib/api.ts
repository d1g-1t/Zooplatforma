export class ApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly headers: Headers
  ) {}

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  get<T = any>(endpoint: string = '', query?: any, headers?: any): Promise<T> {
    return this.query(endpoint, query, headers);
  }

  post<T = any>(endpoint: string = '', body?: any): Promise<T> {
    return this.command('POST', endpoint, body);
  }

  put<T = any>(endpoint: string = '', body?: any): Promise<T> {
    return this.command('PUT', endpoint, body);
  }

  delete<T = any>(endpoint: string = '', body?: any): Promise<T> {
    return this.command('DELETE', endpoint, body);
  }

  private query = async (
    endpoint: string,
    query?: any,
    headers?: any
  ): Promise<any> => {
    let url = this.baseUrl  + endpoint;
    if (query) {
      url += '?' + ApiClient.buildQueryParams(query);
    }
    const res = await fetch(url, {
      method: 'GET',
      headers: headers !== undefined ? headers : this.headers,
    });
    return checkResponse(res);
  };

  private command = async (
    method: string,
    endpoint: string,
    body?: any
  ): Promise<any> => {
    const url = this.baseUrl  + endpoint;
    const res = await fetch(url, {
      method: method,
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return checkResponse(res);
  };

  private static buildQueryParams = (query: any): string => {
    const params = { ...query };
    const searchParams = new URLSearchParams(params);
    return searchParams.toString();
  };
}

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  const err = await res.json();
  return await Promise.reject(err);
};

const api = new ApiClient(
  'https://zooplatforma.ru',
  new Headers({
    'Content-Type': 'application/json',
  })
);

export default api;
