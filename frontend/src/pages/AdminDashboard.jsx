import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, ShoppingBag, BookOpen, FileText, Plus, Edit, Trash2, 
  Image, DollarSign, Calendar, Eye, X, Save, Users, Mail, BarChart
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
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
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
          setDashboardStats(data);
          break;
        case 'users':
          data = await getAllUsers();
          setUsers(data);
          break;
        case 'contacts':
          data = await getAllContacts();
          setContacts(data);
          break;
        case 'artworks':
          data = await fetchArtworks();
          break;
        case 'shop':
          data = await fetchShopItems();
          break;
        case 'courses':
          data = await fetchCourses();
          break;
        case 'blogs':
          data = await fetchBlogs();
          break;
        default:
          data = [];
      }
      setItems(data);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setModalMode('add');
    setCurrentItem(null);
    setFormData(getEmptyFormData());
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setCurrentItem(item);
    setFormData(item);
    setShowModal(true);
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
      }
      loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
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
      loadItems();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item');
    }
  };

  const getEmptyFormData = () => {
    switch (activeTab) {
      case 'artworks':
        return { title: '', description: '', medium: '', dimensions: '', year: '', price: '', imageUrl: '', category: '' };
      case 'shop':
        return { name: '', description: '', price: '', imageUrl: '', category: '', inStock: true };
      case 'courses':
        return { title: '', description: '', duration: '', level: '', price: '', imageUrl: '', topics: [] };
      case 'blogs':
        return { title: '', content: '', excerpt: '', imageUrl: '', category: '', tags: [] };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your gallery content</p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-2 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Add Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="mb-6 flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <Plus size={20} />
          <span>Add New {activeTab.slice(0, -1)}</span>
        </motion.button>

        {/* Items Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 mx-auto"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500 text-lg">No items found. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title || item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title || item.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {item.description || item.excerpt}
                  </p>
                  {item.price && (
                    <p className="text-primary-600 font-bold mb-4">${item.price}</p>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {modalMode === 'add' ? 'Add New' : 'Edit'} {activeTab.slice(0, -1)}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'artworks' && (
                  <ArtworkForm formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 'shop' && (
                  <ShopItemForm formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 'courses' && (
                  <CourseForm formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 'blogs' && (
                  <BlogForm formData={formData} setFormData={setFormData} />
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all"
                  >
                    <Save size={20} />
                    <span>Save</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Form Components
const ArtworkForm = ({ formData, setFormData }) => (
  <>
    <input
      type="text"
      placeholder="Title"
      value={formData.title || ''}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      required
    />
    <textarea
      placeholder="Description"
      value={formData.description || ''}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      rows={3}
      required
    />
    <input
      type="text"
      placeholder="Image URL"
      value={formData.imageUrl || ''}
      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      required
    />
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Medium"
        value={formData.medium || ''}
        onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      />
      <input
        type="text"
        placeholder="Dimensions"
        value={formData.dimensions || ''}
        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      />
      <input
        type="number"
        placeholder="Year"
        value={formData.year || ''}
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price || ''}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      />
    </div>
    <input
      type="text"
      placeholder="Category"
      value={formData.category || ''}
      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
    />
  </>
);

const ShopItemForm = ({ formData, setFormData }) => (
  <>
    <input
      type="text"
      placeholder="Name"
      value={formData.name || ''}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      required
    />
    <textarea
      placeholder="Description"
      value={formData.description || ''}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      rows={3}
      required
    />
    <input
      type="text"
      placeholder="Image URL"
      value={formData.imageUrl || ''}
      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      required
    />
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Price"
        value={formData.price || ''}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category || ''}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      />
    </div>
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={formData.inStock || false}
        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
      />
      <span>In Stock</span>
    </label>
  </>
);

const CourseForm = ({ formData, setFormData }) => (
  <>
    <input
      type="text"
      placeholder="Title"
      value={formData.title || ''}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      required
    />
    <textarea
      placeholder="Description"
      value={formData.description || ''}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      rows={3}
      required
    />
    <input
      type="text"
      placeholder="Image URL"
      value={formData.imageUrl || ''}
      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      required
    />
    <div className="grid grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Duration"
        value={formData.duration || ''}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      />
      <input
        type="text"
        placeholder="Level"
        value={formData.level || ''}
        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price || ''}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      />
    </div>
  </>
);

const BlogForm = ({ formData, setFormData }) => (
  <>
    <input
      type="text"
      placeholder="Title"
      value={formData.title || ''}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      required
    />
    <textarea
      placeholder="Excerpt"
      value={formData.excerpt || ''}
      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      rows={2}
      required
    />
    <textarea
      placeholder="Content"
      value={formData.content || ''}
      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      rows={6}
      required
    />
    <input
      type="text"
      placeholder="Image URL"
      value={formData.imageUrl || ''}
      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
      required
    />
    <input
      type="text"
      placeholder="Category"
      value={formData.category || ''}
      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
    />
  </>
);

export default AdminDashboard;
