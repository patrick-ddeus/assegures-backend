import httpStatus from 'http-status'
import AddressService from '@/services/address.service'
import { Request, Response } from 'express'

async function getCities(req: Request, res: Response) {
  const cities = await AddressService.getCities()
  res.status(httpStatus.OK).json(cities)
}

export default {
  getCities
}
