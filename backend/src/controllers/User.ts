import { Request, Response } from 'express';
import User from '../models/User';
import { sign } from '../utils/token-utils';

const user = new User();

export const createUser = async (req: Request, res: Response) => {
  try {
    const response = await user.createUser(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User created successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const response = await user.getUsers();
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User fetched successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const response = await user.getUser(req.params.id);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User fetched successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await user.updateUser(req.params.id, req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await user.deleteUser(req.params.id);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const authUser = async (req: Request, res: Response) => {
  try {
    const response = await user.createUser(req.body);
    const json = (j: {}) => {
      res.status(200).json(j);
    };
    const token = sign(response, json);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};
