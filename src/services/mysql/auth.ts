import * as jwt from "jsonwebtoken";

import { Connection } from 'mysql';
import { ErrorHandler } from '../mysql';

export interface Auth {
  authenticate(email: string, accessToken: string): Promise<string>;
};
export const auth = (deps: { connection: Connection, errorHandler: ErrorHandler}): Auth => {
  return {
    /**
     * Function for authentication user by given email and access_token
     */
    authenticate: (email: string, accessToken: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        const queryString = 'SELECT id, email FROM users WHERE email = ? AND access_token = ?';
        const queryData = [email, accessToken];
        connection.query(queryString, queryData, (error, users) => {
          // handle error
          if (error || !users.length) {
            errorHandler(error, "Nepodařilo se zobrazit seznam uživatelů");
            reject();
            return false;
          }
          const { email, id } = users[0];
          // use JWT.SECRET for encode
          const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
          return resolve(token);
        })
      })
    }
  }
}
