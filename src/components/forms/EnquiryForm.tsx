import React, { useState } from 'react';

type ProjectType = 'Home Interior' | 'Kitchen' | 'Furniture' | 'Commercial Space' | 'Other' | '';

interface FormData {
  name: string;
  phone: string;
  requirement: ProjectType;
  message: string;
}

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    requirement: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    
    // Simple Indian phone validation (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.requirement) newErrors.requirement = 'Please select a project type.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const whatsappMessage = `Hello Ply Dot Com,

I would like to enquire about plywood.

Name: ${formData.name}
Phone: ${formData.phone}
Requirement: ${formData.requirement}
Message: ${formData.message || 'N/A'}

Please contact me regarding my requirement.`;

    const phone = "9108087962121";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 lg:gap-8" noValidate>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-small text-background font-medium tracking-wide">FULL NAME *</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-accent/30'} py-3 text-background focus:outline-none focus:border-accent transition-colors`}
          placeholder="Enter your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <span id="name-error" className="text-xs text-red-500 mt-1">{errors.name}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-small text-background font-medium tracking-wide">PHONE NUMBER *</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-500' : 'border-accent/30'} py-3 text-background focus:outline-none focus:border-accent transition-colors`}
          placeholder="10-digit mobile number"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && <span id="phone-error" className="text-xs text-red-500 mt-1">{errors.phone}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="requirement" className="text-small text-background font-medium tracking-wide">REQUIREMENT / PROJECT TYPE *</label>
        <select 
          id="requirement" 
          name="requirement"
          value={formData.requirement}
          onChange={handleChange}
          className={`w-full bg-transparent border-b ${errors.requirement ? 'border-red-500' : 'border-accent/30'} py-3 text-background focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer rounded-none`}
          aria-invalid={!!errors.requirement}
          aria-describedby={errors.requirement ? "requirement-error" : undefined}
        >
          <option value="" disabled className="text-primary">Select project type</option>
          <option value="Home Interior" className="text-primary">Home Interior</option>
          <option value="Kitchen" className="text-primary">Kitchen</option>
          <option value="Furniture" className="text-primary">Furniture</option>
          <option value="Commercial Space" className="text-primary">Commercial Space</option>
          <option value="Other" className="text-primary">Other</option>
        </select>
        {errors.requirement && <span id="requirement-error" className="text-xs text-red-500 mt-1">{errors.requirement}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-small text-background font-medium tracking-wide">ADDITIONAL MESSAGE</label>
        <textarea 
          id="message" 
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full bg-transparent border-b border-accent/30 py-3 text-background focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Tell us a bit more about your requirements (optional)"
        />
      </div>

      <div className="mt-4 flex flex-col items-start gap-3">
        <button 
          type="submit" 
          className="bg-accent text-primary hover:bg-surface px-8 py-4 text-sm tracking-widest uppercase transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 w-full sm:w-auto rounded-xl font-bold"
        >
          SEND ENQUIRY
        </button>
        <p className="text-xs text-background/60 italic">
          Your enquiry will open directly securely in WhatsApp.
        </p>
      </div>
      
    </form>
  );
};

export default EnquiryForm;
