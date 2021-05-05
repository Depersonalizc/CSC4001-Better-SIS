
const baseURL = "http://175.24.4.124:5000";


export async function SignIn(formData) {
  let targetURL = `${baseURL}/signin`;
  let resp = await( fetch(targetURL, {
    method: "POST",
    mode: "cors",
    body: formData,
  }) );
  let json = await( resp.json() );
  console.log(`return json = ${ JSON.stringify(json) }`);

  return new Promise((resolve, reject) => {
    resolve(json);
  });
}


export async function SignUp(formData) {
  let targetURL = `${baseURL}/signup`;
  let resp = await( fetch(targetURL, {
    method: "POST",
    mode: "cors",
    body: formData,
  }) );
  let json = await( resp.json() );
  console.log(`signup return json = ${ JSON.stringify(json) }`);

  return new Promise((resolve, reject) => {
    resolve(json);
  });
}


export async function getTermList() {
  const targetURL = `${baseURL}/getTermInfo`;
  let resp = await( fetch(targetURL, {
    method: "GET",
    mode: "cors",
  }) );
  let text = await( resp.text() );
  let array = eval( text );     // 数组字符串转成JS数组
  console.log(`array = ${array} with type = ${Object.prototype.toString.call(array)}`);
  
  return new Promise((resolve, reject) => {
    resolve(array);
  })
}