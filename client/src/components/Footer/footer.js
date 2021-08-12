import {AiFillHome,AiFillBell,AiFillFire} from "react-icons/ai";
import "../Footer/footer.css";

export default function Header(){
    const token=JSON.parse(localStorage.getItem("token"));
    return <footer>
        <AiFillHome size="30px" onClick={()=>window.location="/home"}/>
        <AiFillBell  size="30px"/>
        <AiFillFire  size="30px"/>
        <img src={token.user.profilePhoto} alt="profilePhoto" onClick={()=>window.location="/profile/"+token.user._id}/>
    </footer>
}