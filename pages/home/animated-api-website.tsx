import React, { useState, useEffect } from 'react';
import { Code, Globe, Zap, Shield, ArrowRight, Copy, Check, Image, Database } from 'lucide-react';

const ApiWebsite = () => {
  const [copied, setCopied] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDemo, setActiveDemo] = useState('json');

  const copyCode = () => {
    navigator.clipboard.writeText('curl https://api.luoh-an.me/PicLibrary/Yuanqi?t=pc/anime&r=json');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* 导航栏 - 使用新的渐变色 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent 
                          animate-gradient hover:scale-105 transition-transform">
              YourAPI
            </div>
            <div className="hidden md:flex space-x-8">
              {['特性', '演示', '价格', '文档'].map((item, idx) => (
                <a
                  key={idx}
                  href={`#${item}`}
                  className="text-gray-600 hover:text-violet-600 hover:-translate-y-0.5 transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-violet-600 hover:text-violet-700 
                               hover:-translate-y-0.5 transition-all">
                登录
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-cyan-500 
                               rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">
                免费试用
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero部分 - 添加动画效果 */}
      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-cyan-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 
                       animate-fade-in-up">
            图片API服务
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto 
                      animate-fade-in-up animation-delay-200">
            提供高质量动漫图片API服务，支持JSON和图片格式返回。
            快速、可靠、简单易用。
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4
                          animate-fade-in-up animation-delay-400">
            <button className="px-8 py-4 text-white bg-gradient-to-r from-violet-600 to-cyan-500 
                             rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">
              开始使用
            </button>
            <button className="px-8 py-4 text-violet-600 bg-white rounded-lg hover:shadow-lg 
                             hover:-translate-y-0.5 transition-all">
              查看演示
            </button>
          </div>
        </div>
      </section>

      {/* API演示部分 */}
      <section id="演示" className="py-24 px-4 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 animate-fade-in">在线API演示</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* JSON响应演示 */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-violet-600">JSON响应</h3>
                <button 
                  onClick={copyCode}
                  className="text-gray-400 hover:text-violet-600 transition-colors"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-200 overflow-x-auto">
                <pre>
                  GET https://api.luoh-an.me/PicLibrary/Yuanqi?t=pc/anime&r=json
                </pre>
              </div>
            </div>

            {/* 图片响应演示 */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-violet-600 mb-4">图片响应</h3>
              <div className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center">
                <img 
                  src="/api/placeholder/400/320"
                  alt="API返回的图片示例" 
                  className="max-h-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特性部分 - 新的设计和动画 */}
      <section id="特性" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">强大特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8 text-violet-600" />,
                title: '全球加速',
                desc: '多节点部署，快速响应'
              },
              {
                icon: <Image className="w-8 h-8 text-violet-600" />,
                title: '高质量图片',
                desc: '精选动漫图片库'
              },
              {
                icon: <Database className="w-8 h-8 text-violet-600" />,
                title: '双格式支持',
                desc: 'JSON与图片格式任选'
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300
                          hover:-translate-y-2 group"
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 价格部分 - 更新样式 */}
      <section id="价格" className="py-24 px-4 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">简单定价</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: '基础版',
                price: '免费',
                features: ['1,000 次调用/天', '基础统计', '99.9%可用性']
              },
              {
                name: '专业版',
                price: '￥99/月',
                features: ['100,000 次调用/天', '详细统计', '99.99%可用性', '技术支持']
              },
              {
                name: '企业版',
                price: '定制',
                features: ['无限调用', '专属部署', '99.999%可用性', '7×24技术支持']
              }
            ].map((plan, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300
                          hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold mb-2 text-violet-600">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 text-white bg-gradient-to-r from-violet-600 to-cyan-500 
                                 rounded-lg hover:shadow-lg transition-all hover:-translate-y-0.5">
                  选择方案
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA部分 */}
      <section className="py-24 px-4 bg-gradient-to-r from-violet-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6">准备开始了吗？</h2>
          <p className="text-xl mb-8 opacity-90">
            立即注册，获得免费额度
          </p>
          <button className="px-8 py-4 bg-white text-violet-600 rounded-lg 
                           hover:shadow-lg hover:-translate-y-0.5 transition-all">
            开始使用
          </button>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">产品</h4>
            <ul className="space-y-2">
              {['特性', '演示', '价格'].map((item, idx) => (
                <li key={idx}>
                  <a href={`#${item}`} className="hover:text-violet-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">文档</h4>
            <ul className="space-y-2">
              {['快速开始', 'API参考', '示例代码'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">支持</h4>
            <ul className="space-y-2">
              {['帮助中心', '联系我们', '状态页面'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">关于</h4>
            <ul className="space-y-2">
              {['公司介绍', '博客', '工作机会'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

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
      `}</style>
    </div>
  );
};

export default ApiWebsite;
