import httpStatus from 'http-status'
import AddressService from '@/services/address.service'
import { Request, Response } from 'express'
import { AddressQueryParam } from '../protocols'

const getAddress = async function (req: Request, res: Response) {
  const cleanQueryParams = req.query as AddressQueryParam

  try {
    const addresses = await AddressService.getAddress(cleanQueryParams)
    res.status(200).json(addresses)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

export default {
  getAddress
}
