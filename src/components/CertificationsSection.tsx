import React from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileText,
  Download,
  Sparkles,
  Leaf,
  Globe2,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CertificationsSection: React.FC = () => {
  const { addToast } = useShop();

  const certificates = [
    {
      id: 'CERT-OEKO-100',
      title: 'OEKO-TEX® Standard 100 Class I',
      subtitle: 'Testing for Harmful Substances (Direct Skin Contact & Infants)',
      authority: 'TESTEX Swiss Textile Testing Institute',
      scope: 'Raw silk, combed Egyptian cotton, linen, uniform twills & reactive digital printing inks.',
      validUntil: '2027 (Annual Audit Renewed)',
      badgeColor: '#00E676',
      icon: <Leaf className="w-6 h-6 text-[#00E676]" />,
    },
    {
      id: 'CERT-ISO-9001',
      title: 'ISO 9001:2015 Quality Management',
      subtitle: 'Textile Weaving, Dyeing, Finishing & Global Supply Logistics',
      authority: 'SIRIM QAS International Malaysia',
      scope: 'Standardized tensile yarn testing, computerized color spectrometer delta E < 0.5, zero defect quality control.',
      validUntil: '2028 Certified',
      badgeColor: '#D4AF37',
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
    },
    {
      id: 'CERT-CEA-GIZA',
      title: 'Cotton Egypt Association License',
      subtitle: '100% Authentic Extra-Long Staple Giza 87 DNA Verification',
      authority: 'Cotton Egypt Association (Cairo / Alexandria)',
      scope: 'Guaranteed pure DNA strand authenticity for all Egyptian cotton bolts produced and stocked.',
      validUntil: '2027 Gold Seal',
      badgeColor: '#38BDF8',
      icon: <CheckCircle2 className="w-6 h-6 text-[#38BDF8]" />,
    },
    {
      id: 'CERT-GRS-RECYCLED',
      title: 'Global Recycled Standard (GRS)',
      subtitle: 'Eco-Certified High-Tenacity Technical Filaments',
      authority: 'Control Union Certifications B.V.',
      scope: 'HydroShield outdoor ripstop and polyester twills utilizing traceable post-consumer recycled polymers.',
      validUntil: '2027 Green Tier',
      badgeColor: '#EAB308',
      icon: <Globe2 className="w-6 h-6 text-[#EAB308]" />,
    },
  ];

  const handleDownloadCert = (certTitle: string) => {
    addToast(
      'success',
      'Certificate PDF Ready',
      `Full lab audit report for ${certTitle} downloaded.`
    );
  };
  return (
    <section className="py-16 sm:py-24 bg-[#0A0A0A] text-white border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] text-xs font-semibold uppercase tracking-wider mb-4 font-luxury">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>International Compliance & Lab Accreditations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-luxury font-bold text-white mb-4">
            Certified Excellence & Safety Standards
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            Every bolt produced and stocked at The Universal Textile Manufacturing Sdn Bhd undergoes rigorous laboratory quality assurance for tensile strength, color fastness, and chemical safety.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#262626] hover:border-[#D4AF37]/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] border border-[#262626] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <span
                    className="text-[11px] font-mono font-bold px-3 py-1 rounded-full border"
                    style={{
                      borderColor: `${cert.badgeColor}40`,
                      backgroundColor: `${cert.badgeColor}15`,
                      color: cert.badgeColor,
                    }}
                  >
                    {cert.id}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {cert.title}
                </h3>
                <div className="text-xs text-[#9CA3AF] mb-3">
                  Issuer: <strong className="text-[#E5E7EB]">{cert.authority}</strong>
                </div>

                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-4">
                  {cert.scope}
                </p>
              </div>

              <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                <span className="text-xs text-[#71717A]">{cert.validUntil}</span>
                <button
                  onClick={() => handleDownloadCert(cert.title)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Audit PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lab Testing Matrix Strip */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#262626] text-xs text-[#9CA3AF] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">Need Custom Test Reports for Tender or Customs?</span>
              <p className="text-[11px] text-[#9CA3AF]">
                We provide Spectrophotometer Delta E color matching, ISO 105-X12 crocking, and flame retardancy test certificates for institutional tenders.
              </p>
            </div>
          </div>

          <a
            href="mailto:sales@universaltextile.com.my?subject=Request%20Custom%20Textile%20Audit%20Report"
            className="px-5 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-white border border-[#262626] font-semibold text-xs whitespace-nowrap transition-colors"
          >
            Request Custom Lab Audit
          </a>
        </div>
      </div>
    </section>
  );
};
