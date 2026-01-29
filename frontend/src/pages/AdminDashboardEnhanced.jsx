import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, ShoppingBag, BookOpen, FileText, Plus, Edit, Trash2, 
  Users, Mail, BarChart, Shield, UserX, CheckCircle, XCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  fetchArtworks, fetchShopItems, fetchCourses, fetchBlogs,
  createArtwork, updateArtwork, deleteArtwork,
  createShopItem, updateShopItem, deleteShopItem,
  createCourse, updateCourse, deleteCourse,
  createBlog, updateBlog, deleteBlog,
  getDashboardStats, getAllUsers, updateUserRole, deleteUser,
  getAllContacts, deleteContact
} from '../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [dashboardStats, setDashboardStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart size={20} /> },
    { id: 'artworks', label: 'Artworks', icon: <Palette size={20} /> },
    { id: 'shop', label: 'Shop Items', icon: <ShoppingBag size={20} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={20} /> },
    { id: 'blogs', label: 'Blogs', icon: <FileText size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'contacts', label: 'Contacts', icon: <Mail size={20} /> },
  ];

  useEffect(() => {
    loadItems();
  }, [activeTab]);

  const loadItems = async () => {
    setLoading(true);
    try {
      let data;
      switch (activeTab) {
        case 'dashboard':
          data = await getDashboardStats();
          setDashboardStats(data.data);
          break;
        case 'users':
          data = await getAllUsers();
          setUsers(data.data);
          break;
        case 'contacts':
          data = await getAllContacts();
          setContacts(data.data);
          break;
        case 'artworks':
          data = await fetchArtworks();
          setItems(data);
          break;
        case 'shop':
          data = await fetchShopItems();
          setItems(data);
          break;
        case 'courses':
          data = await fetchCourses();
          setItems(data);
          break;
        case 'blogs':
          data = await fetchBlogs();
          setItems(data);
          break;
      }
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      switch (activeTab) {
        case 'artworks':
          await deleteArtwork(id);
          break;
        case 'shop':
          await deleteShopItem(id);
          break;
        case 'courses':
          await deleteCourse(id);
          break;
        case 'blogs':
          await deleteBlog(id);
          break;
        case 'users':
          await deleteUser(id);
          break;
        case 'contacts':
          await deleteContact(id);
          break;
      }
      loadItems();
    } catch (error) {
      alert('Error deleting item: ' + error.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      loadItems();
      alert('User role updated successfully!');
    } catch (error) {
      alert('Error updating role: ' + error.message);
    }
  };

  const openModal = (mode, item = null) => {
    setModalMode(mode);
    setCurrentItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'add') {
        switch (activeTab) {
          case 'artworks':
            await createArtwork(formData);
            break;
          case 'shop':
            await createShopItem(formData);
            break;
          case 'courses':
            await createCourse(formData);
            break;
          case 'blogs':
            await createBlog(formData);
            break;
        }
      } else {
        switch (activeTab) {
          case 'artworks':
            await updateArtwork(currentItem._id, formData);
            break;
          case 'shop':
            await updateShopItem(currentItem._id, formData);
            break;
          case 'courses':
            await updateCourse(currentItem._id, formData);
            break;
          case 'blogs':
            await updateBlog(currentItem._id, formData);
            break;
        }
      }
      
      setShowModal(false);
      setFormData({});
      loadItems();
    } catch (error) {
      alert('Error saving item: ' + error.message);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>
      
      {dashboardStats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Users" value={dashboardStats.stats.users} icon={<Users />} color="blue" />
            <StatCard title="Artworks" value={dashboardStats.stats.artworks} icon={<Palette />} color="purple" />
            <StatCard title="Shop Items" value={dashboardStats.stats.shopItems} icon={<ShoppingBag />} color="green" />
            <StatCard title="Courses" value={dashboardStats.stats.courses} icon={<BookOpen />} color="orange" />
            <StatCard title="Blogs" value={dashboardStats.stats.blogs} icon={<FileText />} color="pink" />
            <StatCard title="Contacts" value={dashboardStats.stats.contacts} icon={<Mail />} color="indigo" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Recent Users</h3>
              <div className="space-y-3">
                {dashboardStats.recentUsers?.map((user) => (
                  <div key={user._id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Recent Contacts</h3>
              <div className="space-y-3">
                {dashboardStats.recentContacts?.map((contact) => (
                  <div key={contact._id} className="border-b pb-2">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <p className="text-xs text-gray-500">{contact.subject}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">User Management</h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <motion.div
            key={user._id}
            className="bg-white p-6 rounded-lg shadow flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => handleDelete(user._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Contact Messages</h2>
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <motion.div
            key={contact._id}
            className="bg-white p-6 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{contact.name}</h3>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-sm font-medium text-gray-800 mt-2">{contact.subject}</p>
                <p className="text-gray-700 mt-2">{contact.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(contact._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
        <button
          onClick={() => openModal('add')}
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <motion.div
            key={item._id}
            className="bg-white p-6 rounded-lg shadow flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
              {item.description && (
                <p className="text-gray-600 line-clamp-2">{item.description}</p>
              )}
              {item.price && (
                <p className="text-primary-600 font-semibold mt-2">${item.price}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openModal('edit', item)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderModal = () => (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-2xl font-bold mb-6">
            {modalMode === 'add' ? 'Add New' : 'Edit'} {activeTab.slice(0, -1)}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title/Name"
              value={formData.title || formData.name || ''}
              onChange={(e) => setFormData({ ...formData, [activeTab === 'artworks' || activeTab === 'shop' ? 'name' : 'title']: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={4}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.imageUrl || formData.image || ''}
              onChange={(e) => setFormData({ ...formData, [activeTab === 'shop' ? 'imageUrl' : 'image']: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
            {(activeTab === 'shop' || activeTab === 'courses') && (
              <input
                type="number"
                placeholder="Price"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            )}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
              >
                {modalMode === 'add' ? 'Create' : 'Update'}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )
  );

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'contacts' && renderContacts()}
            {['artworks', 'shop', 'courses', 'blogs'].includes(activeTab) && renderContentManagement()}
          </>
        )}

        {renderModal()}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-3xl font-bold mt-2">{value || 0}</p>
      </div>
      <div className={`p-4 bg-${color}-100 text-${color}-600 rounded-full`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

export default AdminDashboard;
