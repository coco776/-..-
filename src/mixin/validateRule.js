export const validateRules =  {
    
    data(){
        const phoneValidate = (rule, value, callback) => {
            const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if(reg.test(value)){
                return callback();
            }
            callback(new Error("请输入合法的手机号码"));
        } 
        return{
            // 登录和注册验证规则
            mainRules:{
                account:[
                    {required:true, message:"请输入账号", trigger:'blur'}
                ],
                password:[
                    {required:true, message:"请输入密码", trigger:'blur'}
                ],
                phone:[
                    {required:true, message:"请输入手机号码", trigger:'blur'},
                    {validator:phoneValidate,trigger:'blur'}
                ],
                captcha:[
                    {required:true, message:"请输入验证码", trigger:'blur'}
                ],
                name:[
                    {required:true, message:"请输入昵称", trigger:'blur'}
                ]
            }
        }
    }, 
}
// /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
