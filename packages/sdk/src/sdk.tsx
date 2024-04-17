import type { Page, Project, User } from '@prisma/client';

type RequestProps = {
  path: string;
  searchParams?: Record<string, string>;
  method?: 'GET' | 'POST' | 'DELETE';
  body?: Record<string, any>;
};

export class ChirpySDK {
  constructor(
    private apiKey: string,
    private origin: string = 'https://chirpy.dev',
  ) {}

  public getProject(domain: string): Promise<Project | null> {
    return this.request({ path: '/api/sdk/project', searchParams: { domain } });
  }

  public createProject(domain: string, name: string): Promise<Project> {
    return this.request({
      path: '/api/sdk/project',
      body: { domain, name },
      method: 'POST',
    });
  }

  public deleteProject(domain: string): Promise<void> {
    return this.request({
      path: '/api/sdk/project',
      searchParams: { domain },
      method: 'DELETE',
    });
  }

  public getPage(url: string): Promise<Page | null> {
    return this.request({ path: '/api/sdk/page', searchParams: { url } });
  }

  public linkPageAuthor(pageUrl: string, authorId: string): Promise<void> {
    return this.request({
      path: '/api/sdk/page/link-author',
      body: {
        pageUrl,
        authorId,
      },
      method: 'POST',
    });
  }

  public createUser(email: string, name: string): Promise<User> {
    return this.request({
      path: '/api/sdk/user',
      body: {
        email,
        name,
      },
      method: 'POST',
    });
  }

  private async request({
    path,
    body,
    searchParams,
    method = 'GET',
  }: RequestProps) {
    const url = new URL(`${this.origin}${path}`);
    Object.entries(searchParams || {}).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    const res = await fetch(url.href, {
      headers: {
        authorization: `Bearer ${this.apiKey}`,
      },
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      throw new Error(
        `Chirpy SDK API Error:\nstatus:${res.status}\n${await res.text()}`,
      );
    }
    try {
      const data = await res.json();
      return data;
    } catch {
      // ignore, no json response
      console.log(`No JSON response, ${await res.text()}`);
    }
  }
}
