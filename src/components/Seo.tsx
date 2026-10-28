// src/components/Seo.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../data/projects';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  jsonLd?: object | object[];
}

const DEFAULT_IMAGE = '/images/projects/f1-strategy-lab/og.jpg';

const abs = (u: string) => (u.startsWith('http') ? u : `${SITE_URL}${u}`);

const Seo: React.FC<SeoProps> = ({ title, description, path, image = DEFAULT_IMAGE, type = 'website', jsonLd }) => {
  const url = abs(path);
  const img = abs(image);
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="yigitc.tech" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yiğit Çelik',
  url: SITE_URL,
  jobTitle: 'Backend Engineer · Applied AI · Sign CAD & 3D',
  address: { '@type': 'PostalAddress', addressLocality: 'Manisa', addressCountry: 'TR' },
  sameAs: ['https://github.com/yigitckk', 'https://www.linkedin.com/in/yigitck/', 'https://x.com/yigitopt'],
};
