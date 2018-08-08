'use strict'

const Property = use('App/Models/Property')

/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   */
  async index ({ request, response, view }) {
    const { latitude, longitude } = request.all()
    
    const properties = Property.query()
      .nearBy(latitude, longitude, 10)
      .fecth()

    return properties
  }

  /**
   * Create/save a new property.
   * POST properties
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single property.
   * GET properties/:id
   */
  async show ({ params, request, response, view }) {
    const property = await Property.findOrFail(params.id)

    await property.load('images')

    return property
  }

  async update ({ params, request, response }) {
    const property = await Property.findOrFail(params.id)

    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])

    property.merge(data)

    await property.save()

    return property
  }

  /**
   * Delete a property with id.
   * DELETE properties/:id
   */
  async destroy ({ params, request, response }) {
    const property = await Property.findOrFail(params.id)

    if(property.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await property.delete()
  }
}

module.exports = PropertyController
