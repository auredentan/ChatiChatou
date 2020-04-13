import api from "./client"

export interface IUserService {
    getMe: () => Promise<any>
}

export const userService = (): IUserService => {
    return ({
        getMe: async () => {
            if (process.env.NODE_ENV === "development") {
                const { data } = await api.get(`/api/users/1`)
                return data
            }
            else {
                const { data } = await api.get(`/api/users/`)
                return data
            }
        }
    })
}
