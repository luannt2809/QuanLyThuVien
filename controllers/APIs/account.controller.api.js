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
    try {
        let Account = await accountModel.accountModel.findOne({_id:req.params.idAccount}).populate("roleId")
        let accountUpdate = Account
        if((req.body.passwd!=""&&req.body.passwd!=undefined)
        &&(req.body.fullname!=""&&req.body.fullname!=undefined)&&(req.body.email!=""&&req.body.email!=undefined)
        &&(req.body.avatar!=""&&req.body.avatar!=undefined) ){
            const salt = await bcrypt.genSalt(15)
            let pass = await bcrypt.hash(req.body.passwd, salt);
            console.log("step1");
            accountUpdate.passwd = pass
            accountUpdate.fullname = req.body.fullname
            accountUpdate.avatar = req.body.avatar
            accountUpdate.email = req.body.email
            await accountModel.accountModel.updateOne({_id:req.params.idAccount}, accountUpdate)
    
            return res.json(dataReturn)
        }else{
            console.log("step2");
            if(req.body.passwd!=""&&req.body.passwd!=undefined){
                accountUpdate.passwd = Account.passwd
            }else{
                const salt = await bcrypt.genSalt(15)
                let pass = await bcrypt.hash(req.body.passwd, salt);
                accountUpdate.passwd = pass
            }
            if(req.body.fullname!=""&&req.body.fullname!=undefined){
                accountUpdate.fullname = req.body.fullname
              
            }else{
                accountUpdate.fullname = Account.fullname
            }
            if(req.body.avatar!=""&&req.body.avatar!=undefined){
                accountUpdate.avatar = req.body.avatar
            }else{
                accountUpdate.avatar = Account.avatar
               
            }
            if(req.body.email!=""&&req.body.email!=undefined){
                accountUpdate.email = req.body.email
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