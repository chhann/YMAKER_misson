import instance from "../utils/instance"

export const getCountryRequest = async () => {
    return await instance.get("/options/country")
}

export const getCityRequest = async (params) => {
    return await instance.get("/options/city",{params})
}
