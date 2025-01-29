import  { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const contactInfo = [
    { icon: Mail, info: 'contact@quizplaylearn.com' },
    { icon: Phone, info: '+1 (555) 123-4567' },
    { icon: MapPin, info: '123 Learning Street, Education City, EC 12345' }
  ];

  const footerLinks = {
    courses: [
      { label: 'Mathematics', href: '#' },
      { label: 'Science', href: '#' },
      { label: 'Languages', href: '#' },
      { label: 'Programming', href: '#' },
      { label: 'View All Courses', href: '#' }
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press Kit', href: '#' }
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'FAQ', href: '#' }
    ]
  };

  const FooterSection = ({ title, items }: {
    title: string;
    items: Array<{ label: string; href: string }>;
  }) => {
    const isExpanded = expandedSection === title.toLowerCase();

    return (
      <div className="border-b md:border-none border-neutral-600/20">
        <button
          className="flex items-center justify-between w-full py-4 md:py-0 md:cursor-default"
          onClick={() => toggleSection(title.toLowerCase())}
        >
          <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
          <ChevronDown 
            className={`w-5 h-5 md:hidden transition-transform text-gray-400 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </button>
        <ul 
          className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-48 pb-4' : 'max-h-0 md:max-h-none'
          }`}
        >
          {items.map((link, index) => (
            <li key={index}>
              <a 
                href={link.href}
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors block py-1"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="bg-[#171717] border-t border-neutral-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 lg:py-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-xl font-bold text-indigo-400">QuizPlay Learn</h2>
            <p className="text-sm text-gray-400 max-w-xs">
              Empowering learners worldwide with interactive courses and engaging quizzes.
            </p>
            {/* Contact Information */}
            <div className="space-y-2 border-b md:border-none border-neutral-600/20 pb-4 md:pb-0">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center text-sm text-gray-400">
                  <item.icon className="w-4 h-4 mr-2 flex-shrink-0 text-indigo-400" />
                  <span className="break-words">{item.info}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FooterSection title="Courses" items={footerLinks.courses} />
              <FooterSection title="Company" items={footerLinks.company} />
              <FooterSection title="Support" items={footerLinks.support} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-600/20 py-6">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center space-y-4 space-y-reverse md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} QuizPlay Learn. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-500 hover:text-indigo-400 transition-colors p-2"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;