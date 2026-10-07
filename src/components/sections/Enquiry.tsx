import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EnquiryForm from '../forms/EnquiryForm';
import WhatsAppButton from '../ui/WhatsAppButton';


gsap.registerPlugin(ScrollTrigger);

const Enquiry: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        }
      });

      const leftElements = leftColRef.current?.children ? Array.from(leftColRef.current.children) : [];
      const formEl = formColRef.current;

      gsap.set(leftElements, { opacity: 0, y: 20 });
      gsap.set(formEl, { opacity: 0, y: 30 });

      tl.to(leftElements, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' })
        .to(formEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.4");
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-primary pt-16 pb-24 md:pt-24 md:pb-32 px-6 md:px-12 border-t border-accent/10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column - Typography & Contact Options */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col pt-4">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-eyebrow text-accent">HAVE A PROJECT IN MIND?</p>
            </div>

            <h2 className="text-h2 text-background mb-12 max-w-md">
              LET'S FIND THE <br className="hidden md:block" />
              <span className="italic text-accent">RIGHT PLYWOOD</span> <br className="hidden md:block" />
              FOR YOUR PROJECT.
            </h2>

            <p className="text-body text-background/80 mb-16 max-w-md">
              Tell us a bit about your requirement. We'll guide you through our material options and help you choose with confidence.
            </p>

            <div className="flex flex-col gap-6 border-t border-accent/10 pt-12">
              <h3 className="text-small text-background/60 tracking-widest uppercase">Direct Contact Options</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <WhatsAppButton variant="secondary" className="rounded-full font-bold">
                  WHATSAPP US
                </WhatsAppButton>
                
                <a 
                  href="tel:08087962121" 
                  className="btn-glassy inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-sm tracking-widest uppercase text-center"
                  aria-label="Call us directly"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  CALL US
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Enquiry Form */}
          <div ref={formColRef} className="lg:col-span-6 lg:col-start-7 bg-secondary/40 rounded-3xl p-8 md:p-12 lg:p-16 border border-accent/10">
            <h3 className="text-h3 text-background mb-8">Send an Enquiry</h3>
            <EnquiryForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Enquiry;
