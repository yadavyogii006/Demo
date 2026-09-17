# Pocket Server

Static frontend on Render. FastAPI backend on this Mac, exposed with Tailscale Funnel.

```
Browser
  |
  | loads frontend
  v
https://pocket-server.yogesh-yadav.is-a.dev   (Render static site)
  |
  | API requests
  v
https://pocket-server.tail1234d4.ts.net       (Tailscale Funnel)
  |
  v
http://localhost:8000                         (FastAPI on this Mac)
```

## Local development

Frontend talks to `http://localhost:8000`. Do not use the Tailscale URL locally.

### Backend

```bash
source .venv/bin/activate
pip install -r requirements.txt
cd app
uvicorn main:app --host 127.0.0.1 --port 8000
```

API: http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

UI: http://localhost:5173

`frontend/.env.development` sets:

```
VITE_API_URL=http://localhost:8000
```

## Production

### Frontend (Render)

Render serves only the static frontend. It does not run FastAPI.

- Build command: `npm ci && npm run build`
- Publish directory: `dist` (from `frontend/`)
- Environment variable:

```
VITE_API_URL=https://pocket-server.tail1234d4.ts.net
```

`render.yaml` already includes this. After deploy, point `https://pocket-server.yogesh-yadav.is-a.dev` at the Render static site.

### Backend (this Mac + Tailscale Funnel)

Keep FastAPI bound to localhost:

```bash
cd app
source ../.venv/bin/activate
uvicorn main:app --host 127.0.0.1 --port 8000
```

Expose it:

```bash
tailscale funnel --bg http://localhost:8000
```

Public API: https://pocket-server.tail1234d4.ts.net

Health check: https://pocket-server.tail1234d4.ts.net/health

## API paths

Unchanged:

- `GET /`
- `GET /health`
- `GET /api/projects`
- `GET /hello/{name}`
- FastAPI docs: `/docs`

The frontend uses a single `VITE_API_URL` in `frontend/src/api.js` for every backend request.

## CORS

The backend allows:

- `https://pocket-server.yogesh-yadav.is-a.dev`
- `http://localhost:5173`
- `http://127.0.0.1:5173`

There is no cookie/session auth in this project. Requests are public JSON fetches.
