import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dbDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.resolve(dbDir, 'srivijay_travels.sqlite');
export const db = new Database(dbPath);

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    commuter_count TEXT,
    message TEXT,
    status TEXT DEFAULT 'NEW',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS chat_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed verified sample records if empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM quotes');
const { count } = countStmt.get() as { count: number };

if (count === 0) {
  const insertStmt = db.prepare(`
    INSERT INTO quotes (reference_id, full_name, company_name, email, phone, service, commuter_count, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ?))
  `);

  insertStmt.run(
    'SVT-2026-1001',
    'Rajesh Varma',
    '[24]7.ai Bengaluru',
    'r.varma@247.ai',
    '+91 98450 12345',
    'Corporate Transport Services',
    '120 employees',
    'Shift transport proposal for Whitefield campus (3 rotational shifts).',
    'CONTACTED',
    '-2 days'
  );

  insertStmt.run(
    'SVT-2026-1002',
    'Pooja Nair',
    'AECOM India',
    'pooja.nair@aecom.com',
    '+91 97400 54321',
    'Employee Transportation (ETS)',
    '65 employees',
    'Night cab and women escort security coverage required from Bellandur hub.',
    'NEW',
    '-1 days'
  );

  insertStmt.run(
    'SVT-2026-1003',
    'Karthik Somayaji',
    'AON Global Services',
    'karthik.s@aon.com',
    '+91 99001 98765',
    'Event & Delegation Logistics',
    '8 Luxury Coaches + 4 Innovas',
    'Annual leadership summit transport between Kempegowda Airport and Whitefield.',
    'QUOTED',
    '-4 hours'
  );

  console.log('✅ SQLite database initialized with sample verified corporate inquiries.');
} else {
  console.log(`✅ SQLite database connected (${count} existing inquiries found).`);
}
