

export const initialState = {
    islogin : false,
    backendadress: "http://localhost:8000"// "https://server.cmentarz.ovh"//
   
}
export const user = localStorage.getItem("token");
export const id = localStorage.getItem("id");
export default (initialState,user,id);