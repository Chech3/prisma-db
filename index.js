import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
   const newUser = await prisma.user.create({
        data: {
            name: "Yolo",
            email: "emaaaaaailasdasda@example.com"
        }
    })
   const newPost = await prisma.post.create({
        data: {
            title: "Mi primer post",
            conten: "Contenido del post",
            // authorId: newUser.id Esta es una forma de que la conectemos
            author: {
                connect: {
                    id: newUser.id
                }
            }
        }
    })
    console.log(newPost);
}


async function createData() {
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




//traer data junto con las relaciones

async function getDataWithRelations() {

    const newPost = await prisma.post.create({
        data: {
            title: "El post buenisimo",
            conten: "Contenido del post",
            authorId: 2   
        }
    })

    const user = await prisma.user.findMany({
        include: {
            post: true
        }
    })
    user.forEach(x => {
        console.log("-------------");
        console.log(`User: ${x.name}`);
        console.log(`Emil: ${x.email}`);

        x.post.forEach((post,i) => {
            console.log(`Post ${i+1}: ${post.title}`);
        }) 
    });
}

getDataWithRelations()