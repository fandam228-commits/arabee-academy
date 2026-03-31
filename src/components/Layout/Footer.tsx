import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8" dir="rtl">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
            Mr. Habib
          </Link>
          <p className="text-gray-600 leading-relaxed">
            منصة تعليمية متطورة تهدف إلى تمكين الطلاب المصريين من التفوق في اللغة الإنجليزية من خلال أحدث الأساليب والتقنيات التعليمية.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-6 text-lg">روابط سريعة</h4>
          <ul className="space-y-4">
            <li><Link to="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">الدورات الدراسية</Link></li>
            <li><Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">لوحة التحكم</Link></li>
            <li><Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors">المقالات التعليمية</Link></li>
            <li><Link to="#" className="text-gray-600 hover:text-blue-600 transition-colors">اتصل بنا</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-6 text-lg">المراحل التعليمية</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">الصف الأول الإعدادي</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">الصف الثالث الإعدادي</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">الثانوية العامة</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-6 text-lg">تواصل معنا</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5 text-blue-600" />
              <span>+20 123 456 7890</span>
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5 text-blue-600" />
              <span>info@mrhabib.com</span>
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>القاهرة، مصر</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm">
          جميع الحقوق محفوظة © {new Date().getFullYear()} مستر حبيب. تم التطوير بكل ❤️ لخدمة الطلاب.
        </p>
      </div>
    </footer>
  );
};

export default Footer;