import Joi from 'joi'

const ContactSchema = Joi.object({
  name: Joi.string().required(),
  avatar: Joi.string().required(),
  role: Joi.string().required(),
  phone: Joi.string().required()
})

export default ContactSchema
