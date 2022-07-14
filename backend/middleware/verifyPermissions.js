const verifyPermissions = (...allowedPermissions) => {
  return (req, res, next) => {
    if (!req?.permissions) return res.sendStatus(401);
    const permissionsArray = [...allowedPermissions];
    console.log('ARRAY', permissionsArray);
    console.log('PERMISSIONS', req.permissions);

    const result = req.permissions
      .map((permission) => permissionsArray.includes(permission))
      .find((value) => value === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyPermissions;
