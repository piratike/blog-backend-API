/**
 * Class to create the Like controller.
 * Used in the /likes endpoints.
 * 
 */

const RequestController = require('../controllers/RequestContoller.js');
const JwtVerifier = require('../services/JwtVerifier.js');
const LikeCreator = require('../services/LikeCreator.js');
const LikeFinder = require('../services/LikeFinder.js');

module.exports = class LikeController {

    static createNewLike(req, res) {

        try {

            /**
             * For a new Like is needed:
             * - Article ID
             * - Token, where we get user ID
             */

            const tokenInfo = JwtVerifier.verifyJwt(req.body.token);
            const data = {
                article_id: req.body.article_id,
                user_id: tokenInfo.user_id
            };

            // Check if all data needed is there
            if(!data.article_id || !data.user_id)
                return RequestController.sendError(res, 'Some needed data not received.');

            LikeFinder.findLikeById(data.article_id, function(like) {

                if(like)
                    return RequestController.sendError(res, 'Already exists a like from that user in that article.');

                LikeCreator.createLike(data, function(newLike) {

                    if(!newLike)
                        return RequestController.sendError(res, 'Something went wrong while creating the like.');

                    return RequestController.sendSuccess(res, newLike);

                });

            });

        } catch (error) {

            return RequestContoller.sendError(res, error);

        }

    }

}
