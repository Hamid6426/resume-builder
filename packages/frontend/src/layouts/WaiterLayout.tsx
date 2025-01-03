import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-w-screen min-h-screen">
      <header>
        <Navbar/>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};