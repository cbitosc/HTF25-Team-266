# Backend for my-app

This small Express backend is a lightweight demo for the Next.js frontend in this workspace. It provides simple, in-memory endpoints for wallet, explorer, migration, docs and dashboard.

How to run (PowerShell):

```powershell
# from the project root
cd c:\Users\khaja\Desktop\Quantum_resistant\my-app\backend
npm install
# start (the server will try PORT env or default 4000 and will auto-try the next port if occupied)
npm start
```

Alternative: start directly with node and explicit PORT

```powershell
cd c:\Users\khaja\Desktop\Quantum_resistant\my-app\backend
$env:PORT=4000; node src\index.js
```

The server listens on port 4000 by default. If that port is already in use it will automatically try the next port (4001, 4002, ...). The frontend (Next.js) usually runs on port 3000; CORS is configured to allow `http://localhost:3000` by default.

Useful endpoints (all prefixed with `/api`):

- GET  /api/wallet/balance?address=main
- POST /api/wallet/transfer    { to, from?, amount }
- GET  /api/explorer/blocks/latest
- GET  /api/explorer/tx/:id
- POST /api/migration/migrate
- GET  /api/migration/status/:jobId
- GET  /api/docs
- GET  /api/dashboard/stats

Example curl (PowerShell):

```powershell
# Check balance
curl -Method GET 'http://localhost:4000/api/wallet/balance'

# Transfer
curl -Method POST 'http://localhost:4000/api/wallet/transfer' -Body (ConvertTo-Json @{ to = 'alice'; amount = 10 }) -ContentType 'application/json'
```

Next steps / suggestions:
- Replace in-memory stores with a database (SQLite/Postgres) for persistence.
- Add authentication (JWT) if needed for private endpoints.
- Add robust validation and logging.
