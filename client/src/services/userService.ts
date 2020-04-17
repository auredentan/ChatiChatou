import api from "./client"


export interface ILoginData {
    email: string
    password: string
}

export interface IUserService {
    login: (loginData: ILoginData) => Promise<any>
    getMe: () => Promise<any>
}

export const userService = (): IUserService => {
    return ({
        login: async (loginData: ILoginData) => {
            return await api.post('/api/auth', loginData)
        },
        getMe: async () => {
            return await api.get(`/api/auth`)
        }
    })
}
