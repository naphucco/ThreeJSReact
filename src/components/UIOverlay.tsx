import React from 'react';
import { useDispatch } from 'react-redux';
import { setBackgroundImage } from '../redux/sceneSlice';

function UIOverlay() {
  const dispatch = useDispatch();

  const handleClick = (imageId: string) => {
    dispatch(setBackgroundImage(imageId));
  };

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '20px',
      borderRadius: '12px',
      backdropFilter: 'blur(8px)',
      maxWidth: '280px'
    }}>
      {/* Tiêu đề */}
      <h2 style={{ 
        marginBottom: '15px', 
        fontSize: '24px',
        color: '#00b4db',
        fontWeight: 'bold'
      }}>
        🚗 3D Car Showcase
      </h2>
      
      {/* Thông tin Sketchfab */}
      <div style={{ marginBottom: '15px' }}>
        <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
          <strong>Model:</strong> Low-Poly Truck Car Drifter<br />
          <strong>Artist:</strong> Ivan Norman
        </p>
      </div>
      
      {/* Phần chọn ảnh - THÊM VÀO ĐÂY */}
      <div style={{ 
        margin: '20px 0',
        padding: '15px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px'
      }}>
        <h3 style={{ 
          color: 'white', 
          marginBottom: '12px',
          fontSize: '16px'
        }}>
          Background Options
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => handleClick('image1')}
            style={{
              padding: '10px 15px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            City Skyline
          </button>
          
          <button 
            onClick={() => handleClick('image2')}
            style={{
              padding: '10px 15px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Mountain View
          </button>
          
          <button 
            onClick={() => handleClick('image3')}
            style={{
              padding: '10px 15px',
              background: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Sunset Beach
          </button>
        </div>
      </div>
      
      {/* Hướng dẫn controls */}
      <div style={{ 
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        fontSize: '12px',
        opacity: '0.8'
      }}>
        <p style={{ margin: '5px 0' }}>• Drag: Rotate camera</p>
        <p style={{ margin: '5px 0' }}>• Scroll: Zoom</p>
        <p style={{ margin: '5px 0' }}>• Cube: Interactive demo</p>
      </div>
    </div>
  );
}

export default UIOverlay;