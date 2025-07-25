import Shadow from "../../assets/bgshadow.svg";
import User1 from "../../assets/users/user1.png";
import User2 from "../../assets/users/user2.png";
import User3 from "../../assets/users/user3.png";
import User4 from "../../assets/users/user4.png";

const testimonials = [
  {
    quote:
      "DeepRead AI helped me reflect on a message in ways I never imagined.",
    name: "Jane Cooper",
    position: "Product Manager",
    image: User1,
  },
  {
    quote: "I finally understood how I was sounding in chats. Game changer.",
    name: "Ralph Edwards",
    position: "Customer Success Lead",
    image: User2,
  },
  {
    quote:
      "It gave me honest, kind analysis — something I needed more than advice.",
    name: "Courtney Henry",
    position: "Content Creator",
    image: User3,
  },
  {
    quote: "It decoded everything without feeling robotic. I felt heard.",
    name: "Cameron Williamson",
    position: "UX Designer",
    image: User4,
  },
];

export default function TestimonialSection() {
  return (
    <section className="relative bg-purple-700 text-white px-6 py-26 overflow-hidden">
      {/* Left Side SVG */}
      <img
        src={Shadow}
        alt="Background Decor"
        className="absolute -left-24  h-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto text-center">
        <p className="text-sm text-yellow-300 font-semibold uppercase mb-2">
          What our users say
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Understand Conversations Like Never Before
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mb-12">
          Hear from people who found clarity, healing, and emotional insight
          through DeepRead AI’s message reflections.
        </p>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white  text-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col gap-2 items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10  rounded-full object-cover"
                />
                <div className="text-center">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.position}</p>
                </div>
              </div>
              <p className="text-lg mb-5 pt-4">{item.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
