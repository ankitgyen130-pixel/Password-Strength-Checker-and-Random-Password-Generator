let passwordField=document.querySelector("#password");
let feedbackField=document.querySelector("#feedback");
passwordField.addEventListener('input',()=>{
    if(passwordField.value===""){
        feedbackField.textContent="Blank";
        feedbackField.style.color="white";
        return;
    }
    let strength=findStrengthOfPassword(passwordField.value);
    if(strength<=0){
        feedbackField.textContent="Not Valid";
        feedbackField.style.color="white";
    }else if(strength>0 && strength<=40){
        feedbackField.textContent="Easy";
        feedbackField.style.color="red";
    }else if(strength>40 && strength<80){
        feedbackField.textContent="Medium";
        feedbackField.style.color="yellow";
    }else{
        feedbackField.textContent="Hard";
        feedbackField.style.color="green";
    }
    return;
})

function findStrengthOfPassword(password){
    let strength=0;


    if(password.length<10){         //length <= 10 => password is not valid
        
        document.querySelector("#length_criteria_fullfilled").textContent="❌";
        document.querySelector("#lowercase_present").textContent="❔";
        document.querySelector("#uppercase_present").textContent="❔";
        document.querySelector("#digit_present").textContent="❔";
        document.querySelector("#special_character_present").textContent="❔";
        document.querySelector("#repeating_sequence_present").textContent="❔";
        document.querySelector("#special_sequence_present").textContent="❔";





        return -1;
    }else{
        document.querySelector("#length_criteria_fullfilled").textContent="✅";
    }
    strength+=password.length-10;   //larger password more safety



    if(/[a-z]/.test(password)){     //lowercase should present
        strength+=8;
        document.querySelector("#lowercase_present").textContent="✅";
    }else{
        document.querySelector("#lowercase_present").textContent="❌";
    }
    if(/[A-Z]/.test(password)){     //Uppercase should present
        strength+=10;
        document.querySelector("#uppercase_present").textContent="✅";
    }else{
        document.querySelector("#uppercase_present").textContent="❌";
    }
    if(/[0-9]/.test(password)){     //digit should present
        strength+=8;
        document.querySelector("#digit_present").textContent="✅";
    }else{
        document.querySelector("#digit_present").textContent="❌";
    }
    if(/[^a-zA-Z0-9]/.test(password)){
        strength+=12;
        document.querySelector("#special_character_present").textContent="✅";
    }else{
        document.querySelector("#special_character_present").textContent="❌";
    }



    if(!(/(.)\1{2,}/.test(password))){      //elements shouldn't repeat for 3 times
        strength+=20;
        document.querySelector("#repeating_sequence_present").textContent="✅";
    }else{
        document.querySelector("#repeating_sequence_present").textContent="❌";
    }



    strength+=new Set(password).size/password.length*20;     //# of unique_chatacter/total_#_of_character should be heigh



    const pattern=['01234567890','abcdefghijklmnopqrstuvwxyz','qwertyuiopasdfghjklzxcvbnm'];        //repeating sequence like '1234', 'abcd','ABCD','aBcD' should not be present
    let passwordlower=password.toLowerCase();
    let special_sequence=false;
    let detectedSubPassword="";
    for(let i=0;i<passwordlower.length-3;i++){
        const subpassword=passwordlower.substr(i,4);
        for(let items of pattern){
            if(items.includes(subpassword)){
                special_sequence=true;
                detectedSubPassword=subpassword;
                strength-=10;
            }
        }
    }
    if(special_sequence){
        document.querySelector("#special_sequence_present").textContent="❌";
    }else{
        document.querySelector("#special_sequence_present").textContent="✅";
    }
    document.querySelector("#detected_sequence").textContent=((detectedSubPassword==="")?"None":detectedSubPassword);

    return strength;
}



document.querySelector('#generate_password').addEventListener('click',()=>{
    document.querySelector("#generated_password").textContent=GenerateRandomPassword();
});
function GenerateRandomPassword(){
    let randomPassword="";
    const character=['1','2','3','4','5','6','7','8','9','0','-','=','q','w','e','r','t','y','u','i','o','p','[',']','a','s','d','f','g','h','j','k','l',';','z','x','c','v','b','n','m',',','.','/',
        '!','@','#','$','%','^','&','*','(',')','_','+','Q','W','E','R','T','Y','U','I','O','P','{',',','}','|','A','S','D','F','G','H','J','K','L',':','"','Z','X','C','V','B','N','M','<','>','?'];
    for(let i=0;i<16;i++){
        randomPassword+=character[Math.floor(Math.random()*character.length)]
    }
    return randomPassword;
}
