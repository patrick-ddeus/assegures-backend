import httpStatus from 'http-status'
import { sanitizeObjects } from '../helpers/sanitizeObject.js'
import AddressService from '../services/address.service.js'

const getAddress = async function (req, res) {
  const { locale } = sanitizeObjects(req.query)

  try {
    const addresses = await AddressService.getAddress(locale)
    res.status(200).json(addresses)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

export default {
  getAddress
}
