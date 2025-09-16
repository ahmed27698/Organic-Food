// src/app/[locale]/About/page.jsx
import Image from "next/image";

// Reusable card for "Why Choose Us"
function ChooseUsCard({ number, title, description }) {
  return (
    <div className="w-full lg:w-[400px] h-[350px] flex flex-col items-center justify-center bg-[#F9F5F0] shadow-lg rounded-lg text-center px-6 py-8 transition-transform hover:scale-105">
      <p className="text-4xl font-bold text-[#EEC044] mb-4">{number}</p>
      <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">{title}</h3>
      <p className="text-[#777777]">{description}</p>
    </div>
  );
}

// Reusable card for "Our Experts"
function TeamMemberCard({ image, name, title }) {
  return (
    <div className="w-[300px] h-[350px] flex flex-col items-center justify-center shadow-lg rounded-lg bg-white overflow-hidden transition-transform hover:scale-105">
      <Image
        src={image}
        alt={name}
        width={300}
        height={200}
        className="w-full h-[200px] object-cover"
      />
      <h3 className="text-xl font-bold text-[#2C2C2C] mt-4">{name}</h3>
      <p className="text-[#777777]">{title}</p>
    </div>
  );
}

export default async function AboutPage() {
  let expertsData = [];

  
try {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(
    `${baseUrl}/api/experts?limit=4`,
    { cache: "force-cache" }
  );

  if (res.ok) {
    expertsData = await res.json();
  } else {
    console.error("Failed to fetch experts:", res.status);
  }
} catch (err) {
  console.error("Error fetching experts:", err);
}

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[500px]">
        <Image
          src="/vegetables.jpg"
          alt="About Us background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
          <h1 className="font-bold lg:text-6xl md:text-4xl text-2xl">About Us</h1>
          <nav className="mt-3 text-gray-200">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            <span className="mx-2">|</span> About Us
          </nav>
        </div>
      </section>

      {/* Who We Are */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <Image
              src="/freshfood.jpg"
              alt="Fresh food"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-xl font-bold text-[#EEC044]">WHO WE ARE</h2>
            <h3 className="text-4xl font-bold mt-2 text-[#2C2C2C]">
              We are Professional Organic Food <br /> & Agriculture Farm
            </h3>
            <p className="mt-4 text-[#777777]">
              Sed ut perspiciatis unde omnis iste natus error voluptatem
              accusantium doloremque laudantium totam rem aperiam eaque quae
              abillo inventore veritatis.
            </p>
            <ul className="mt-4 text-[#2C2C2C] font-semibold space-y-2">
              <li>✔ 100% Organic food.</li>
              <li>✔ Professional Farmers.</li>
              <li>✔ Quality Products.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-xl font-bold text-[#EEC044] text-center">
          Why Choose Us
        </h2>
        <h3 className="text-4xl font-bold text-center mt-2 text-[#2C2C2C]">
          Our Values
        </h3>
        <p className="text-center mt-4 text-[#777777] max-w-2xl mx-auto">
          Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium
          doloremque laudantium totam rem aperiam eaque quae abillo inventore
          veritatis.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <ChooseUsCard
            number="01"
            title="100% Organic food"
            description="Organic foods are produced through..."
          />
          <ChooseUsCard
            number="02"
            title="Professional Farmers"
            description="Our skilled farmers ensure the highest quality."
          />
          <ChooseUsCard
            number="03"
            title="Quality Products"
            description="We guarantee the freshest and best products."
          />
        </div>
      </section>

      {/* Our Experts */}
      <section className="container mx-auto px-6 py-20 bg-[#F9F5F0]">
        <h2 className="text-xl font-bold text-[#EEC044] text-center">
          Team Member
        </h2>
        <h3 className="text-4xl font-bold text-center mt-2 text-[#2C2C2C]">
          Our Experts
        </h3>
        <p className="text-center mt-4 text-[#777777] max-w-2xl mx-auto">
          Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium
          doloremque laudantium totam rem aperiam eaque quae abillo inventore
          veritatis.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {expertsData.length > 0 ? (
            expertsData.map((expert , index) => (
              <TeamMemberCard
                key={expert.id || index}
                image={expert.image}
                name={expert.name}
                title={expert.title}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No experts found.</p>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-[#2C2C2C]">
          Subscribe to our Newsletter
        </h2>
        <p className="mt-4 text-[#777777]">
          Stay updated with our latest news and promotions.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email*"
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#EEC044]"
          />
          <button
            type="submit"
            className="bg-[#EEC044] text-white px-6 py-2 rounded-lg hover:bg-[#d6a73a]"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Organic Store. All rights reserved.</p>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <a href="/" className="hover:text-[#EEC044]">
              Home
            </a>
            <a href="/about" className="hover:text-[#EEC044]">
              About
            </a>
            <a href="/contact" className="hover:text-[#EEC044]">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}