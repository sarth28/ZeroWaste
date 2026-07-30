import { useState, useEffect } from 'react';
import { getNGOs, createNGO } from '../api';

function NGOs() {
  const [ngos, setNGOs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    currentDemand: '',
    categoryPreference: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    fetchNGOs();
  }, []);

  const fetchNGOs = async () => {
    try {
      const res = await getNGOs();
      setNGOs(res.data);
    } catch (err) {
      setError('Failed to load NGOs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity),
        currentDemand: parseInt(formData.currentDemand),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      };
      await createNGO(payload);
      setSuccess('NGO added successfully!');
      setFormData({
        name: '',
        location: '',
        capacity: '',
        currentDemand: '',
        categoryPreference: '',
        latitude: '',
        longitude: '',
      });
      fetchNGOs();
    } catch (err) {
      setError('Failed to add NGO');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Baked Goods', 'Prepared Meals', 'Canned Goods', 'Other'];

  return (
    <div>
      <div className="page-header">
        <h1>NGOs</h1>
        <p>Manage non-profit organizations and charities</p>
      </div>

      {/* Add NGO Form */}
      <div className="form-section">
        <h5>Register New NGO</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">NGO Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter NGO name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter location"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Capacity</label>
              <input
                type="number"
                className="form-control"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                placeholder="e.g., 100"
                min="0"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Current Demand</label>
              <input
                type="number"
                className="form-control"
                name="currentDemand"
                value={formData.currentDemand}
                onChange={handleChange}
                required
                placeholder="e.g., 50"
                min="0"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Category Preference</label>
              <select
                className="form-select"
                name="categoryPreference"
                value={formData.categoryPreference}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Latitude</label>
              <input
                type="number"
                step="any"
                className="form-control"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                placeholder="e.g., 40.7128"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Longitude</label>
              <input
                type="number"
                step="any"
                className="form-control"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                placeholder="e.g., -74.0060"
              />
            </div>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Registering...' : 'Register NGO'}
            </button>
          </div>
        </form>
      </div>

      {/* NGOs List */}
      <div className="content-card">
        <h5>All NGOs ({ngos.length})</h5>
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : ngos.length === 0 ? (
          <div className="empty-state">No NGOs registered yet</div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Demand</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {ngos.map((ngo) => (
                  <tr key={ngo.id}>
                    <td>#{ngo.id}</td>
                    <td>{ngo.name}</td>
                    <td>{ngo.location}</td>
                    <td>{ngo.capacity}</td>
                    <td>{ngo.currentDemand}</td>
                    <td>
                      <span className="badge badge-info">{ngo.categoryPreference}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default NGOs;
