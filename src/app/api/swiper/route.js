const products = [
    {id:1,
    supText:'100% genuine Products',
    mainText:"Tasty & HealthyOrganic Food",
    buttonOne:'Explore Products',
    image:'https://broccolisite.netlify.app/assets/sectionOne_1-BxzRm0Ci.webp'
    },

    {id:2,
    supText:'100% genuine Products',
    mainText:"Our Garden's MostFavorite Food",
    supParagraph:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.",
    buttonOne:'Explore Products',
    buttonTwo:'Learn More',
    image:'https://broccolisite.netlify.app/assets/sectionOne_2-CA1RPugf.webp'
    
    }
]

export async function GET(request){
    return new Response (JSON.stringify(products),{
        status:200,
        headers:{'Content-Type':'application/json'}
    });
}