import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/common/items/Loader';
import { fetchAboutContent } from '../features/user/actions/aboutThunks';

const About = () => {
  const dispatch = useDispatch();
  const { about, loading, error } = useSelector(state => state.about);

  useEffect(() => {
    dispatch(fetchAboutContent());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!about) return null;

  const {
    companyHistory,
    commitmentToQuality,
    ownerInfo,
    customerTestimonials,
    loyaldogsImage,
    serviceAreas,
  } = about;

  return (
    <div className="px-4 py-4 mt-28 md:px-10 lg:px-20 max-w-screen-xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-6">
        About Dirt Dogs Excavating
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Owner Info */}
        <div className="lg:w-1/3 text-center lg:text-left">
          <img
            src={ownerInfo.image}
            alt={ownerInfo.name}
            className="rounded shadow-md mb-6 mx-auto"
          />
          <h3 className="text-xl font-semibold mb-2">{ownerInfo.name}</h3>
          <p>Dirt Dogs Excavating</p>
          <p>{ownerInfo.address}</p>
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            <p>📞 {ownerInfo.phone}</p>
            <p>
              📧{' '}
              <a href={`mailto:${ownerInfo.email}`} className="text-red-700 hover:underline">
                {ownerInfo.email}
              </a>
            </p>
          </div>
        </div>

        {/* About Content */}
        <div className="lg:w-2/3 space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-2">{companyHistory.title}</h2>
            <p>{companyHistory.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Customer Testimonials</h2>
            {customerTestimonials.map(t => (
              <blockquote key={t._id} className="italic mb-2 text-sm">
                "{t.message}" – {t.name}
              </blockquote>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">{commitmentToQuality.title}</h2>
            <p>{commitmentToQuality.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Loyal Dirt Dogs!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {loyaldogsImage.map((url, index) => (
                <img key={index} src={url} alt={`dog-${index + 1}`} className="rounded shadow-sm" />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Service Areas</h2>
            <ul className="list-disc list-inside">
              {serviceAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
