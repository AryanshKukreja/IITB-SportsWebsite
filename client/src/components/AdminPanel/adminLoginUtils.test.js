import { getFallbackAdminSession, getRoleFromPath, getRoleRedirectPath, normalizeRole } from "./adminLoginUtils";

describe("admin login helpers", () => {
  it("maps the current admin route to the expected role", () => {
    expect(getRoleFromPath("/certificate-admin-gssa-0000")).toBe("secy");
    expect(getRoleFromPath("/certificate-admin-chairperson-1542")).toBe("chairperson");
    expect(getRoleFromPath("/certificate-admin-dean-3000")).toBe("dean");
    expect(getRoleFromPath("/certificate-admin-superadmin-73")).toBe("superadmin");
  });

  it("builds a fallback session for offline admin login", () => {
    const session = getFallbackAdminSession({
      email: "chairperson@iitb.ac.in",
      pathname: "/certificate-admin-chairperson-1542",
    });

    expect(session.role).toBe("chairperson");
    expect(session.token).toBe("local-demo-token");
    expect(getRoleRedirectPath(session.role)).toBe("/certificate-admin-chairperson-1542/dashboard");
  });

  it("normalizes common backend role names", () => {
    expect(normalizeRole("gssa")).toBe("secy");
    expect(normalizeRole("dean_of_students_affairs")).toBe("dean");
    expect(normalizeRole("superadmin")).toBe("superadmin");
  });
});
