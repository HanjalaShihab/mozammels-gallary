import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Award, 
  Palette, 
  Users, 
  Heart, 
  Brush, 
  Sparkles, 
  Star, 
  Globe, 
  Target,
  Camera,
  Layers,
  Compass,
  Zap,
  Quote,
  ChevronRight,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail
} from 'lucide-react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroScale = useTransform(springScroll, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(springScroll, [0, 0.3], [1, 0.8]);

  const stats = [
    { 
      label: 'Years Experience', 
      value: '10+', 
      icon: <Award />,
      color: 'from-purple-500 to-pink-500',
      description: 'Mastering the craft'
    },
    { 
      label: 'Artworks Created', 
      value: '150+', 
      icon: <Palette />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Unique masterpieces'
    },
    { 
      label: 'Happy Collectors', 
      value: '200+', 
      icon: <Users />,
      color: 'from-green-500 to-emerald-500',
      description: 'Worldwide clients'
    },
    { 
      label: 'Exhibitions', 
      value: '25+', 
      icon: <Heart />,
      color: 'from-orange-500 to-yellow-500',
      description: 'Global showcases'
    },
  ];

  const skills = [
    { name: 'Digital Painting', level: 95, icon: <Brush />, color: 'from-purple-500 to-pink-500' },
    { name: '3D Modeling', level: 85, icon: <Layers />, color: 'from-blue-500 to-cyan-500' },
    { name: 'Concept Art', level: 90, icon: <Target />, color: 'from-green-500 to-emerald-500' },
    { name: 'Photography', level: 80, icon: <Camera />, color: 'from-orange-500 to-yellow-500' },
    { name: 'Art Direction', level: 88, icon: <Compass />, color: 'from-red-500 to-rose-500' },
    { name: 'Teaching', level: 92, icon: <Users />, color: 'from-indigo-500 to-violet-500' },
  ];

  const achievements = [
    { year: '2015', title: 'First International Exhibition', description: 'Showcased work in Paris Art Fair' },
    { year: '2017', title: 'Digital Art Award', description: 'Winner of Creative Digital Awards' },
    { year: '2019', title: 'Artist Residency', description: 'Selected for Tokyo Art Program' },
    { year: '2021', title: 'Online Platform Launch', description: 'Started teaching 10,000+ students' },
    { year: '2023', title: 'NFT Collection', description: 'Sold out digital art collection' },
  ];

  const socialLinks = [
    { platform: 'Instagram', icon: <Instagram />, url: '#', color: 'from-purple-500 to-pink-500' },
    { platform: 'Twitter', icon: <Twitter />, url: '#', color: 'from-blue-400 to-cyan-400' },
    { platform: 'YouTube', icon: <Youtube />, url: '#', color: 'from-red-500 to-rose-500' },
    { platform: 'LinkedIn', icon: <Linkedin />, url: '#', color: 'from-blue-600 to-indigo-600' },
    { platform: 'Email', icon: <Mail />, url: '#', color: 'from-gray-600 to-gray-700' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: 0
            }}
            animate={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2
            }}
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              background: `radial-gradient(circle, hsl(${270 + i * 10}, 60%, 80%) 0%, transparent 70%)`,
              filter: 'blur(40px)',
              opacity: 0.1
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative mb-20"
        >
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 left-10 w-6 h-6 border-2 border-purple-300 rounded-full"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute bottom-10 right-10 w-8 h-8 border-2 border-cyan-300 rounded-full"
          />
          
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-semibold">CREATIVE VISIONARY</span>
              <Zap className="w-5 h-5 text-pink-600" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                MOZAMMEL
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Digital Artist · Creative Director · Mentor
            </motion.p>
          </div>
        </motion.div>

        {/* Profile & Journey Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Profile Image with Effects */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-2 border-transparent rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6) border-box',
                mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />
            
            {/* Main Image Container */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl z-10 bg-black">
              <img
                src="/uncle.jpg"
                alt="Mozammel - Digital Artist"
                className="w-full h-[600px] object-cover"
                onLoad={(e) => e.target.setAttribute('loaded', '')}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=800&h=1000&fit=crop&q=80';
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              
              {/* Floating Info */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Brush className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold">Digital Art Master</h3>
                    <p className="text-white/80">Since 2013</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -30, 0],
                  x: Math.sin(i) * 40,
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: i * 1 
                }}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                style={{
                  top: `${20 + i * 20}%`,
                  left: `${10 + i * 30}%`
                }}
              />
            ))}
          </motion.div>

          {/* Journey Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Creative Journey</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  My artistic journey began with a childhood fascination for colors and shapes. 
                  What started as simple sketches in notebooks has evolved into a lifelong passion 
                  for creating digital masterpieces that bridge traditional artistry with cutting-edge technology.
                </p>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  Over the past decade, I've explored the intersection of art and technology, 
                  developing unique styles that blend classical techniques with modern digital tools. 
                  Each creation is a story told through pixels, a conversation between the artist and viewer.
                </p>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  Today, I'm not just an artist but a mentor, helping thousands discover their creative 
                  potential through online platforms and immersive workshops. My mission is to make 
                  digital artistry accessible and meaningful for everyone.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Me</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`group relative p-3 rounded-lg bg-gradient-to-br ${social.color} text-white hover:shadow-xl transition-shadow`}
                  >
                    <div className="relative z-10">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Numbers</span>
            </h2>
            <p className="text-gray-400 text-lg">A decade of creative excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-xl hover:shadow-2xl hover:border-white/20 transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  
                  <div className="text-lg font-semibold text-white mb-1">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Artistic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Expertise</span>
            </h2>
            <p className="text-gray-600 text-lg">Mastering multiple creative disciplines</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${skill.color} text-white`}>
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{skill.level}%</span>
                </div>
                
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${skill.color}`}
                  >
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Milestones</span>
            </h2>
            <p className="text-gray-600 text-lg">A journey through artistic achievements</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500" />
            
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-purple-600 rounded-full z-10" />
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                      <Star className="w-4 h-4 text-purple-600" />
                      <span className="font-bold text-purple-700">{achievement.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-gray-600">
                      {achievement.description}
                    </p>
                    
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={`inline-flex items-center gap-1 mt-4 text-purple-600 font-semibold ${
                        index % 2 === 0 ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span>Learn More</span>
                      <ChevronRight className={`w-4 h-4 ${index % 2 === 0 ? 'rotate-180' : ''}`} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-24"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '300px'
            }} />
          </div>
          
          <div className="relative p-12 md:p-16 text-center text-white">
            <Quote className="w-16 h-16 mx-auto mb-8 text-white/30" />
            
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-8 leading-relaxed max-w-4xl mx-auto"
            >
              "Art is the bridge between imagination and reality. Through every stroke and pixel, 
              I strive to create not just visuals, but experiences that resonate with the soul."
            </motion.blockquote>
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <p className="text-xl font-medium">Mozammel - Digital Artist</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Let's Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Together</span>
          </h2>
          
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Whether you're looking to commission art, collaborate on a project, or learn digital artistry, 
            I'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-xl transition-shadow"
            >
              Start a Project
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-50 transition-colors"
            >
              View Portfolio
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;