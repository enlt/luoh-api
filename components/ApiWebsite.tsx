import React, { useState, useEffect } from 'react';
import { Code, Globe, Zap, Shield, ArrowRight, Copy, Check, Image, Database, Terminal, ChevronRight, Star, Users, Server, AlertCircle } from 'lucide-react';

const ApiWebsite = () => {
  const [copied, setCopied] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('json');
  const [showNotification, setShowNotification] = useState(false);

  // 实时统计数据
  const [stats, setStats] = useState({
    requests: 0,
    uptime: 99.99,
    users: 0
  });

  // 模拟实时统计更新
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        requests: prev.requests + Math.floor(Math.random() * 10),
        uptime: 99.99,
        users: prev.users + Math.floor(Math.random() * 2)
      }));
    }, 2000);

    // 显示欢迎通知
    setTimeout(() => {
      setShowNotification(true);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 实时数据可视化组件
  const LiveStats = () => (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg z-50 
                    animate-fade-in border border-violet-100">
      <div className="flex space-x-8">
        <div>
          <div className="text-sm text-gray-600">API调用次数</div>
          <div className="text-2xl font-bold text-violet-600">{stats.requests.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">在线用户</div>
          <div className="text-2xl font-bold text-violet-600">{stats.users}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">运行时间</div>
          <div className="text-2xl font-bold text-violet-600">{stats.uptime}%</div>
        </div>
      </div>
    </div>
  );

  // 通知组件
  const Notification = () => (
    <div className={`fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-500 ${showNotification ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center space-x-3">
        <AlertCircle className="text-violet-600" />
        <div>
          <div className="font-medium">欢迎使用我们的API!</div>
          <div className="text-sm text-gray-600">现在注册即可获得5000次免费调用额度</div>
        </div>
        <button 
          onClick={() => setShowNotification(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );

  // 交互式代码示例
  const InteractiveDemo = () => (
    <div className="bg-gray-900 rounded-xl p-6 text-white">
      <div className="flex space-x-4 mb-4">
        <button 
          className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'json' ? 'bg-violet-600' : 'bg-gray-800'}`}
          onClick={() => setActiveTab('json')}
        >
          JSON响应
        </button>
        <button 
          className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'image' ? 'bg-violet-600' : 'bg-gray-800'}`}
          onClick={() => setActiveTab('image')}
        >
          图片响应
        </button>
      </div>
      <div className="font-mono">
        {activeTab === 'json' ? (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-400">GET</span>
              <span>https://api.luoh-an.me/PicLibrary/Yuanqi?t=pc/anime&r=json</span>
            </div>
            <pre className="bg-gray-800 p-4 rounded-md">
{`{
  "code": 200,
  "message": "success",
  "data": {
    "url": "https://example.com/image.jpg",
    "title": "示例图片",
    "category": "anime"
  }
}`}
            </pre>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-400">GET</span>
              <span>https://api.luoh-an.me/PicLibrary/Yuanqi?t=pc/anime&r=image</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <img 
                src="/api/placeholder/400/320" 
                alt="API图片示例"
                className="rounded-md max-w-full h-auto"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  // 技术栈展示
  const TechStack = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
      {[
        { name: 'Next.js', desc: '框架支持' },
        { name: 'Node.js', desc: '服务支持' },
        { name: 'Redis', desc: '缓存加速' },
        { name: 'CloudFlare', desc: 'CDN加速' }
      ].map((tech, idx) => (
        <div key={idx} className="bg-white/50 backdrop-blur-md p-4 rounded-lg text-center hover:shadow-lg transition-shadow">
          <div className="font-semibold text-violet-600">{tech.name}</div>
          <div className="text-sm text-gray-600">{tech.desc}</div>
        </div>
      ))}
    </div>
  );

  // 用户评价轮播
  const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const testimonials = [
      { name: "张先生", role: "技术总监", content: "接口响应速度快，服务稳定可靠" },
      { name: "李女士", role: "产品经理", content: "文档清晰，集成简单，很好用" },
      { name: "王先生", role: "开发者", content: "图片质量高，更新及时，推荐使用" }
    ];

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="bg-white/50 backdrop-blur-md p-8 rounded-xl max-w-2xl mx-auto mt-16">
        <div className="relative h-32">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`absolute top-0 left-0 w-full transform transition-all duration-500 ${
                idx === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="text-lg text-gray-600 italic mb-4">"{testimonial.content}"</div>
              <div className="font-medium text-violet-600">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 集成指南
  const IntegrationGuide = () => (
    <div className="max-w-4xl mx-auto mt-16">
      <h3 className="text-2xl font-bold text-center mb-8">快速集成</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "1. 注册账号",
            content: "创建账号并获取API密钥",
            icon: <Users className="w-6 h-6 text-violet-600" />
          },
          {
            title: "2. 选择接口",
            content: "选择需要的接口和返回格式",
            icon: <Server className="w-6 h-6 text-violet-600" />
          },
          {
            title: "3. 开始调用",
            content: "集成API并开始使用",
            icon: <Terminal className="w-6 h-6 text-violet-600" />
          }
        ].map((step, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              {step.icon}
              <h4 className="font-semibold">{step.title}</h4>
            </div>
            <p className="text-gray-600">{step.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* 保留原有的导航栏代码 */}
      {/* ... */}

      {/* Hero部分增强 */}
      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-cyan-50 opacity-50"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-violet-100 text-violet-800 rounded-full text-sm font-medium">
              🚀 新功能发布: 支持WebP格式
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            高性能动漫图片API
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            简单易用的RESTful API，提供高质量动漫图片服务。
            支持JSON和图片格式，全球CDN加速。
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4
                        animate-fade-in-up animation-delay-400">
            <button className="px-8 py-4 text-white bg-gradient-to-r from-violet-600 to-cyan-500 
                           rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all
                           flex items-center space-x-2">
              <span>立即开始</span>
              <ChevronRight size={20} />
            </button>
            <button className="px-8 py-4 text-violet-600 bg-white rounded-lg hover:shadow-lg 
                           hover:-translate-y-0.5 transition-all">
              查看文档
            </button>
          </div>
        </div>
      </section>

      {/* 实时演示部分 */}
      <section id="演示" className="py-24 px-4 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 animate-fade-in">API演示</h2>
          <InteractiveDemo />
          <TechStack />
        </div>
      </section>

      {/* 用户评价部分 */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-violet-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">用户评价</h2>
          <Testimonials />
        </div>
      </section>

      {/* 集成指南部分 */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <IntegrationGuide />
        </div>
      </section>

      {/* 保留原有的特性、价格等部分代码 */}
      {/* ... */}

      {/* 实时统计和通知组件 */}
      <LiveStats />
      <Notification />

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ApiWebsite;
