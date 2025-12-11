export default function UIOverlay() {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.5)',
      padding: '20px',
      borderRadius: '10px',
      backdropFilter: 'blur(5px)'
    }}>
      <h2 style={{ marginBottom: '10px', fontSize: '24px' }}>
        🎮 Cube 3D Xoay
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: '8px', fontSize: '16px' }}>
          • <strong>Click</strong>: Phóng to/thu nhỏ
        </li>
        <li style={{ marginBottom: '8px', fontSize: '16px' }}>
          • <strong>Di chuột</strong>: Đổi màu
        </li>
        <li style={{ marginBottom: '8px', fontSize: '16px' }}>
          • <strong>Kéo</strong>: Xoay camera
        </li>
        <li style={{ fontSize: '16px' }}>
          • <strong>Scroll</strong>: Zoom
        </li>
      </ul>
    </div>
  )
}