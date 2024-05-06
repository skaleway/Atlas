import {User} from "@prisma/client";
import {db} from "@/lib/db";


export const getPrevNextUser = async (user: User, type: "prev" | "next") => {

    let allUsers = await db.user.findMany({
        where: {
            role: 'PARTICIPANT'
        },
        select: {
            id: true,
            username: true,
        },
    })

    const currentUser = allUsers.find(u => u.id === user.id)

    if (!currentUser)
        return null

    const indexOfUser = allUsers.indexOf(currentUser)

    if (type === "next")
        return indexOfUser + 1 !== allUsers.length ? allUsers[indexOfUser + 1] : null
    else
        return indexOfUser > 0 ? allUsers[indexOfUser - 1] : null

}