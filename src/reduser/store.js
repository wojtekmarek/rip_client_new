

export const initialState = {
    islogin : false,
    backendadress: "https://server.cmentarz.ovh"//"http://localhost:8000"// 
   
}
export const user = localStorage.getItem("token")
export const id = localStorage.getItem("id")
export default (initialState,user,id);