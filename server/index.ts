import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { db } from './db';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Server-side auth token cache
const validTokens = new Map<string, number>();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'svtadmin2026';

// Middleware for server-side authorization
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  const expiresAt = validTokens.get(token);

  if (!expiresAt || Date.now() > expiresAt) {
    if (expiresAt) validTokens.delete(token);
    return res.status(403).json({ success: false, error: 'Forbidden: Invalid or expired admin session token' });
  }

  next();
}

// Admin login endpoint
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ success: false, error: 'Password required' });
  }

  // Accept configured password or default passcodes
  const acceptedPasswords = [ADMIN_PASSWORD, 'svt2026', 'svtadmin2026'];
  const isValid = acceptedPasswords.some(p => p === password.trim());

  if (!isValid) {
    return res.status(401).json({ success: false, error: 'Invalid administrative credentials' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  validTokens.set(token, expiresAt);

  return res.json({
    success: true,
    token,
    expiresAt
  });
});

// Admin verify session
app.get('/api/auth/verify', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Admin session is valid' });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Tours & Travels API',
    database: 'SQLite active',
    timestamp: new Date().toISOString()
  });
});

// GET all quotes with optional search and status filter - PROTECTED
app.get('/api/quotes', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;
    let query = 'SELECT * FROM quotes WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'ALL') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      query += ' AND (company_name LIKE ? OR full_name LIKE ? OR phone LIKE ? OR reference_id LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term);
    }

    query += ' ORDER BY id DESC';

    const stmt = db.prepare(query);
    const quotes = stmt.all(...params);

    res.json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error: any) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST a new quote inquiry
app.post('/api/quotes', (req: Request, res: Response) => {
  try {
    const { fullName, companyName, email, phone, service, count, message } = req.body;

    if (!fullName || !companyName || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Full name, company name, and phone are required fields.'
      });
    }

    // Generate unique reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `SVT-2026-${randomSuffix}`;

    const insertStmt = db.prepare(`
      INSERT INTO quotes (
        reference_id, full_name, company_name, email, phone, service, commuter_count, message, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW')
    `);

    const result = insertStmt.run(
      referenceId,
      fullName.trim(),
      companyName.trim(),
      email ? email.trim() : null,
      phone.trim(),
      service || 'Corporate Transport Services',
      count ? count.trim() : null,
      message ? message.trim() : null
    );

    const savedRecord = db.prepare('SELECT * FROM quotes WHERE id = ?').get(result.lastInsertRowid);

    console.log(`📥 New corporate quote received: ${referenceId} from ${companyName} (${fullName})`);

    res.status(201).json({
      success: true,
      message: 'Quote inquiry saved to database successfully',
      referenceId,
      data: savedRecord
    });
  } catch (error: any) {
    console.error('Error saving quote:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH update quote status or notes - PROTECTED
app.patch('/api/quotes/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const fields: string[] = [];
    const params: any[] = [];

    if (status) {
      fields.push('status = ?');
      params.push(status);
    }

    if (notes !== undefined) {
      fields.push('notes = ?');
      params.push(notes);
    }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, error: 'No fields to update.' });
    }

    params.push(id);
    const updateStmt = db.prepare(`UPDATE quotes SET ${fields.join(', ')} WHERE id = ?`);
    const result = updateStmt.run(...params);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Quote not found.' });
    }

    const updated = db.prepare('SELECT * FROM quotes WHERE id = ?').get(id);
    res.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating quote:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE a quote - PROTECTED
app.delete('/api/quotes/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM quotes WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Quote not found.' });
    }

    res.json({ success: true, message: 'Quote deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET statistics for admin dashboard - PROTECTED
app.get('/api/stats', requireAdminAuth, (_req: Request, res: Response) => {
  try {
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM quotes');
    const total = (totalStmt.get() as any).count;

    const newStmt = db.prepare("SELECT COUNT(*) as count FROM quotes WHERE status = 'NEW'");
    const newCount = (newStmt.get() as any).count;

    const contactedStmt = db.prepare("SELECT COUNT(*) as count FROM quotes WHERE status = 'CONTACTED'");
    const contactedCount = (contactedStmt.get() as any).count;

    const quotedStmt = db.prepare("SELECT COUNT(*) as count FROM quotes WHERE status = 'QUOTED'");
    const quotedCount = (quotedStmt.get() as any).count;

    const topServices = db.prepare(`
      SELECT service, COUNT(*) as count 
      FROM quotes 
      GROUP BY service 
      ORDER BY count DESC 
      LIMIT 5
    `).all();

    res.json({
      success: true,
      stats: {
        total,
        new: newCount,
        contacted: contactedCount,
        quoted: quotedCount,
        topServices
      }
    });
  } catch (error: any) {
    console.error('Error getting stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Tours & Travels Express API server listening on http://localhost:${PORT}`);
});
