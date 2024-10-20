import React, { useState, useEffect } from 'react';
import { Globe, Zap, ChevronRight, Rocket, Database, Repeat, BookOpen, Star } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  details: string;
}

const ApiWebsite = () => {
  // 使用正确的类型定义状态
  const [activeTab, setActiveTab] = useState<'json' | 'image'>('json');
  const [apiResponse, setApiResponse] = useState<string | object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.luoh-an.me/PicLibray/AnimeImage?t=wallpaper&return=${activeTab}`);
      if (!response.ok) throw new Error('API请求失败');
      
      if (activeTab === 'json') {
        const data = await response.json();
        setApiResponse(data);
      } else {
        const imageUrl = response.url;
        setApiResponse(imageUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生错误');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // 交互式演示组件
  const InteractiveDemo = () => (
    <div className="bg-gray-900 rounded-xl p-6 text-white overflow-x-auto shadow-2xl">
      <div className="flex space-x-4 mb-4">
        <button 
          className={`px-4 py-2 rounded-md transition-all transform hover:scale-105 
            ${activeTab === 'json' ? 'bg-violet-600 shadow-lg' : 'bg-gray-800'}`}
          onClick={() => setActiveTab('json')}
        >
          JSON 响应
        </button>
        <button 
          className={`px-4 py-2 rounded-md transition-all transform hover:scale-105
            ${activeTab === 'image' ? 'bg-violet-600 shadow-lg' : 'bg-gray-800'}`}
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
              <span className="break-all">https://api.luoh-an.me/PicLibray/AnimeImage?t=wallpaper&return=json</span>
            </div>
            <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
              {loading ? '加载中...' : error ? error : JSON.stringify(apiResponse, null, 2)}
            </pre>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-400">GET</span>
              <span className="break-all">https://api.luoh-an.me/PicLibray/AnimeImage?t=wallpaper&return=image</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              {loading ? (
                <div className="text-center py-8">加载中...</div>
              ) : error ? (
                <div className="text-red-400">{error}</div>
              ) : (
                <img 
                  src={apiResponse as string}
                  alt="API示例"
                  className="rounded-md max-w-full h-auto mx-auto"
                  onError={() => setError('图片加载失败')}
                />
              )}
            </div>
          </>
        )}
      </div>
      <button 
        onClick={fetchData}
        className="mt-4 px-4 py-2 bg-violet-600 rounded-md hover:bg-violet-700 transition-all transform hover:scale-105 shadow-lg"
      >
        刷新请求
      </button>
    </div>
  );

  // 特性组件
  const Features = () => {
    const features: Feature[] = [
      {
        icon: <Globe className="w-8 h-8" />,
        title: "全球加速",
        details: "多区域部署，快速响应"
      },
      {
        icon: <Zap className="w-8 h-8" />,
        title: "简单易用",
        details: "一行代码即可接入，开箱即用"
      },
      {
        icon: <Rocket className="w-8 h-8" />,
        title: "极速响应",
        details: "平均响应时间小于100ms"
      },
      {
        icon: <Database className="w-8 h-8" />,
        title: "海量资源",
        details: "超过100万张优质动漫图片"
      },
      {
        icon: <Star className="w-8 h-8" />,
        title: "品质保证",
        details: "所有图片经过人工筛选"
      },
      {
        icon: <Repeat className="w-8 h-8" />,
        title: "无限请求",
        details: "无频率限制，随心所欲"
      },
      {
        icon: <Globe className="w-8 h-8" />,
        title: "完整支持",
        details: "支持多种返回格式和分辨率"
      },
      {
        icon: <BookOpen className="w-8 h-8" />,
        title: "在线文档",
        details: "详尽的API文档和示例"
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-4 text-violet-600">
              {feature.icon}
              <h4 className="font-semibold text-lg">{feature.title}</h4>
            </div>
            <p className="text-gray-600">{feature.details}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* 主页面部分 */}
      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-cyan-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-violet-100 text-violet-800 rounded-full text-sm font-medium">
              🎉 支持8K超高清图片
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            专业级动漫图片 API
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            为您的应用提供海量优质动漫图片资源，简单易用，即刻起飞
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="px-8 py-4 text-white bg-gradient-to-r from-violet-600 to-cyan-500 
                           rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all
                           flex items-center space-x-2">
              <span>立即体验</span>
              <ChevronRight size={20} />
            </button>
            <button className="px-8 py-4 text-violet-600 bg-white rounded-lg hover:shadow-lg 
                           hover:-translate-y-0.5 transition-all">
              查看文档
            </button>
          </div>
        </div>
      </section>

      {/* API演示 */}
      <section className="py-24 px-4 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">在线体验</h2>
          <InteractiveDemo />
        </div>
      </section>

      {/* 特性介绍 */}
      <section className="py-24">
        <h2 className="text-3xl font-bold text-center mb-16">核心优势</h2>
        <Features />
      </section>

      <style jsx global>{`
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

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default ApiWebsite;