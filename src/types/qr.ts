export type QrContentType = 'url' | 'text' | 'wifi' | 'vcard' | 'whatsapp' | 'email' | 'upi' | 'instagram' | 'sms' | 'pdf' | 'image';

export type QrDotStyle = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';

export type QrEyeFrameStyle = 'square' | 'circle' | 'rounded';

export type QrEyeBallStyle = 'square' | 'circle';

export type QrPresetTheme = 
  | 'custom'
  | 'instagram'
  | 'neon'
  | 'emerald'
  | 'sunset'
  | 'gold'
  | 'whatsapp'
  | 'minimal-dark';

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  jobTitle: string;
  website: string;
}

export interface WhatsappData {
  phone: string;
  message: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface UpiData {
  vpa: string;
  name: string;
  amount: string;
  note: string;
}

export interface InstagramData {
  username: string;
}

export interface SmsData {
  phone: string;
  message: string;
}

export interface QrOptions {
  contentType: QrContentType;
  url: string;
  text: string;
  wifi: WifiData;
  vcard: VCardData;
  whatsapp: WhatsappData;
  email: EmailData;
  upi: UpiData;
  instagram: InstagramData;
  sms: SmsData;

  // Preset Theme ID
  presetTheme?: QrPresetTheme;

  // Styling
  dotStyle: QrDotStyle;
  eyeFrameStyle: QrEyeFrameStyle;
  eyeBallStyle: QrEyeBallStyle;
  
  // Colors
  useGradient: boolean;
  dotColor: string;
  gradientColor2: string;
  gradientRotation: number;
  bgColor: string;
  eyeFrameColor: string;
  eyeBallColor: string;

  // Logo
  logoUrl: string | null;
  logoSize: number; // 0.1 to 0.4
  logoMargin: number;

  // Dimensions & Quality
  size: number; // 300 to 2000
  margin: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
}
