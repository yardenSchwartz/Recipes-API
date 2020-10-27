export function isMoreThanOneChar(value) {
    if (!value) return true;
    return value.length > 1 ;
  }


  export function queryparams(value) {
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return false;
    } else return true;
}
  

//   export function firstNameparams() {
//     if (!/^[a-zA-Z\s]*$/.test(this.form.firs)) {
//       return false;
//     } else return true;
//   }