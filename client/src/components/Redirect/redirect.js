export default function Redirekt(){
    let token=localStorage.getItem("token");
    if(token){
        window.location="/home"
    }else{
        window.location="/login"
    }
}