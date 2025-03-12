import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HiChartPie,
  HiShoppingBag,
  HiUsers,
  HiCog,
  HiDocumentText,
  HiFolder,
  HiOutlineBookmarkAlt,
} from 'react-icons/hi';
import { FaWrench } from 'react-icons/fa';
import { BsFillWrenchAdjustableCircleFill } from 'react-icons/bs';

const menuItems = [
  {
    path: '/admin',
    name: 'Trang chủ',
    icon: <HiChartPie className="h-6 w-6" />,
  },
  {
    path: '/admin/san-pham',
    name: 'Quản lý sản phẩm',
    icon: <HiShoppingBag className="h-6 w-6" />,
  },
  {
    path: '/admin/danh-muc',
    name: 'Quản lý danh mục',
    icon: <HiFolder className="h-6 w-6" />,
  },
  {
    path: '/admin/thuong-hieu',
    name: 'Quản lý thương hiệu',
    icon: <HiOutlineBookmarkAlt className="h-6 w-6" />,
  },
  {
    path: '/admin/phu-tung',
    name: 'Quản lý phụ tùng',
    icon: <FaWrench className="h-6 w-6" />,
  },
  {
    path: '/admin/phu-tung-sp',
    name: 'Quản lý phụ tùng sản phẩm',
    icon: <BsFillWrenchAdjustableCircleFill className="h-6 w-6" />,
  },
  {
    path: '/admin/users',
    name: 'Quản lý người dùng',
    icon: <HiUsers className="h-6 w-6" />,
  },
  {
    path: '/admin/settings',
    name: 'Cài đặt',
    icon: <HiCog className="h-6 w-6" />,
  },
  {
    path: '/admin/reports',
    name: 'Báo cáo',
    icon: <HiDocumentText className="h-6 w-6" />,
  },
];

const SidebarAdmin = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white fixed top-16 left-0 h-[calc(100vh-4rem)] shadow-lg">
      <ul className="menu p-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
