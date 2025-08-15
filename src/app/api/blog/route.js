const blogs = [
    {   
        id:1,   
        image:"https://broccolisite.netlify.app/assets/blog_1-D7I6C3-p.webp",
        subText:"Consultant",
        mainText:"Electric Car Maintenance, Servicing & Replacing",
        date:"June 22, 2025"
    },
    {   
        id:2,
        image:"https://broccolisite.netlify.app/assets/blog_3-XUdCXpEu.webp",
        subText:"Lifestyle",
        mainText:"How to: Make Your Tires Last Longer",
        date:"June 23, 2024"
    },
    {   
        id:3,
        image:"https://broccolisite.netlify.app/assets/his2-DS67SOog.webp",
        subText:"Creative",
        mainText:"How to Prepare for Your First Track Day!",
        date:"June 22, 2024"
    },
    {   
        id:4,
        image:"https://broccolisite.netlify.app/assets/blog_4-sUAQItUN.webp",
        subText:"Technology",
        mainText:"Common Engine Oil Problems and Solutions",
        date:"June 24, 2024"
    },
    {   
        id:5,
        image:"https://broccolisite.netlify.app/assets/blog_5-DgfoVE5a.webp",
        subText:"Health",
        mainText:"How and when to replace brake rotors",
        date:"June 25, 2024"
    },
]

export async function GET(request){
    return new Response (JSON.stringify(blogs),{
        status:200,
        headers:{'Content-Type':'application/json'}
    });
}