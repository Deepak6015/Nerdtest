<!-- Repo-specific Copilot instructions for AI coding agents -->
# Copilot Instructions (repo-specific)

This file gives focused, actionable guidance for AI coding agents working in this repository. Keep suggestions small, testable, and aligned to the project's current structure.

- **Big picture:** This is a single-repo Django (backend) + React (frontend) project.
  - Backend: Django project at `nerdtest/` (entry: `manage.py`, settings: `nerdtest/settings.py`). Two Django apps ship core functionality: `products` and `contact`.
  - Frontend: React app in `frontend/` (use `package.json` scripts). Frontend is separate and talks to the Django API under `/api/`.

- **How the code is structured:**
  - Server-rendered templates: `templates/` contains `product_list.html`, `product_detail.html`, `product_form.html` used by Django views.
  - Django REST API: `products/api/api_urls.py` and `contact/api/api_urls.py` register DRF `ViewSet`s via `DefaultRouter`. The project `urls.py` includes both under the `api/` prefix.
  - React UI: `frontend/src/` contains components such as `ProductList.jsx`, `ProductDetail.jsx`, `Feeds.jsx`, `ContactForm.jsx`.

- **Key files to reference when making changes:**
  - `manage.py` — Django CLI entry.
  - `nerdtest/settings.py` — important flags: `DEBUG=True`, `CORS_ALLOW_ALL_ORIGINS=True`, `DATABASES` uses `db.sqlite3`.
  - `nerdtest/urls.py` — shows routes: `admin/`, template views (`/` and `/home/`), `products/` urls, and `api/` includes.
  - `products/api/api_urls.py`, `contact/api/api_urls.py` — primary API router registrations.
  - `frontend/package.json` — use `npm start`, `npm build`, `npm test` for frontend tasks.

- **Run / dev workflow (what actually works for this repo):**
  - Backend (macOS / zsh):
    - Create venv: `python3 -m venv venv` then `source venv/bin/activate`.
    - Install runtime deps (no `requirements.txt` present): `pip install django djangorestframework django-filter django-cors-headers`.
    - Run migrations: `python manage.py migrate`.
    - Start server: `python manage.py runserver` — the API is available under `http://127.0.0.1:8000/api/` and admin at `/admin/`.
  - Frontend:
    - `cd frontend && npm install` then `npm start` to run the React dev server.
    - The frontend expects the backend API at the same host/origin or will call `/api/` relative paths; CORS is allowed by default here.

- **API endpoint examples (derived from router registrations):**
  - `GET /api/products/` — product list (from `products/api/api_urls.py` router `products`).
  - `GET /api/tags/`, `GET /api/variants/`, `GET /api/product-images/` — other ViewSet endpoints.
  - `GET /api/contact/` — contact endpoint (from `contact/api/api_urls.py`).

- **Patterns & conventions specific to this repo:**
  - Use DRF ViewSets and `DefaultRouter` for API endpoints (see `products.views` and `contact.views`).
  - Server-rendered templates coexist with a React frontend; prefer editing template files in `templates/` for pages served by Django views, and React files for client-side UI.
  - Static files are served via Django `STATIC_URL = 'static/'`. There is no production static handling configured.

- **When making changes, follow these minimal checks:**
  - Update or run migrations if models change: `python manage.py makemigrations && python manage.py migrate`.
  - If modifying an API ViewSet route, update `products/api/api_urls.py` or `contact/api/api_urls.py` — they are simple router-based includes.
  - When changing frontend API usage, prefer relative paths like `/api/...` because `CORS_ALLOW_ALL_ORIGINS=True` in dev; confirm with the running dev servers.

- **Testing:**
  - Frontend: `cd frontend && npm test` runs the React tests (uses `react-scripts`).
  - Backend: run `python manage.py test` (Django tests are in `products/tests.py` and `contact/tests.py` if present).

- **Edge cases / gotchas discovered:**
  - No `requirements.txt` is present — recreate expected Python deps when spinning a new venv.
  - `DEBUG=True` and `CORS_ALLOW_ALL_ORIGINS=True` — take care not to assume production-safe settings.

- **Agent behavior & coding style for this repo:**
  - Make small, focused changes with clear commit messages.
  - Prefer editing the specific app/module that owns the behavior (`products/` or `contact/`) rather than making broad changes to project settings.
  - When adding endpoints, mirror the existing router/ViewSet pattern. Example: add a new ViewSet in `products/views.py`, register in `products/api/api_urls.py`.

If anything here is unclear or you want me to add CI, dependency manifests, or a `requirements.txt`, tell me which part to expand and I'll update this file.
