import { PrismaClient, User } from "@prisma/client";
import { log } from "console";
require('dotenv').config();
const prisma = new PrismaClient();

interface UpdateParams {
  firstName?: string;
  lastName?: string;
}

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    },
  });
  console.log(res);
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  const res = await prisma.user.update({
    where: { username: username },
    data: {
      firstName,
      lastName,
    },
  });
  console.log(res);
}
async function deleteUser(username: string) {
  try {
    const res = await prisma.user.delete({
      where: { username: username },
    });
    console.log(res);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      console.error(`User with username ${username} not found.`);
    } else {
      console.error("An error occurred:", error);
    }
  }
}

async function getUser(username: string) {
  const res = await prisma.user.findMany({
    where: { username: username },
  });
  console.log(res);
}

// Example usage:
//insertUser("ABDULHAMEED1", "password123", "SHAIK", "ABDULHAMEED");
//updateUser("ABDUL", { firstName: "ABDULHAMEED" });
//deleteUser("ABDULHAMEED");
getUser("ABDULHAMEED1");
