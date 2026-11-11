import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};

try {
  await stat(root);
} catch {
  console.error('No build found. Run `npm run build` first.');
  process.exit(1);
}

const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const requestedFile = path.resolve(root, `.${pathname}`);
  const safeFile = requestedFile.startsWith(`${root}${path.sep}`) || requestedFile === path.join(root, 'index.html');
  const file = safeFile ? requestedFile : path.join(root, 'index.html');

  try {
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(file)] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

server.listen(4173, () => console.log('Preview at http://localhost:4173'));