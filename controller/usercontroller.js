import { userlist } from "../model/userModel.js"

 export function handleUser(req, resp) {
    const userData = userlist()
  
  resp.render('user' , {users:userData} )
 }