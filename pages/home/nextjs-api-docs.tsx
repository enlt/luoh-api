import React, { useState } from 'react';
import { Search, Menu, ChevronRight, ExternalLink } from 'lucide-react';

const ApiDocs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sidebarItems = [
    { title: '开始使用', items: ['快速入门', '安装指南', '基础概念'] },
    { title: 'API参考', items: ['路由', '数据获取', '中间件'] },
    { title: '最佳实践', items: ['性能优化', '部署', '安全'] }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-2xl font-bold text-blue-600">Next.js</div>
                <div className="text-gray-600">|</div>
                <div className="text-xl text-gray-600">API 文档</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索文档..."
                    className="w-96 px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>
              
              <a href="#" className="ml-4 text-gray-600 hover:text-gray-900">
                <ExternalLink size={24} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <div className="flex pt-16">
        {/* 侧边栏 */}
        <aside className={`${isMenuOpen ? 'block' : 'hidden'} md:block fixed left-0 w-64 h-full bg-white border-r border-gray-200 overflow-y-auto`}>
          <div className="px-4 py-6">
            {sidebarItems.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{section.title}</h3>
                <ul>
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href="#"
                        className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        <ChevronRight size={16} className="mr-2" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* 主要内容 */}
        <main className="flex-1 ml-0 md:ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Next.js API 文档</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-blue-700">
                欢迎使用 Next.js API 文档。这里提供了全面的 API 参考和使用指南。
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">快速入门</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Next.js 是一个轻量级的 React 框架，为您提供构建静态和服务器端渲染应用程序所需的所有功能。
                </p>
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <code className="text-gray-100">
                    npx create-next-app@latest
                  </code>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">主要特性</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: '零配置', desc: '自动编译和打包' },
                  { title: '混合渲染', desc: 'SSR 和 SSG 支持' },
                  { title: '文件系统路由', desc: '基于文件的导航' },
                  { title: 'API 路由', desc: '内置 API 支持' }
                ].map((feature, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiDocs;
