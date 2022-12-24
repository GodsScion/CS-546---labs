(function (){
    function isNotPrime(num){
        if(!num) throw "No input given";
        if(typeof num != "number") throw "Only numbers are allowed";
        if(isNaN(num)) throw "NaN values are not allowed";
        if(num<1) return `${num} is NOT a prime number, numbers less than 1 are not prime numbers`;
        if(num === 1) return '1 is neither a prime nor a composite number'; 
        let factors = [];
        if(num > 1){
            for(let i = 1; i<Math.ceil(num/2); i++){
                if(num%i === 0) factors.push(i)
            }
            if(factors.length>1){
                factors.push(num);
                return `${num} is a Not a prime number but it is a composite number.\nIt's factors are ${factors}.`;
            } 
            else{
                msg = false;
            }
        }
    }
        
    
    
    const check = document.getElementById("check-prime");
    if(check){
        const number=document.getElementById("number")
        const ul = document.getElementById("attempts");
        
    
        check.addEventListener("submit",(event)=>{
            event.preventDefault();
            try{
                const num = parseInt(number.value)
                const msg = isNotPrime(num);
                const li = document.createElement("li");
    
                if (msg) {
                    li.appendChild(document.createTextNode(msg));
                    li.setAttribute("class", "not-prime");
                  }
                  else {
                    li.appendChild(document.createTextNode(`${num} is a prime number`));
                    li.setAttribute("class", "is-prime");

                  }
                  ul.appendChild(li);
                } catch (e) {
                  const message = typeof e === 'string' ? e : e.message;
                  alert(`${message}`);
                }
            
        })
    }
    
    })();

