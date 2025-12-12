export default function UIOverlay() {
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
        <a 
          href="https://sketchfab.com/3d-models/low-poly-truck-car-drifter-f3750246b6564607afbefc61cb1683b1"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '13px',
            color: '#4dabf7',
            textDecoration: 'none'
          }}
        >
          🔗 View original on Sketchfab
        </a>
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
  )
}