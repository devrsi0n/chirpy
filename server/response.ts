import { ServerResponse } from 'http'

export function redirect(res: ServerResponse, url: string) {
  res.writeHead(302, { Location: url })
  res.end()
}
