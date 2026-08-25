// src/components/Certifications.tsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const certifications = [
  {
    title: 'Youth Can Stop Radicalization',
    organization: 'Erasmus+ / Council of the EU',
    date: 'Apr – May 2023',
    location: 'Kobuleti, Georgia',
    link: 'https://github.com/yigitckk/certificates/blob/main/Youthpass_%20YI%C4%9EIT%20%C3%87ELIK.pdf',
  },
  {
    title: 'Model United Nations (MUN) Training',
    organization: 'Marmara Teknokent — TÜBİTAK',
    date: 'Dec 2022',
  },
  {
    title: 'Democracy: A Journey From Ancient Times to Present',
    organization: 'Erasmus+ / Council of the EU',
    date: 'Dec 2021',
    location: 'Vila-Real, Spain',
  },
  {
    title: 'AFAD Volunteer System & Crisis Awareness',
    organization: 'AFAD — T.C. İçişleri Bakanlığı',
    date: 'Jul 2021',
  },
  {
    title: 'Human Beneficiary National Technology Competition',
    organization: 'TEKNOFEST',
    date: 'Sep 2020',
    note: 'Holographic education system for middle school science.',
  },
  {
    title: 'PCAP: Programming Essentials in Python',
    organization: 'Cisco Networking Academy',
    date: 'Jun 2020',
  },
  {
    title: 'Our Cultural Differences Are Wealth of Humanity',
    organization: 'Erasmus+ / Council of the EU',
    date: 'Mar 2020',
    location: 'Turkey',
  },
  {
    title: 'Cooperation for Innovation & Exchange of Good Practices',
    organization: 'Erasmus+ / Council of the EU',
    date: 'Sep 2019',
    location: 'Romania',
  },
  {
    title: 'Cooperation for Innovation & Exchange of Good Practices',
    organization: 'Erasmus+ / Council of the EU',
    date: 'Apr 2019',
    location: 'Poland',
  },
];

const Certifications: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', py: theme.spacing(4) }}>
      <Typography
        variant="overline"
        sx={{ color: theme.palette.text.secondary, letterSpacing: 2, mb: theme.spacing(3), display: 'block' }}
      >
        Certifications & Programs
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {certifications.map((cert, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: theme.spacing(2),
              py: theme.spacing(1.75),
              borderBottom: i < certifications.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
            }}
          >
            <Box>
              {cert.link ? (
                <Link
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ fontWeight: 500, fontSize: '0.9rem', color: theme.palette.text.primary }}
                >
                  {cert.title}
                </Link>
              ) : (
                <Typography sx={{ fontWeight: 500, fontSize: '0.9rem', color: theme.palette.text.primary }}>
                  {cert.title}
                </Typography>
              )}
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mt: 0.25 }}>
                {cert.organization}{cert.location ? ` · ${cert.location}` : ''}{cert.note ? ` · ${cert.note}` : ''}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, flexShrink: 0, mt: 0.25 }}
            >
              {cert.date}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Certifications;
