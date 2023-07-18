import { Request, Response } from 'express'

const getContacts = async function (req: Request, res: Response) {
  try {
    res.status(200).json()
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    }
  }
}

const createContact = async (req: Request, res: Response) => {
  const { avatar, name, role, phone } = req.body
  try {
    res.status(201).json()
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default {
  getContacts,
  createContact
}
