import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Video, FileText, Layout, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const Admin = () => {
  const [lessons, setLessons] = useState([
    { id: 1, title: 'الوحدة الأولى: الدرس الأول', level: '1-prep', date: '2023-10-01' },
    { id: 2, title: 'المراجعة النهائية', level: '3-sec', date: '2023-10-05' },
  ]);

  const handleDelete = (id: number) => {
    setLessons(lessons.filter(l => l.id !== id));
    toast.success('تم حذف الدرس بنجاح');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 dir-rtl text-right">
          <div>
            <h1 className="text-3xl font-black text-gray-900">إدارة المنصة</h1>
            <p className="text-gray-500">مرحباً بك في لوحة تحكم الإدارة</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
            <Plus size={20} />
            إضافة درس جديد
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 dir-rtl text-right">
          {/* Stats */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">إجمالي الدروس</p>
              <h3 className="text-3xl font-black">42</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">إجمالي الطلاب</p>
              <h3 className="text-3xl font-black">1,248</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">المشاهدات هذا الشهر</p>
              <h3 className="text-3xl font-black">15.4K</h3>
            </div>
          </div>

          {/* Table Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="ابحث عن درس..."
                    className="w-full pr-10 pl-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100"><Filter size={20} /></button>
                  <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100"><Layout size={20} /></button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">عنوان الدرس</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">المرحلة</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">التاريخ</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {lessons.map((lesson) => (
                      <tr key={lesson.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Video size={16} /></div>
                            <span className="font-medium text-gray-900">{lesson.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">{lesson.level}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">
                          <div className="flex items-center gap-2 justify-end">
                            <button className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(lesson.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Quick Upload Form (Visual Only) */}
            <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6">إضافة سريعة</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">رابط الفيديو (YouTube)</label>
                  <input type="text" placeholder="https://..." className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">رابط ملف PDF</label>
                  <input type="text" placeholder="https://..." className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};