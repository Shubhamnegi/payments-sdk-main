import { Router } from 'express'

export const orderRoute = Router()

/**
 * Resonsible to manage order
 * Process new orders
 * Refund orders
 * Get status on an order
 * Share list of orders
 */
orderRoute.post("/v1/create", (req, res, next) => {

})
