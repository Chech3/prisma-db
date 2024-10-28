import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const newUser = await prisma.user.create({
        data: {
            name: "Juan",
            email: "ao@example.com"
        }
    })
    console.log(newUser);
}

async function getData() {
    const users = await prisma.user.findMany()
    console.log(users);

    users.map((user) => {
        console.log(`${user.id} - ${user.name}`);
    })
}

getData();