import instance from "../utils/instance"

export const registerUser = async (data) => {
    return await instance.post("/user/information", data);
}

export const searchUserRequest = async (params) => {
    return await instance.get("/user/information", {params});
}

export const deleteBooksRequest = async (data) => {
    return await instance.delete("/user/information", {data})
}