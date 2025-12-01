import React from 'react';

function StatisticsCard({ icon, title, value, subtitle, color }) {
  return (
    <div style={{
      background: 'white',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        background: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        flexShrink: 0
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ 
          fontSize: '13px', 
          color: '#6b7280', 
          marginBottom: '4px',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {title}
        </p>
        <h3 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#1a1a1a',
          margin: '0',
          lineHeight: '1'
        }}>
          {value}
        </h3>
        {subtitle && (
          <p style={{ 
            fontSize: '12px', 
            color: '#9ca3af',
            marginTop: '4px',
            margin: '4px 0 0 0'
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default StatisticsCard;
