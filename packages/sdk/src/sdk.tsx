import type { Project } from '@prisma/client';

type RequestProps = {
  searchParams: Record<string, string>;
  method?: 'GET' | 'POST' | 'DELETE';
};

export class ChirpySDK {
  constructor(private apiKey: string) {}

  public getProject(domain: string): Promise<Project> {
    return this.request({ searchParams: { domain } });
  }

  public createProject(domain: string, name: string): Promise<Project> {
    return this.request({ searchParams: { domain, name }, method: 'POST' });
  }

  public deleteProject(domain: string): Promise<void> {
    return this.request({ searchParams: { domain }, method: 'DELETE' });
  }

  private async request({ searchParams, method = 'GET' }: RequestProps) {
    const url = new URL('https://chirpy.dev/api/sdk/project');
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    const res = await fetch(url.href, {
      headers: {
        authorization: `Bearer ${this.apiKey}`,
      },
      method,
    });
    if (!res.ok) {
      throw new Error(
        `Chirpy SDK API Error:\nstatus:${res.status}\n${res.text}`,
      );
    }
    const data = await res.json();
    return data;
  }
}
