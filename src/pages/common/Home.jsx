import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Calculator, 
  Settings, 
  User, 
  ArrowRight, 
  AlertTriangle, 
  Cpu, 
  FileText 
} from 'lucide-react';

import { Button, Card, Container, Heading, Text, Badge } from '@/components/ui';

const FeatureCard = ({ icon: Icon, title, desc, onClick, colorClass = "bg-blue-100 text-blue-600" }) => (
  <div 
    onClick={onClick}
    className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClass} dark:bg-opacity-20`}>
      <Icon size={24} />
    </div>
    <Heading variant="h4" className="mb-2 group-hover:text-blue-600 transition-colors">
      {title}
    </Heading>
    <Text className="text-gray-500 dark:text-gray-400 text-sm">
      {desc}
    </Text>
    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
      <ArrowRight size={20} />
    </div>
  </div>
);

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        
        <Container size="xl" className="relative pt-20 pb-24 text-center lg:pt-32 lg:pb-36">
          <Badge variant="outline" className="mb-6 px-4 py-1 border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
            v1.0 Beta
          </Badge>
          
          <Heading variant="h1" align='center' className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {t('home.hero.title')}
          </Heading>
          
          <Text className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('home.hero.subtitle')}
          </Text>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/projects')} leftIcon={<Calculator />}>
              {t('home.hero.cta_projects')}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/theory')} leftIcon={<BookOpen />}>
              {t('home.hero.cta_theory')}
            </Button>
          </div>
        </Container>
      </section>

      {/* --- FEATURES GRID --- */}
      <Container size="xl" className="-mt-16 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={BookOpen}
            title={t('home.features.theory.title')}
            desc={t('home.features.theory.desc')}
            onClick={() => navigate('/theory')}
            colorClass="bg-emerald-100 text-emerald-600"
          />
          <FeatureCard 
            icon={Calculator}
            title={t('home.features.projects.title')}
            desc={t('home.features.projects.desc')}
            onClick={() => navigate('/projects')}
            colorClass="bg-blue-100 text-blue-600"
          />
          <FeatureCard 
            icon={Settings}
            title={t('home.features.management.title')}
            desc={t('home.features.management.desc')}
            onClick={() => navigate('/management')}
            colorClass="bg-purple-100 text-purple-600"
          />
          <FeatureCard 
            icon={User}
            title={t('home.features.profile.title')}
            desc={t('home.features.profile.desc')}
            onClick={() => navigate('/profile')}
            colorClass="bg-orange-100 text-orange-600"
          />
        </div>
      </Container>

      {/* --- TECH DETAILS / WARNING SECTION --- */}
      <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <Container size="lg">
          <div className="flex flex-col md:flex-row items-start gap-8">
            
            {/* Left: Info */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 text-sm font-medium">
                <AlertTriangle size={16} />
                For Contributors
              </div>
              <Heading variant="h3">{t('home.warning.title')}</Heading>
              <Text className="text-gray-600 dark:text-gray-300">
                {t('home.warning.desc')}
              </Text>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                   <Cpu className="text-blue-500" size={20}/>
                   <span className="text-sm font-medium">Experimental BOM Support</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                   <FileText className="text-emerald-500" size={20}/>
                   <span className="text-sm font-medium">Markdown Supported</span>
                </div>
              </div>
            </div>

            {/* Right: Code Example */}
            <div className="flex-1 w-full">
              <Card className="bg-slate-900 border-slate-700 text-slate-200 font-mono text-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                  <span className="text-xs text-slate-400">algorithm_example.txt</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-slate-400"># {t('home.warning.syntax_title')}</p>
                  <p>
                    <span className="text-purple-400">Expr:</span> <span className="text-emerald-400">#U</span> = <span className="text-blue-300">#I</span> * <span className="text-blue-300">#R</span>
                  </p>
                  <div className="my-4 border-t border-slate-700/50" />
                  <p className="text-amber-400 text-xs">
                    // {t('home.warning.note')}
                  </p>
                  <p className="text-slate-500 text-xs">
                    // Changes are locked after publish
                  </p>
                </div>
              </Card>
            </div>

          </div>
        </Container>
      </section>

    </div>
  );
};

export default HomePage;