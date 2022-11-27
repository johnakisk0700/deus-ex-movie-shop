import { rest } from "msw";
import { UserCredentials } from "../../context/AuthProvider";

export const LoginHandler = [
  rest.post<UserCredentials>("auth/login/", (req, res, ctx) => {
    const { username } = req.body;

    return res(
      ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        username,
        firstName: "John",
        lastName: "Maverick",
      })
    );
  }),
];
