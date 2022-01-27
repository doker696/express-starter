import createError from 'http-errors';

export async function isAuthenticated(req, res, next) {
  if (!req.user) {
    const error = createError(401, 'Not authenticated!');
    return next(error);
  }
  return next();
}

export async function isAdmin(req, res, next) {
  if (req.user && req.user.roleId !== 1) {
    const error = createError(400, 'Not admin!');
    return next(error);
  }
  return next();
}
