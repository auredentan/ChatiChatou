import api from "./client"


export interface ILoginData {
    email: string
    password: string
}

export interface IUserService {
    register: (loginData: ILoginData) => Promise<any>
    login: (loginData: ILoginData) => Promise<any>
    getMe: () => Promise<any>
}

export const userService = (): IUserService => {
    return ({
        register: async (loginData: ILoginData) => {
            return await api.post('/api/register', loginData)
        },
        login: async (loginData: ILoginData) => {
            return await api.post('/api/auth', loginData)
        },
        getMe: async () => {
            return await api.get(`/api/auth`)
        }
    })
}
