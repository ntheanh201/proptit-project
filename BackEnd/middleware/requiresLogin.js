import session from 'express-session'

const requiresLogin = (req, res, next) => {
    // if(req.session && req.session)
    return next()
};

export default requiresLogin