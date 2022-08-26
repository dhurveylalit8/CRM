const verifySignup = require("./verifySignup");
const authJwt = require("./auth.jwt")
const validateTicket = require("./ticketValidator")

/**
 * I can add more middleware here as the project grows
 */

module.exports = {
    verifySignup,
    authJwt,
    validateTicket
}