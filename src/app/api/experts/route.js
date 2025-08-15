const experts = [
    {
        image:'https://broccolisite.netlify.app/assets/adam-D8LrdnbM.webp',
        name:'Rosalina D. William',
        position:'// Founder //'
    },
    {
        image:'https://broccolisite.netlify.app/assets/team2-Bpe_iqMW.webp',
        name:'Kelian Anderson',
        position:'// ceo //'
    },
    {
        image:'https://broccolisite.netlify.app/assets/team3-D4iTESSa.webp',
        name:'Miranda H. Halim',
        position:'// Organic Farmer //'
    },
    {
        image:'https://broccolisite.netlify.app/assets/team4-BMh98Puq.webp',
        name:'Damble D. Browni',
        position:'// Organic Farmer //'
    },
    {
        image:'https://broccolisite.netlify.app/assets/team5-BppWBi9W.webp',
        name:'Aiden Benjamin',
        position:'// Organic Farmer //'
    },
    {
        image:'https://broccolisite.netlify.app/assets/team6-K--SYDq9.webp',
        name:'James Carter',
        position:'// Organic Farmer //'
    },
    {
        image:'https://broccolisite.netlify.app/assets/team7--UgpxUSo.webp',
        name:'William Gabriel',
        position:'// Organic Farmer //'
    },
    {
        image:'https://broccolisite.netlify.app/assets/team2-Bpe_iqMW.webp',
        name:'Adam Joseph',
        position:'// Organic Farmer //'
    },
]

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || experts.length;
    const limitedExperts = experts.slice(0, limit);

    return new Response (JSON.stringify(limitedExperts),{
        status:200,
        headers:{'Content-Type':'application/json'}
    });
}