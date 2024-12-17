export const getEnv = (name: string) => {
    try{
        return import.meta.env[name] || ""
    }catch (err){
        console.error('getEnv', err)
    }
}