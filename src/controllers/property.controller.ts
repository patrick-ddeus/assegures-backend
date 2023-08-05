/* eslint-disable camelcase */
import httpStatus from 'http-status'
import PropertyService from '@/services/property.service'
import { Request, Response } from 'express'
import { AddressQueryParam, CreatePropertyBody, PropertyQueryParams } from '@/protocols'

async function getProperties(req: Request, res: Response) {
  const cleanQueryParams = req.query as PropertyQueryParams

  const properties = await PropertyService.getProperties(cleanQueryParams)
  res.status(httpStatus.OK).json(properties)
}

async function createProperty(req: Request, res: Response) {
  const cleanBody = req.body as CreatePropertyBody

  const property = await PropertyService.createProperty(cleanBody)
  res.status(httpStatus.CREATED).json(property)
}

async function getTypesAndSubtypes(req: Request, res: Response) {
  const types = await PropertyService.getTypesAndSubtypes()
  res.status(200).json(types)
}

async function getPropertyById(req: Request, res: Response) {
  const { propertyId } = req.params
  const property = await PropertyService.getPropertyById(propertyId)
  res.status(httpStatus.OK).json(property)
}

const getAddress = async function (req: Request, res: Response) {
  const cleanQueryParams = req.query as AddressQueryParam

  try {
    const addresses = await PropertyService.getAddress(cleanQueryParams)
    res.status(200).json(addresses)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

export default {
  getProperties,
  createProperty,
  getTypesAndSubtypes,
  getPropertyById,
  getAddress
}
