/**
 * Service to compare a passwords.
 * 
 */

const bcrypt = require('bcryptjs');

module.exports = class PasswordComparer {

    static comparePasswords(password_given, password_stored) {

        try {

        return bcrypt.compareSync(password_given, password_stored);

        } catch {

            callback(false);

        }

    }

}