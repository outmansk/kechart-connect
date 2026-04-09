import { useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import AboutSection from '@/components/landing/AboutSection';
import AtaaSection from '@/components/landing/AtaaSection';
import EditionsSection from '@/components/landing/EditionsSection';
import ProjectsSection from '@/components/landing/ProjectsSection';
import PartenariatSection from '@/components/landing/PartenariatSection';
import CollaborateursSection from '@/components/landing/CollaborateursSection';
import ContactSection from '@/components/landing/ContactSection';
import SocialCTA from '@/components/landing/SocialCTA';
import Footer from '@/components/landing/Footer';
import VolunteerModal from '@/components/landing/VolunteerModal';

export default function Index() {
  const [volunteerOpen, setVolunteerOpen] = useState(false);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <Hero onVolunteer={() => setVolunteerOpen(true)} />
      <AboutSection />
      <AtaaSection />
      <EditionsSection />
      <ProjectsSection />
      <PartenariatSection onContact={scrollToContact} />
      <CollaborateursSection />
      <ContactSection />
      <SocialCTA />
      <Footer />
      <VolunteerModal open={volunteerOpen} onClose={() => setVolunteerOpen(false)} />
    </>
  );
}
