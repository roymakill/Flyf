# legionflyff
Legion FlyFF - Ultimate Private Server Experience

## Run from the GitHub repo without a database

GitHub cannot run the Next.js server directly. The repo is configured with a
GitHub Actions build check that installs dependencies and runs `npm run build`
without any SQL Server/database secrets.

What works without a database:

- GitHub Actions can verify that the project builds.
- Vercel or another host can deploy the public pages.
- Static/client pages can load normally.

What needs a database later:

- Login/register/account pages
- Rankings, characters, downloads, news posts, admin data
- Any `/api/*` route that imports `src/lib/db.js`

### Local setup without database

```bash
npm install
copy .env.example .env
npm run dev
```

Open `http://localhost:3000`.

Database-backed API routes will return errors until real `DB_*` values are set.

### Deploy without database

For Vercel, import this repository and add only these environment variables:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.example
NEXT_PUBLIC_BASE_URL=https://your-domain.example
NEXT_PUBLIC_API_URL=https://your-domain.example/api
NEXTAUTH_SECRET=replace-with-a-long-random-value
```

Do not add `DB_USER`, `DB_PASS`, `DB_SERVER`, or `DB_NAME` if you want the deploy
to stay database-free.

## Admin role

Admin access uses the **`super`** role. The role is stored in the database and put into the session at login.

### How it works

- **Table:** `WEBSITE_DBF.dbo.REGISTERED_USERS`
- **Column:** `role` (e.g. `'user'` or `'super'`)
- **Login** (`/api/login`) reads `role` and stores it in the session cookie.
- **Navbar** and **Admin Panel** (`/admin`) allow access when `role === 'super'`.

### Set an admin user

1. Have a registered, verified user (e.g. `admin@gmail.com`).
2. In SQL Server, run:

```sql
UPDATE WEBSITE_DBF.dbo.REGISTERED_USERS
SET role = 'super'
WHERE email = 'your-admin@gmail.com';
```

3. That user logs in again; they will see the Admin dropdown and can open `/admin`.

To revoke admin, set the role back to `'user'`:

```sql
UPDATE WEBSITE_DBF.dbo.REGISTERED_USERS
SET role = 'user'
WHERE email = 'your-admin@gmail.com';
```
