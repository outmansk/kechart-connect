import { useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import ImpactCounters from '@/components/landing/ImpactCounters';
import ProjectsSection from '@/components/landing/ProjectsSection';
import CollaborateursSection from '@/components/landing/CollaborateursSection';
import ContactSection from '@/components/landing/ContactSection';
import SocialCTA from '@/components/landing/SocialCTA';
import Footer from '@/components/landing/Footer';
import VolunteerModal from '@/components/landing/VolunteerModal';

export default function Index() {
  const [volunteerOpen, setVolunteerOpen] = useState(false);

  return (
    <>
      <Header />
      <Hero onVolunteer={() => setVolunteerOpen(true)} />
      <ImpactCounters />
      <ProjectsSection />
      <CollaborateursSection />
      <ContactSection />
      <SocialCTA />
      <Footer />
      <VolunteerModal open={volunteerOpen} onClose={() => setVolunteerOpen(false)} />
    </>
  );
}
