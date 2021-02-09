export default function validateInfo(values) {
  let errors = {};
  errors.AadhaarNo = (values.AadhaarNo.length==12 && parseInt(values.AadhaarNo)>0 && Math.sign(values.AadhaarNo)!==NaN && Math.sign(values.AadhaarNo)>-1);
  errors.password = (values.password.length>7 );
  errors.phoneNum = (parseInt(values.phoneNum)>=1000000000 && parseInt(values.phoneNum)<=9999999999 );
  errors.age = parseInt(values.age)<121 && parseInt(values.age)>0 ;
  errors.cpassword = (values.cpassword)==(values.password);
  errors.final=(parseInt(values.AadhaarNo)!==0 && parseInt(values.phoneNum)!==0 && values.password!==0 && values.name!=="0" && values.email!=="0" && values.cpassword!==0 && parseInt(values.age)!==0 && errors.AadhaarNo && errors.password && errors.phoneNum && errors.cpassword && errors.age);
  
  return errors;
}