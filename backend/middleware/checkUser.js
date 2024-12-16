export async function checkUser(req, res, next) {
  const tokenId = req.user.id.toString();
  const paramId = req.params.userId;
  // console.log("parameter:", paramId, "token:", tokenId);

  if (req.user.role === "admin") {
    next();
  }
  if (tokenId !== paramId) {
    return res.status(403).json({ msg: "Permission denied!" });
  }
  next();
}

export function checkRole(...requiredRoles) {
  return (req, res, next) => {
    const userRole = req.user.role.toString();
    // console.log("userRole:", userRole);
    // console.log("requiredRoles:", requiredRoles);
    // console.log(requiredRoles.includes(userRole));

    if (!userRole || !requiredRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ msg: "Access denied: Permission insufficient!" });
    }
    next();
  };
}
