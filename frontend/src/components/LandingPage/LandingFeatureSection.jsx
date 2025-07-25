import { FileText, Bot, Clock, Smile } from "lucide-react";

import FeatureImg from "../../assets/features.svg";

const LandingFeaturesSection = () => {
  return (
    <section className="px-6 md:px-16 py-20 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/*Text Content */}
        <div>
          <p className="text-sm font-semibold text-purple-600 mb-2">
            System Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl">
            Speed up your emotional insight process with AI-backed tools
            designed to give clarity, track growth, and foster self-awareness.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 text-purple-700 mb-1">
                <FileText size={20} />
                <h3 className="font-semibold">Clean Editor</h3>
              </div>
              <p className="text-gray-600">
                Focused layout with distraction-free writing. Just you and your
                words.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-purple-700 mb-1">
                <Bot size={20} />
                <h3 className="font-semibold">Smart Analysis</h3>
              </div>
              <p className="text-gray-600">
                Powerful AI breaks down tone, emotion, and readability in
                seconds.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-purple-700 mb-1">
                <Clock size={20} />
                <h3 className="font-semibold">History Tracking</h3>
              </div>
              <p className="text-gray-600">
                Access all past insights for better reflection and growth.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-purple-700 mb-1">
                <Smile size={20} />
                <h3 className="font-semibold">Mood Mapping</h3>
              </div>
              <p className="text-gray-600">
                Understand the emotional tone of your messages with clarity.
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mt-12 w-full flex justify-center px-4">
          <img
            src={FeatureImg}
            alt="App Screenshot"
            className="
      w-auto
      max-w-[260px]       
      sm:max-w-[380px]   
      md:max-w-[380px]   
      lg:max-w-[360px]   
      xl:max-w-[380px]
      2xl:max-w-[420px]
      object-contain
      rounded-xl
      transition-all duration-300 ease-in-out
    "
          />
        </div>
      </div>
    </section>
  );
};

export default LandingFeaturesSection;
