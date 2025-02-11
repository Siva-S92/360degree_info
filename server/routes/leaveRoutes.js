import express from 'express';
import {
  applyLeave,
  getAllLeaves,
  getLeaveById,  
  updateLeave,
  deleteLeave
} from '../controllers/leaveController.js';

const router = express.Router();

router.post('/', applyLeave);
router.get('/', getAllLeaves);
router.get('/:id', getLeaveById); 
router.put('/:id', updateLeave);
router.delete('/:id', deleteLeave);

export default router;


