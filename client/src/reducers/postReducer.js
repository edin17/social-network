
export default function postReducer(state=[],action){
    switch(action.type){
        case "LOAD":
            state=action.payload;
            return state;
        case "ADDCOMMENT":
            let post=state.find(photo=>photo._id===action.payload.postid);
            post.comments.push(action.payload);
            return state; 
        case "DELETECOMMENT":
            let postD=state.find(photo=>photo._id===action.payload.postid);
            let comments=postD.comments.filter(comm=>comm.comment!==action.payload.comment);
            postD.comments=comments;
            return state;

        case "LIKE":
            let likedPost=state.find(photo=>photo._id===action.payload.postid);
            likedPost.likes.push(action.payload.userid);
            return state;
        case "UNLIKE":
            let unlikedPost=state.find(photo=>photo._id===action.payload.postid);
            let likes=unlikedPost.likes.filter(like=>like!==action.payload.userid);
            unlikedPost.likes=likes;
            return state;
        default:
            return state;
    }
}