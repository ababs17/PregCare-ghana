
# PregCareGh 🤱🏿

**Your comprehensive maternal health companion, designed specifically for Ghanaian mothers.**

PregCareGh is a modern web application that combines traditional Ghanaian values with cutting-edge healthcare technology to provide expectant and new mothers with the tools they need for a healthy pregnancy journey.

## 🌟 Features

### 🔐 Authentication & User Management
- Secure user registration and login with Supabase Auth
- User profiles with personalized health information
- Social authentication support

### 📊 Health Monitoring
- Track vital signs (blood pressure, weight, temperature)
- Log symptoms and health concerns
- Visual health data trends and insights
- WHO-compliant health guidelines integration

### 📅 Cycle Tracking
- Menstrual cycle monitoring and predictions
- Fertile window calculations
- Period history and analytics
- Personalized cycle insights

### 🤰 Pregnancy Care
- Week-by-week pregnancy tracking
- Fetal development milestones
- Appointment scheduling and reminders
- Nutrition and exercise recommendations

### 🚨 Emergency Features
- Emergency contacts management
- Nearby healthcare facilities locator with GPS
- Direct emergency calling
- Risk alerts and notifications

### 💬 AI Health Assistant
- 24/7 AI-powered health chatbot
- Personalized health tips and advice
- Symptom assessment and guidance
- Educational content delivery

### 🎯 Personalized Experience
- Daily health tips based on user profile
- Progress tracking and goal setting
- Community support and forums
- Cultural sensitivity and local context

### 🌐 Connectivity Features
- Offline support with data synchronization
- Real-time notifications
- Progressive Web App (PWA) capabilities
- Cross-device synchronization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd pregcaregh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## 🏗️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - Row Level Security (RLS)

### State Management & Data Fetching
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Charts & Visualization
- **Recharts** - Data visualization library

### Other Libraries
- **React Router** - Client-side routing
- **date-fns** - Date manipulation
- **Sonner** - Toast notifications

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── cycle/           # Cycle tracking components
│   ├── emergency/       # Emergency feature components
│   └── ...
├── pages/               # Route components
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── utils/               # Helper functions
├── integrations/        # External service integrations
└── main.tsx            # Application entry point
```

## 🔧 Key Components

### Authentication
- **AuthContext**: Manages user authentication state
- **Auth & SignUp pages**: Handle user registration and login

### Health Features
- **HealthMonitoring**: Comprehensive health tracking
- **CycleTracking**: Menstrual cycle management
- **PregnancyCare**: Pregnancy journey tracking

### Emergency Services
- **EmergencyContacts**: Critical contact management
- **NearbyFacilities**: Healthcare facility locator
- **RiskAlerts**: Health risk notifications

### AI & Personalization
- **HealthChatbot**: AI-powered health assistant
- **PersonalizedTips**: Daily personalized recommendations

## 🛡️ Security Features

- **Row Level Security (RLS)** on all database tables
- **User authentication** with Supabase Auth
- **Data encryption** in transit and at rest
- **Privacy-first** design with user consent
- **HIPAA-compliant** data handling practices

## 🌍 Cultural Considerations

PregCareGh is designed with Ghanaian culture in mind:

- **Local Healthcare Integration**: Direct connections to Ghanaian hospitals and clinics
- **Cultural Sensitivity**: Respect for traditional practices alongside modern medicine
- **Community Support**: Built-in community features for peer support
- **Local Language Support**: Prepared for multilingual implementation
- **Mobile-First Design**: Optimized for mobile usage patterns in Ghana

## 📱 Mobile Features

- **Progressive Web App (PWA)** capabilities
- **Offline functionality** with data sync
- **Push notifications** for important reminders
- **GPS integration** for emergency services
- **Touch-optimized interface**

## 🔄 Data Management

### Database Tables
- `profiles` - User profile information
- `health_records` - Health monitoring data
- `cycle_data` - Menstrual cycle tracking
- `pregnancy_data` - Pregnancy-related information
- `emergency_contacts` - Emergency contact details
- `healthcare_facilities` - Local healthcare providers

### Real-time Features
- Live chat support
- Real-time health alerts
- Community updates
- Emergency notifications

## 🚀 Deployment

### Lovable Platform
1. Visit [Lovable](https://lovable.dev/projects/d203eaee-2298-4b75-bdb4-021f14032733)
2. Click "Share" → "Publish"
3. Your app will be live at `https://yourapp.lovable.app`

### Custom Domain
1. Navigate to Project → Settings → Domains
2. Click "Connect Domain"
3. Follow the setup instructions

## 🤝 Contributing

We welcome contributions to improve PregCareGh! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use the existing component patterns
- Ensure mobile responsiveness
- Add proper error handling
- Write meaningful commit messages
- Test thoroughly before submitting

## 📋 Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure all dependencies are installed: `npm install`
   - Check TypeScript errors: `npm run type-check`

2. **Database Connection Issues**
   - Verify Supabase credentials in environment variables
   - Check network connectivity
   - Ensure RLS policies are properly configured

3. **Authentication Problems**
   - Confirm Supabase Auth is properly configured
   - Check redirect URLs in Supabase dashboard
   - Verify environment variables

### Getting Help
- Check the [Lovable Documentation](https://docs.lovable.dev/)
- Join our [Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Report issues on GitHub

## 📞 Support

For technical support or questions:
- **Documentation**: [https://docs.lovable.dev/](https://docs.lovable.dev/)
- **Community**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Email**: support@lovable.dev

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ghanaian Healthcare Professionals** for their insights and guidance
- **Supabase** for providing the backend infrastructure
- **shadcn/ui** for the beautiful component library
- **The Lovable Team** for the amazing development platform
- **Open Source Community** for the various libraries and tools

## 🔮 Roadmap

### Upcoming Features
- [ ] Multilingual support (Twi, Ga, Ewe)
- [ ] Telemedicine integration
- [ ] Wearable device connectivity
- [ ] Advanced AI diagnostics
- [ ] Insurance integration
- [ ] Family sharing features
- [ ] Pediatric care extension
- [ ] Mental health support

### Long-term Vision
- Become the leading maternal health platform in West Africa
- Integration with national healthcare systems
- AI-powered predictive health analytics
- Comprehensive family health ecosystem

---

**Made with ❤️ for Ghanaian mothers and families**

*PregCareGh - Empowering healthy pregnancies, one family at a time* 🇬🇭
