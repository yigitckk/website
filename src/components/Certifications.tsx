import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Link } from '@mui/material';

const Certifications: React.FC = () => {
  const certifications = [
    {
      title: 'Youth Can Stop Radicalization',
      organization: 'Council of the European Union in Kobuleti, Georgia',
      date: '22 April - 1 May 2023',
      id: '5T5Y-11UC-1F3D-ZRWR',
      description:
        'Participating in the "Youth Can Stop Radicalization" project, supported by the European Union\'s Erasmus+ Programme, was a transformative and impactful experience that deepened my understanding of global challenges such as violent extremism and youth radicalization. This youth exchange brought together 36 participants from six diverse countries—Bulgaria, Egypt, Georgia, Germany, Hungary, and Türkiye—to collaborate on fostering tolerance, intercultural dialogue, and critical thinking among marginalized youth.',
      link: 'https://github.com/yigitckk/certificates/blob/main/Youthpass_%20YI%C4%9EIT%20%C3%87ELIK.pdf',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Council_of_the_EU_and_European_Council.svg',
    },
    {
      title: 'Model United Nations (MUN) Training',
      organization: 'Marmara Teknokent - TÜBİTAK',
      date: '9-11 December 2022',
      id: '2019-1-LTO1-KA229-060456',
      description:
        'Participating in the Model United Nations (MUN) Training at Marmara Teknokent, supported by TÜBİTAK, provided me with invaluable skills in diplomacy, negotiation, and global problem-solving. Through simulating real-world UN scenarios, I honed my public speaking, critical thinking, and teamwork abilities while gaining a deeper understanding of international relations and global challenges.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/T%C3%BCrkiye_Bilimsel_ve_Teknolojik_Ara%C5%9Ft%C4%B1rma_Kurumu_logo.svg/220px-T%C3%BCrkiye_Bilimsel_ve_Teknolojik_Ara%C5%9Ft%C4%B1rma_Kurumu_logo.svg.png',
      
    },
    {
      title: 'Democracy; A Journey From Ancient Times to Present',
      organization: 'Council of the European Union - Erasmus+ Programme',
      date: '5-11 December 2021',
      id: '2019-1-LTO1-KA229-060456',
      description:
        'Participating in the "Democracy; A Journey From Ancient Times to Present" project in Vila-Real, Spain, under the Erasmus+ Programme, was a transformative experience that deepened my understanding of democratic principles and their evolution over centuries. Through interactive workshops, discussions, and cultural exchanges, I explored the historical foundations of democracy, its modern-day applications, and the challenges it faces in contemporary society.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Council_of_the_EU_and_European_Council.svg',
    },
    {
      title: 'AFAD Volunteer System and Crisis Awareness Training',
      organization: 'T.C. İçişleri Bakanlığı Afet ve Acil Durum Yönetimi Başkanlığı - AFAD',
      date: 'July 2021',
      id: '',
      description:
        'Participating in the AFAD Volunteer System and Crisis Awareness Training provided me with essential knowledge and skills to effectively respond to emergencies and crises. Organized by the Disaster and Emergency Management Authority (AFAD), this training emphasized the importance of preparedness, coordination, and community resilience in disaster management.',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDeWL_R6c5Np_vz8JhZBGlywowIAYhzxp5aQ&s',
    },
    {
      title: 'Human Beneficiary National Technology Competition',
      organization: 'TEKNOFEST',
      date: 'September 2020',
      id: '',
      description:
        'Participating in the Human Beneficiary National Technology Competition was an inspiring and innovative journey aimed at leveraging technology to improve educational outcomes. Our team worked on developing a holographic system designed to enhance the quality of science education in middle schools, making complex scientific concepts more engaging, interactive, and accessible for students.',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOI-TwNi6L15KeG4OXLBwMGS9BRo3Vw0zaShbikTX68rFACZF6a7vj4OMwQIQWid5C9nA&usqp=CAU',
    },
    {
      title: 'PCAP: Programming Essentials in Python',
      organization: 'Cisco Networking Academy',
      date: 'June 2020',
      id: '',
      description:
        'Participating in the PCAP: Programming Essentials in Python programme, supported by the Ministry of Education and in collaboration with Cisco, was an exciting and enriching experience that significantly enhanced my programming skills. Over the course of this one-month programme, I developed a strong foundation in Python, one of the most versatile and widely-used programming languages today.',
      logo: 'https://www.cisco.com/web/fw/i/logo-open-graph.gif',
    },
    {
      title: 'Our Cultural Differences Are Wealth of Humanity (Erasmus+ Programme) - Turkey',
      organization: 'Council of the European Union',
      date: 'March 2020',
      id: '2018-1-RO0-KA229-049600_2',
      description:
        'Participating in the "Our Cultural Differences Are Wealth of Humanity" project, supported by the European Union\'s Erasmus+ Programme, was a transformative experience that deepened my understanding of cultural diversity and intercultural communication. This project brought together students from various countries to explore and appreciate different cultures, fostering mutual respect and collaboration.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Council_of_the_EU_and_European_Council.svg',
    },
    {
      title: 'Cooperation for Innovation and the Exchange of Good Practices (Erasmus+ Programme) - Romania',
      organization: 'Council of the European Union',
      date: 'September 2019',
      id: '2018-1RO01-KA229-049600',
      description:
        'Participating in the "Cooperation for Innovation and the Exchange of Good Practices" project in Romania, supported by the European Union\'s Erasmus+ Programme, provided me with valuable insights into innovative practices and methodologies in education and research. This project focused on enhancing educational outcomes through collaborative efforts and knowledge sharing.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Council_of_the_EU_and_European_Council.svg',
    },
    {
      title: 'Cooperation for Innovation and the Exchange of Good Practices (Erasmus+ Programme) - Poland',
      organization: 'Council of the European Union',
      date: 'April 2019',
      id: '2018-1RO01-KA229-049600',
      description:
        'Participating in the "Cooperation for Innovation and the Exchange of Good Practices" project in Poland, supported by the European Union\'s Erasmus+ Programme, was an enriching experience that allowed me to learn about innovative educational approaches and best practices. This project emphasized the importance of collaboration and knowledge exchange in advancing educational standards and outcomes.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Council_of_the_EU_and_European_Council.svg',
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 }, // Responsive padding
        maxWidth: { xs: '100%', sm: '800px' }, // Limit width on larger screens
        margin: '0 auto', // Center the content
        mt: { xs: '60px', sm: '80px' }, // Add margin top to account for the fixed header
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' }, // Responsive font size
          textAlign: 'center',
          mb: 4,
        }}
      >
        Certifications
      </Typography>
      {certifications.map((cert, index) => (
        <Card
          key={index}
          sx={{
            mb: 3,
            transition: 'transform 0.3s ease', // Smooth hover effect
            '&:hover': {
              transform: 'scale(1.02)', // Slightly enlarge on hover
            },
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <CardMedia
              component="img"
              sx={{
                width: { xs: 100, sm: 151 }, // Responsive width for images
                height: { xs: 100, sm: 151 }, // Responsive height
                objectFit: 'contain', // Ensure the image fits within the container
                mr: { xs: 2, sm: 3 }, // Margin right for spacing
              }}
              image={cert.logo}
              alt={cert.organization}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Responsive font size
                  fontWeight: 'bold',
                }}
              >
                {cert.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  mt: 1,
                }}
              >
                {cert.organization}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Responsive font size
                  mt: 1,
                }}
              >
                {cert.date}
              </Typography>
              {cert.id && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.7rem', sm: '0.8rem' }, // Responsive font size
                    mt: 1,
                  }}
                >
                  Certification ID: {cert.id}
                </Typography>
              )}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
                  mt: 2,
                  lineHeight: 1.6, // Improve readability
                }}
              >
                {cert.description}
              </Typography>
              {cert.link && (
                <Link
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-block',
                    mt: 2,
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Download Certificate
                </Link>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Certifications;