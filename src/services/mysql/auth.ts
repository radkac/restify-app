import * as jwt from 'jsonwebtoken';

import * as conf from '../../config';
import { ErrorHandler } from '../mysql';
import { UserModel } from './userModel';

export interface AuthModule {
  authenticate(email: string, accessToken: string): Promise<string>;
}
export const auth = (errorHandler: ErrorHandler): AuthModule => {
  return {
    /**
     * Function for authentication user by given email and access_token
     */
    authenticate: (email: string, accessToken: string): Promise<string> => {
      return new Promise((resolve, reject) => {

        UserModel.findAll({
          where: {email: email, accessToken: accessToken},
        })
        .then(usersList => {
          if (!usersList.length) {
            return reject(401);
          }
          if (usersList === null) {            
            errorHandler(undefined, 'Nepodařilo se vygenerovat veřejný token.');
            
            return reject(500);
          }
          else {
            const { email, id } = usersList[0];
            // use JWT.SECRET for encode
            const publicToken = jwt.sign({ email, id }, conf.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

            return resolve(publicToken);
          }
        });
      });
    },
  };
};
