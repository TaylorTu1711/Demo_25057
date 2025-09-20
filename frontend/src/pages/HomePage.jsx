import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import "../css/Home.css"
import "../index.css"
import { BASE_URL } from '../config/config';

function HomePage() {
  
  const [allLocations, setAllLocations] = useState([]);
  const [machines, setMachines] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [showEditInforCard, setShowEditInforCard] = useState(false);

  const [dtGroup, setDtGroup] = useState([]);
  const [nonDtGroup, setNonDtGroup] = useState([]);
  const [IsDTGroup, setIsDTGroup] = useState(true); // Mặc định là nhóm DT

  const [showModal, setShowModal] = useState(false);
  const [newMachine, setNewMachine] = useState({
    machine_name: '',
    machine_id: '',
    location: '',
    image_url: null,
    isdtgroup: false,
  });

  const [updateMachineInfor, setUpdateMachineInfor] = useState({
    machine_id: '',
    machine_name: '',
    location: '',
    information: '',
  });

  const handleChangeMachineInfor = (e) => {
    const { name, value } = e.target;
    setUpdateMachineInfor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const navigate = useNavigate();

  const handleDeleteMachine = async (machine_id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá máy này?");
    if (!confirmDelete) return;

      try {
        const response = await fetch(`${BASE_URL}/api/machines/${machine_id}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Xóa máy thất bại');

        // Cập nhật lại danh sách máy
        setMachines(prev => prev.filter(m => m.machine_id !== machine_id));
      } catch (err) {
        console.error(err.message);
        alert('Không thể xoá máy. Vui lòng thử lại.');
      }
    };
  
  //Kiểm tra thiết bị có đang kết nối hay mất kết nối
  const isConnected = (lastUpdated) => {
    if (!lastUpdated) return false;
    const last = new Date(lastUpdated);
    const now = new Date();
    const diffMinutes = (now - last) / 1000 / 60;
    return diffMinutes < 2; // giả sử mất kết nối nếu không gửi dữ liệu trong 2 phút
  };

  const getAllLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/locations`);
      const jsonData = await response.json();
      setDtGroup(jsonData.dtGroup);
      setNonDtGroup(jsonData.nonDtGroup);
      setAllLocations(jsonData.dtGroup);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSaveMachineInfor = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/machines/${updateMachineInfor.machine_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machine_name: updateMachineInfor.machine_name,
          location: updateMachineInfor.location,
          information: updateMachineInfor.information,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cập nhật thành công!');
        setShowEditInforCard(false); 
      } else {
        alert(`Lỗi: ${data.message}`);
      }
    } catch (err) {
      alert('Lỗi server khi lưu thông tin máy!');
    }
  };


  const handleLocationClick = async (location) => {
    setSelectedLocation(location);
    const response = await fetch(`${BASE_URL}/api/machines?location=${encodeURIComponent(location)}&isdtgroup=${IsDTGroup}`);
    const jsonData = await response.json();
    setMachines(jsonData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMachine(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMachine = async () => {
    try {
      const formData = new FormData();
      formData.append('machine_id', newMachine.machine_id);
      formData.append('machine_name', newMachine.machine_name);
      formData.append('location', newMachine.location);
      formData.append('isdtgroup', newMachine.isdtgroup ? 'true' : 'false');
      if (newMachine.image) {
        formData.append('image_url', newMachine.image);
      }
      console.log(formData);
      const response = await fetch(`${BASE_URL}/api/machines`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Thêm máy thất bại');

      setShowModal(false);
      setNewMachine({ machine_name: '', machine_id: '', location: '', image_url: null });

      if (selectedLocation === newMachine.location) {
        handleLocationClick(selectedLocation);
      }
    } catch (err) {
      console.error(err.message);
      alert('Không thể thêm máy mới. Vui lòng thử lại.');
    }
  };


  useEffect(() => {
    getAllLocations();
    
  }, []);

  return (
    <div style={{ backgroundColor: '#e5e5e5', minHeight: '100vh' }}>
      <AppNavbar />
      <div className="container-fluid py-2 g-0">
        <div className="row g-2">
          <div className="col-md-3 mb-2">
            <div
              className="bg-white p-2 rounded shadow-sm d-flex flex-column"
              style={{
                height: '350px', 
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold mb-0" style={{ color: 'rgba(32, 64, 154, 1)' }}>
                  🏭 Khu vực nhà máy
                </h5>
                <button
                  className="btn btn-sm"
                  title="Thêm máy mới"
                  onClick={() => setShowModal(true)}
                  style={{ lineHeight: 1, border: '2px solid rgba(32, 64, 154, 1)' }}
                >
                  ➕
                </button>
              </div>
              {/* Button Group */}
              <div className="d-flex gap-2 mb-3">
                <button
                  className="btn flex-fill fw-semibold"
                  style={{
                    backgroundColor: IsDTGroup ? 'rgb(4, 139, 4)' : 'white',
                    border: '2px solid rgb(4, 139, 4)',
                    color: IsDTGroup ? 'white' : 'rgb(4, 139, 4)',
                  }}
                  onClick={() => {
                    setAllLocations(dtGroup);
                    setIsDTGroup(true);
                  }}
                >
                  DUY TÂN
                </button>

                <button
                  className="btn flex-fill fw-semibold"
                  style={{
                    backgroundColor: !IsDTGroup ? 'rgba(32, 64, 154, 1)' : 'white',
                    border: '2px solid rgba(32, 64, 154, 1)',
                    color: !IsDTGroup ? 'white' : 'rgba(32, 64, 154, 1)',
                  }}
                  onClick={() => {
                    setAllLocations(nonDtGroup);
                    setIsDTGroup(false);
                  }}
                >
                  KHÁC
                </button>
              </div>

              {/* Location List */}
              <div className="list-group small" style={{ maxHeight: '300px', overflowY: 'hidden', overflowX: 'hidden', }}>
                {allLocations.map((loc, index) => {
                  const isActive = selectedLocation === loc.location;
                  return (
                    <button
                      key={index}
                      type="button"
                      className="list-group-item list-group-item-action text-start location-button"
                      style={{
                        backgroundColor: isActive ? 'rgba(32, 64, 154, 1)' : 'white',
                        color: isActive ? 'white' : 'black',
                        border: '1px solid rgba(32, 64, 154, 0.2)',
                        transition: 'all 0.2s',
                      }}
                      onClick={() => handleLocationClick(loc.location)}
                    >
                      {loc.location}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main content - Machines */}
          <div className="col-md-9">
            <div className="bg-light p-4 rounded shadow-lg d-flex flex-column" style={{ height: 'calc(100vh - 100px)' }}>
              <h4 className="mb-1" style={{ color: 'rgba(32, 64, 154, 1)' }}>
                Danh sách máy {selectedLocation && `tại ${selectedLocation}`}
                {machines.length > 0 && ` (${machines.length} máy)`}
              </h4>
              <div className="row flex-grow-1 overflow-auto" style={{ minHeight: 0 }}>
                <div className="col-12" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                  <table className="table table-bordered table-hover align-middle bg-white shadow-sm" style={{ fontSize: '15px' }}>
                    <thead
                      className="table-light text-center"
                      style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 2,
                        backgroundColor: '#f8f9fa',
                      }}
                    >
                      <tr>
                        <th style={{ width: '30%', color: '#20409a', fontWeight: '600', fontSize: '17px'}}>Tên máy</th>
                        <th style={{ width: '25%', color: '#20409a', fontWeight: '600', fontSize: '17px' }}>ID máy</th>
                        <th style={{ width: '25%', color: '#20409a', fontWeight: '600', fontSize: '17px' }}>Trạng thái</th>
                        <th style={{ width: '20%', color: '#20409a', fontWeight: '600', fontSize: '17px' }}>Thao tác</th>
                      </tr>
                    </thead>

                    <tbody>
                      {machines.map((machine) => (
                        <tr
                          key={machine.machine_id}
                          onClick={() => navigate(`/machines/${machine.machine_id}`)}
                          style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                        >
                          <td style={{ color: '#20409a', fontWeight: '500' }}>{machine.machine_name}</td>
                          <td className="text-muted text-center">{machine.machine_id}</td>
                          <td className="text-center">
                            <span
                              title={`Trạng thái: ${isConnected(machine.last_updated) ? 'Đang kết nối' : 'Mất kết nối'}`}
                              style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                backgroundColor: isConnected(machine.last_updated) ? '#28a745' : '#dc3545',
                                marginRight: '6px',
                                verticalAlign: 'middle',
                              }}
                            ></span>
                            {isConnected(machine.last_updated) ? 'Đang kết nối' : 'Mất kết nối'}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm me-2"
                              style={{
                                color: '#20409a',
                                backgroundColor: 'white',
                                border: '1px solid #20409a',
                                transition: 'all 0.2s ease',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setUpdateMachineInfor(machine);
                                setShowEditInforCard(true);
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#20409a';
                                e.target.style.color = 'white';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = '#20409a';
                              }}
                              title='Sửa'
                            >
                              ✏️
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteMachine(machine.machine_id);
                              }}
                              title='Xóa'
                            >
                              ❌
                            </button>
                          </td>
                        </tr>
                      ))}

                      {machines.length === 0 && selectedLocation && (
                        <tr>
                          <td colSpan="4" className="text-center text-muted py-4">
                            ⚠️ Không có máy nào trong khu vực này.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditInforCard && (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1050
      }}
      onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '1rem',
            width: '90%',
            maxWidth: '480px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tiêu đề & nút đóng */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 style={{ margin: 0, color: '#203E9A' }}>Chỉnh sửa thông tin máy</h5>
            <button
              className="btn-close"
              onClick={(e) => {
                e.stopPropagation();
                setShowEditInforCard(false);
              }}
              style={{ fontSize: '0.9rem' }}
            />
          </div>

          <hr />

          {/* Grid layout */}
          <div
            className="mt-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              rowGap: '12px',
              columnGap: '8px',
              alignItems: 'center',
            }}
          >
            <label className="mb-0 fw-semibold">ID máy:</label>
            <input
              className="form-control form-control-sm"
              name="machine_id"
              value={updateMachineInfor.machine_id}
              onChange={handleChangeMachineInfor}
              disabled
            />

            <label className="mb-0 fw-semibold">Tên máy:</label>
            <input
              className="form-control form-control-sm"
              name="machine_name"
              value={updateMachineInfor.machine_name}
              onChange={handleChangeMachineInfor}
            />

            <label className="mb-0 fw-semibold">Nhà máy:</label>
            <input
              className="form-control form-control-sm"
              name="location"
              value={updateMachineInfor.location}
              onChange={handleChangeMachineInfor}
            />

            <label className="mb-0 fw-semibold">Thông tin khác:</label>
            <textarea
              className="form-control form-control-sm"
              name="information"
              value={updateMachineInfor.information}
              onChange={handleChangeMachineInfor}
              rows={4} // Số dòng hiển thị ban đầu
              style={{ resize: 'vertical' }} // Cho phép kéo rộng theo chiều dọc
            />
          </div>

          {/* Nút điều khiển */}
          <div className="d-flex justify-content-end mt-4 gap-2">
            <button className="btn btn-secondary" onClick={() => setShowEditInforCard(false)}>
              Đóng
            </button>
            <button className="btn btn-primary"
                    onClick={(e) => {
                e.stopPropagation();
                handleSaveMachineInfor();
              }}>
              Lưu
            </button>
          </div>
        </div>

      </div>
    )}

      {/* Modal thêm máy mới */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1050
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 0 10px rgba(0,0,0,0.25)'
          }}>
            <h5 className="mb-3">🆕 Thêm máy mới</h5>
            <div className="mb-3">
              <label className="form-label">Tên máy</label>
              <input
                type="text"
                className="form-control"
                name="machine_name"
                value={newMachine.machine_name}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ID máy</label>
              <input
                type="text"
                className="form-control"
                name="machine_id"
                value={newMachine.machine_id}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nhà máy</label>
              <input
                type="text"
                className="form-control"
                name="location"
                list="location-options"
                value={newMachine.location}
                autoComplete="off"
                onChange={handleChange}
              />
              <datalist id="location-options">
                {allLocations.map((loc, index) => (
                  <option key={index} value={loc.location} />
                ))}
              </datalist>
            </div>
            <div className="mb-3">
              <label className="form-label">Hình ảnh</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setNewMachine(prev => ({ ...prev, image: e.target.files[0] }))}
              />
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="isdtgroup"
                checked={machines.isdtgroup}
                onChange={(e) =>
                  setNewMachine((prev) => ({
                    ...prev,
                    isdtgroup: e.target.checked,
                  }))
                }
              />
              <label className="form-check-label" htmlFor="isdtgroup">
                NHÀ MÁY THUỘC DUY TÂN
              </label>
            </div>

            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>Hủy</button>
              <button
                className="btn btn-primary"
                onClick={handleAddMachine}
                disabled={
                  !newMachine.machine_name ||
                  !newMachine.machine_id ||
                  !newMachine.location ||
                  !newMachine.image
                }
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default HomePage;
