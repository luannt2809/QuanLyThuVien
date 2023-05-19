const accountModel = require("../../models/accounts.model")
const bcrypt = require("bcrypt")
exports.login = async (req, res, next)=>{
    let dataReturn ={
        status:200,
        message:""
    }   
    let user = await accountModel.accountModel.findOne({username:req.body.username}).populate("roleId")
    if(user!=null){
        let checkPass = await bcrypt.compare(req.body.passwd, user.passwd);
        console.log(checkPass);
        if(checkPass==true){
            dataReturn.message="Đăng nhập thành công"
            dataReturn.status=200
            dataReturn.data = user
        }else{
            dataReturn.message="Sai mật khẩu"
            dataReturn.status=204
           
        }
    }else{
        dataReturn.message="Tài khoản không tồn tại"
        dataReturn.status =500
    }
    res.json(dataReturn)
}
exports.getAccount = async (req, res, next)=>{
    let dataReturn ={
        message:"",
        status:200
    }
    const idAccount = req.params.idAccount
    let account = await accountModel.accountModel.findOne({_id:idAccount}).populate("roleId")
    dataReturn.data =account
    dataReturn.message="Lấy dữ liệu thành công"
    res.json(dataReturn)
}
exports.updateAccount = async (req, res, next)=>{
    let dataReturn ={
        status:200,
        message:"Cập nhật tài khoản thành công"
    }
    let passwd = req.body.passwd ||"";
    let fullname = req.body.fullname||"";
    let avatar = req.body.avatar||""
    let email = req.body.email||""
    try {
        let Account = await accountModel.accountModel.findOne({_id:req.params.idAccount}).populate("roleId")
        let accountUpdate = Account
        if(passwd!=""&& fullname!=""&&email!=""&& avatar!=""){
            const salt = await bcrypt.genSalt(15)
            let pass = await bcrypt.hash(passwd, salt);
            console.log("step1");
            accountUpdate.passwd = pass
            accountUpdate.fullname = req.body.fullname
            accountUpdate.avatar = req.body.avatar
            accountUpdate.email = req.body.email
            await accountModel.accountModel.updateOne({_id:req.params.idAccount}, accountUpdate)
    
            return res.json(dataReturn)
        }else{
            console.log("step2");
            if(passwd!=""){
                const salt = await bcrypt.genSalt(15)
                let pass = await bcrypt.hash(passwd, salt);
                accountUpdate.passwd = pass
              
            }else{
                accountUpdate.passwd = Account.passwd
            }
            if(fullname!=""){
                accountUpdate.fullname = fullname
              
            }else{
                accountUpdate.fullname = Account.fullname
            }
            if(avatar!=""){
                accountUpdate.avatar = avatar
            }else{
                accountUpdate.avatar = Account.avatar
               
            }
            if(email!=""){
                accountUpdate.email = email
            }else{
                accountUpdate.email = Account.email
            }
            await accountModel.accountModel.updateOne({_id:req.params.idAccount}, accountUpdate)
            return res.json(dataReturn)
    
        }
    } catch (error) {
        dataReturn.message=error
        dataReturn.status=500
    }
   
}
exports.confiPass = async (req, res, next)=>{
    let dataReturn ={
        message:"Xác nhận đúng mật khẩu",
        status:200
    }
    let passwdOld = req.body.passwd||null
    let username = req.body.username||null

    try {
        if(username!=""&&passwdOld!=""){
            let ac = await accountModel.accountModel.findOne({username:username}).populate("roleId")
            console.log(ac);
            let checkPass = await bcrypt.compare(passwdOld, ac.passwd)
            console.log(checkPass);
            if(checkPass==true){
                dataReturn.data = checkPass;
                dataReturn.message="Xác nhận đúng mật khẩu"
                dataReturn.status=200
            }else{
                dataReturn.data = checkPass;
                dataReturn.message="Sai mật khẩu"
                dataReturn.status=200
            }
            
        }
    } catch (error) {
        dataReturn.message=error
        dataReturn.status=500
    }
    return res.json(dataReturn)
}