// frontend/src/components/FilterSection.js

import React, { useState } from 'react';
import './FilterSection.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, options, selected, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="filter-section">
      <button className="filter-header" onClick={toggleExpand} aria-expanded={isExpanded}>
        <h4>{title}</h4>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <div className={`filter-options-wrapper ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="filter-options">
          {options.map(opt => (
            <label key={opt.value} className="filter-option">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => onChange(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
