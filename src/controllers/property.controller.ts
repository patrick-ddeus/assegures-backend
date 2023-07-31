/* eslint-disable camelcase */
import httpStatus from 'http-status'
import PropertyService from '@/services/property.service'
import { Request, Response } from 'express'
import { CreatePropertyBody, PropertyQueryParams } from '@/protocols'

async function getProperties(req: Request, res: Response) {
  const cleanQueryParams = req.query as PropertyQueryParams

  const properties = await PropertyService.getProperties(cleanQueryParams)
  res.status(httpStatus.OK).json(properties)
}

const createProperty = async function (req: Request, res: Response) {
  const cleanBody = req.body as CreatePropertyBody

  const property = await PropertyService.createProperty(cleanBody)
  res.status(httpStatus.CREATED).json(property)
}

const getTypesAndSubtypes = async function (req: Request, res: Response) {
  const types = await PropertyService.getTypesAndSubtypes()
  res.status(200).json(types)
}

export default {
  getProperties,
  createProperty,
  getTypesAndSubtypes
}
