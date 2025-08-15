const prices = [
    {   
        price:49,
        isPopular:false
    },

    {   
        price:79,
        isPopular:true
    },

    {   
        price:99,
        isPopular:false
    }
]

export async function GET(request){
    return new Response (JSON.stringify(prices),{
        status:200,
        headers:{'Content-Type':'application/json'}
    });
}