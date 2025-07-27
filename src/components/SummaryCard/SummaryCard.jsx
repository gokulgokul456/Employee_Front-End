import React from 'react'
import './SummaryCard.css'

const SummaryCard = ({ icon, text, number, iconBg }) => {
  return (
    <div className='card'>
      <div className='card-1' style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <div className='card-2'>
        <p className='card-text'>{text}</p>
        <p className='card-number'>{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
