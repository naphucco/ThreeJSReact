import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTextureImage } from '../redux/sceneSlice';

const textureOptions = [
  { id: '/textures/multicam.jpg', label: 'Military multicam' },
  { id: '/textures/sports.jpg', label: 'Sport red' },
  { id: '/textures/luxury.jpg', label: 'Luxury yellow' }
];

function UIOverlay() {
  const dispatch = useDispatch();
  const selectedTexture = useSelector((state: any) => state.scene.textureImage);

  const handleClick = (imageId: string) => {
    dispatch(setTextureImage(imageId));
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
      <h2 style={{
        marginBottom: '15px',
        fontSize: '24px',
        color: '#00b4db',
        fontWeight: 'bold'
      }}>
        🚗 3D Car Showcase
      </h2>

      <div style={{ marginBottom: '15px' }}>
        <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
          <strong>Model:</strong> Low-Poly Truck Car Drifter<br />
          <strong>Artist:</strong> Ivan Norman
        </p>
      </div>

      {/* Vòng tròn chọn texture */}
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
          Select Options
        </h3>

        <div style={{ display: 'flex', gap: '12px' }}>
          {textureOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleClick(option.id)}
              title={option.label}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundImage: `url(${option.id})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
                border: selectedTexture === option.id 
                  ? '3px solid #00b4db' 
                  : '2px solid rgba(255,255,255,0.3)',
                boxShadow: selectedTexture === option.id 
                  ? '0 0 10px #00b4db' 
                  : 'none',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>
      </div>

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
