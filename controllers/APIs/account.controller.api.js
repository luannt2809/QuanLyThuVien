const accountModel = require("../../models/user.model")
const bcrypt = require("bcrypt")
exports.login = async (req, res, next)=>{
    let dataReturn ={
        status:200,
        message:""
    }   
    let user = await accountModel.ModelUser.findOne({username:req.body.username}).populate("role")
    if(user!=null){
        let checkPass = await bcrypt.compare(user.passwd, req.body.passwd);
        if(checkPass==true){
            dataReturn.message="Đăng nhập thành công"
            dataReturn.status=200
        }else{
            dataReturn.message="Sai mật khẩu"
            dataReturn.status=204
            dataReturn.data = user
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
    let account = await accountModel.ModelUser.findOne({_id:idAccount}).populate("role")
    dataReturn.data =account
    dataReturn.message="Lấy dữ liệu thành công"
    res.json(dataReturn)
}
exports.updateAccount = async (req, res, next)=>{
    let dataReturn ={
        status:200,
        message:"Cập nhật tài khoản thành công"
    }
    let Account = await accountModel.ModelUser.findOne({_id:req.params.idAccount}).populate("role")
    let accountUpdate = Account
    if((req.body.passwd!=""||req.body.passwd!=null)
    &&(req.body.fullname!=""||req.body.fullname!=null)&&(req.body.image!=""||req.body.image!=null) ){
        const salt = await bcrypt.genSalt(15)
        let pass = await bcrypt.hash(req.body.passwd, salt);
        accountUpdate.passwd = pass
        accountUpdate.fullname = req.body.fullname
        accountUpdate.image = req.body.image
        await accountModel.ModelUser.updateOne({_id:req.params.idAccount}, accountUpdate)

        return res.json(dataReturn)
    }else{
        if(req.body.passwd!=""||req.body.passwd!=null){
            accountUpdate.passwd = Account.passwd
        }else{
            const salt = await bcrypt.genSalt(15)
            let pass = await bcrypt.hash(req.body.passwd, salt);
            accountUpdate.passwd = pass
        }
        if(req.body.fullname!=""||req.body.fullname!=null){
            accountUpdate.fullname = Account.fullname
        }else{
            accountUpdate.fullname = req.body.fullname
        }
        if(req.body.image!=""||req.body.image!=null){
            accountUpdate.image = Account.image
        }else{
            accountUpdate.image = req.body.image
        }
        await accountModel.ModelUser.updateOne({_id:req.params.idAccount}, accountUpdate)
        return res.json(dataReturn)

    }
}