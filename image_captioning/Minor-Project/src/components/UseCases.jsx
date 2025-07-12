import { useCases } from "../constants";

const UseCases = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 opacity-0 translate-y-6 transition-all duration-500 ease-out">
            Who Can Use It?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto opacity-0 translate-y-6 transition-all duration-500 ease-out delay-100">
            Perfect for everyone who shares photos online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} p-6 rounded-xl hover:shadow-md transition duration-300 opacity-0 translate-y-6 transition-all duration-500 ease-out`}
              style={{ transitionDelay: `${100 + (index * 100)}ms` }}
            >
              <span className="text-4xl mb-4 block">{item.emoji}</span>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;