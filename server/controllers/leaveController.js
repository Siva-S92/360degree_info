import * as LeaveModel from '../models/leaveModel.js';

export const applyLeave = async (req, res) => {
  try {
    await LeaveModel.applyLeave(req.body);
    res.status(201).json({ message: 'Leave applied successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveModel.getAllLeaves();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeaveById = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveModel.getLeaveById(id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave record not found' });
    }

    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLeave = await LeaveModel.updateLeave(id, req.body);

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave record not found' });
    }

    res.json({ message: 'Leave updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LeaveModel.deleteLeave(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Leave record not found' });
    }

    res.json({ message: 'Leave deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

