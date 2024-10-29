import { PrismaClient } from "@prisma/client"

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
    

    users.map((user) => {
        console.log(`${user.id} - ${user.name} - ${user.last_name} ${user.email}`);
    })
}

//De eesta forma podemos buscar un único elemento por id
async function getDataById(id) {
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    })
    console.log(user);
}

//
async function getDataOr() {
    const user = await prisma.user.findFirst({
        where: {
            AND: [
                { name: "Juan" },
                { email: "o@example.com" }
            ]
        }
    })
    console.log(user);
}

async function deleteData() {
    try {
        const user = await prisma.user.delete({
            where: {
                id: 1
            }
        })
        console.log(user);
    } catch (error) {
        console.log(error.meta.cause);
    }
  
}

async function updateData() {
    const user = await prisma.user.update({
        where: {
            id: 2
        },
        data: {
            last_name: "apellido"
        }
    })
    console.log(user);
}


async function upsertData() {
    const user = await prisma.user.upsert({
        where: {
            email: "email@example.com",
        },
        create:{
            email: "email@example.com",
            name: "Nuevo nombre"
        },
        update:{
            name: "Nuevo nombre",
            last_name: "Nuevo apellido"
        }
    })
    console.log(user);
}




getData();