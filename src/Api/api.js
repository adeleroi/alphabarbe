export const BaseUrl = "http://localhost:5000";

export const subscribe = emailValue => {
    const promesse =  fetch(`${BaseUrl}/subscribe`, {
        headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*"
        },
        method: "POST",
        body: JSON.stringify({email: emailValue, js: true })
        }).
        then(res => {
        // console.log(res)
        if(res.status === 200) {
            return res
        }else {
            return false
        }
    })
    return promesse;
}

