import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération de la tâche' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { id, title, description, dueDate, priority } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Le titre est requis' });
    }
    
    const result = await pool.query(
      'INSERT INTO tasks (id, title, description, due_date, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, title, description, dueDate, priority]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Erreur lors de la création de la tâche' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, dueDate, priority } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Le titre est requis' });
    }
    
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, completed = $3, due_date = $4, priority = $5 WHERE id = $6 RETURNING *',
      [title, description, completed, dueDate, priority, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    
    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Erreur lors de la suppression de la tâche' });
  }
});

export default router;