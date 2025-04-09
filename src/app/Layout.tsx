import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Inter, Heebo } from 'next/font/google';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Font setup
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const heebo = Heebo({ subsets: ['hebrew'], variable: '--font-heebo' });

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'חנות בגדים אלפא - אופנה עכשווית בסגנון ישראלי',
  description = 'חנות בגדים אלפא - המקום הטוב ביותר לקנות בגדים איכותיים בסגנון ישראלי מודרני. מגוון רחב של פריטי אופנה לגברים ונשים.',
  ogImage = '/images/og-image.jpg',
}) => {
  const router = useRouter();
  const canonicalUrl = `https://www.alpha-clothing.co.il${router.asPath}`;
  
  // Structured data for clothing store
  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'חנות בגדים אלפא',
    image: ogImage,
    '@id': canonicalUrl,
    url: canonicalUrl,
    telephone: '+972-3-1234567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'רחוב אלנבי 123',
      addressLocality: 'תל אביב',
      postalCode: '6123402',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.0853,
      longitude: 34.7818,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '₪₪-₪₪₪',
  };

  return (
    <div className={`${inter.variable} ${heebo.variable} font-heebo`} dir="rtl" lang="he">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="he_IL" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
        
        {/* RTL Direction */}
        <html lang="he" dir="rtl" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        
        <main className="flex-grow">
          {/* Neumorphic + Glassmorphism container */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="glassmorphism-container backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl p-6 md:p-8 shadow-xl">
              {children}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Layout;