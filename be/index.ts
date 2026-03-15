import express from "express";

const app = express();

app.use(express.json());

type User = {
  id: string;
  email: string;
  password: string;
};

const users: User[] = [];

app.post("/signup", (req, res) => {
  const { email, password } = req.body as {
    email: string | undefined;
    password: string | undefined;
  };

  console.log("email ", email)
  console.log("password ", password)

  if (!email || !password) {
    return res.status(400).json({
      message: "invalid inputs",
    });
  }

  console.log("req reaching here??")
  
  const existingUser = users.find((usr) => usr.email === email);

  if (existingUser) {
    return res.status(409).json({
      message: "duplicate email",
    });
  }

  const userId = crypto.randomUUID();

  users.push({
    id: userId,
    email,
    password,
  });

  return res.status(201).json({
    message: "signup successfull",
    data: {
      userId,
    },
  });
});

app.listen(3000, () => console.log("code is running at ", 3000));
