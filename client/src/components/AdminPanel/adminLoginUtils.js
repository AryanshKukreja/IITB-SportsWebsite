export const ROLE_PATHS = {
  secy: "/certificate-admin-gssa-0000/dashboard",
  chairperson: "/certificate-admin-chairperson-1542/dashboard",
  dean: "/certificate-admin-dean-3000/dashboard",
  superadmin: "/certificate-admin-superadmin-73/dashboard",
};

export const normalizeRole = (role) => {
  if (!role) return null;
  const normalized = String(role).trim().toLowerCase();
  const mapping = {
    gssa: "secy",
    secretary: "secy",
    secy: "secy",
    chairperson: "chairperson",
    dean: "dean",
    dean_of_students_affairs: "dean",
    dean_sa: "dean",
    superadmin: "superadmin",
    admin: "superadmin",
  };
  return mapping[normalized] || normalized;
};

export const getRoleFromPath = (pathname = "") => {
  if (pathname.includes("chairperson")) return "chairperson";
  if (pathname.includes("dean")) return "dean";
  if (pathname.includes("superadmin")) return "superadmin";
  if (pathname.includes("gssa") || pathname.includes("gssa-0000")) return "secy";
  return null;
};

export const getRoleRedirectPath = (role) => ROLE_PATHS[normalizeRole(role)] || null;

export const getFallbackAdminSession = ({ email, pathname }) => {
  const role = normalizeRole(getRoleFromPath(pathname) || "superadmin");
  return {
    token: "local-demo-token",
    role,
    name: role === "secy" ? "GSSA Admin" : role === "chairperson" ? "Chairperson" : role === "dean" ? "Dean SA" : "Super Admin",
    email: email || "admin@iitb.ac.in",
  };
};
