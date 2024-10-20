import React, { useState } from 'react';
import { Code, Globe, Zap, Shield, ArrowRight, Copy, Check } from 'lucide-react';

const ApiWebsite2 = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('curl https://api.example.com/v1/data');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              YourAPI
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">特性</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">价格</a>
              <a href="#docs" className="text-gray-600 hover:text-gray-900">文档</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">联系我们</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                登录
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                免费试用
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero部分 */}
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            强大而简单的API解决方案
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            为您的应用提供快速、可靠、安全的数据服务。无论是小型创业还是大型企业，我们都能满足您的需求。
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">
              开始使用
            </button>
            <button className="px-8 py-4 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 font-medium">
              查看演示
            </button>
          </div>
        </div>
      </section>

      {/* 代码示例 */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <button 
                onClick={copyCode}
                className="text-gray-400 hover:text-white"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <code className="text-gray-100 font-mono">
              curl https://api.example.com/v1/data
            </code>
          </div>
        </div>
      </section>

      {/* 特性部分 */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">为什么选择我们的API</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8 text-blue-600" />,
                title: '全球化部署',
                desc: '遍布全球的服务节点，确保低延迟访问'
              },
              {
                icon: <Zap className="w-8 h-8 text-blue-600" />,
                title: '极速响应',
                desc: '99.9%的请求在100ms内响应'
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: '安全可靠',
                desc: '企业级安全防护，数据加密传输'
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 价格部分 */}
      <section id="pricing" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">简单透明的价格</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: '入门版',
                price: '￥99',
                features: ['10,000 API调用/月', '基础支持', '99.9%可用性']
              },
              {
                name: '专业版',
                price: '￥299',
                features: ['100,000 API调用/月', '优先支持', '99.99%可用性']
              },
              {
                name: '企业版',
                price: '定制',
                features: ['不限API调用', '24/7专属支持', '99.999%可用性']
              }
            ].map((plan, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                  开始使用
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA部分 */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">准备开始了吗？</h2>
          <p className="text-xl text-gray-600 mb-8">
            立即注册，获得14天免费试用期
          </p>
          <button className="px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">
            免费开始使用
          </button>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4">产品</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">特性</a></li>
              <li><a href="#" className="hover:text-white">价格</a></li>
              <li><a href="#" className="hover:text-white">文档</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">资源</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">开发指南</a></li>
              <li><a href="#" className="hover:text-white">API参考</a></li>
              <li><a href="#" className="hover:text-white">状态页面</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">公司</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">关于我们</a></li>
              <li><a href="#" className="hover:text-white">博客</a></li>
              <li><a href="#" className="hover:text-white">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">法律</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">隐私政策</a></li>
              <li><a href="#" className="hover:text-white">服务条款</a></li>
              <li><a href="#" className="hover:text-white">安全</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApiWebsite2;
